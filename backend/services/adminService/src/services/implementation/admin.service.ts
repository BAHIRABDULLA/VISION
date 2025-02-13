import bcrypt from 'bcryptjs'
import { inject, injectable } from 'inversify'
import axios from 'axios'
import { TYPES } from '../../types'
import { generateAccessToken } from '../../utils/token'
import { IAdminService } from '../interface/IAdmin.service'
import { IAdminRepository } from '../../repositories/interface/IAdmin.repository'
import IUser from '../../interface/IUser'
import CustomError from '../../utils/custom.error'
import { HttpStatus } from '../../enums/http.status'

const api = axios.create({
    baseURL: 'http://localhost:4000'
})


// interface User {
//     role: 'mentor' | 'mentee';
//     isApproved?: 'approved' | 'rejected';
//     createAt: Date
// }

interface GetAllUsersResponse {
    users: IUser[];
}

interface IPayment {
    amount: number
    status: 'pending' | 'completed'
    type: 'one_time_payment' | 'mentorship_subscription' | 'course_purchase'
    createdAt: Date
}



interface ParamsData {
    search: string;
    page: number;
    limit: number
}


@injectable()
export class AdminService implements IAdminService {
    private adminRepository: IAdminRepository;
    constructor(
        @inject(TYPES.AdminRepository) adminRepository: IAdminRepository,
    ) {
        this.adminRepository = adminRepository
    }

    async login(email: string, password: string): Promise<{ token: string } | null> {
        try {
            const admin = await this.adminRepository.findByEmail(email)

            if (!admin) return null
            const passwordCheck = await bcrypt.compare(password, admin.password);
            if (!passwordCheck) return null
            const token = generateAccessToken(email)
            return { token }
        } catch (error) {
            return null
        }
    }


    async getDashboardData(token: string) {
        try {
            const getAllUsers = await this.users() as GetAllUsersResponse
            let dashBoardData = {
                totalUsers: 0,
                totalMentors: 0,
                coursePurchased: 0,
                revenue: 0,
                totalReviews: 0,
                approvedMentors: 0
            }
            dashBoardData.totalUsers = getAllUsers?.users?.length || 0
            dashBoardData.totalMentors = getAllUsers.users.filter(user => user.role === 'mentor').length
            dashBoardData.approvedMentors = getAllUsers?.users.filter(user => user.role === 'mentor' && user.isApproved === 'approved').length
            const findPayment = await api.get('/payment/transactions', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dashBoardData.coursePurchased = findPayment.data?.transactions.filter((payment: IPayment) => payment.type === 'course_purchase').length
            const completedTransaction = findPayment.data.transactions
                .filter((payment: any) => payment.status == 'completed')
            const totalRevenue = completedTransaction.reduce((acc: number, curr: any) => acc + curr.amount, 0)
            dashBoardData.revenue = totalRevenue
            const getTotalReviews = await api.get('/payment/review/total')
            dashBoardData.totalReviews = getTotalReviews.data.reviewCount
            const userGrowthStats = await this.userGrowthStats(getAllUsers?.users)
            const monthlyRevenueData = await this.monthlyRevenueData(completedTransaction)
            return { dashBoardData, userGrowthStats, monthlyRevenueData }
        } catch (error) {
            throw error
        }
    }
    async userGrowthStats(users: IUser[]) {

        const today = new Date();
        const sevenDaysBefore = new Date();
        sevenDaysBefore.setDate(today.getDate() - 7);
        const recentUsers = users.filter(user => new Date(user?.createAt) >= sevenDaysBefore);

        const userCountByDate: Record<string, number> = {}
        for (const user of recentUsers) {
            const createdAt = new Date(user.createAt)
            const dateKey = createdAt.toISOString().split('T')[0]
            userCountByDate[dateKey] = (userCountByDate[dateKey] || 0) + 1
        }
        const userGrowthStats = []

        for (let i = 6; i >= 0; i--) {
            const date = new Date()
            date.setDate(today.getDate() - i)
            const dateKey = date.toISOString().split('T')[0]
            userGrowthStats.push({
                name: dateKey,
                users: userCountByDate[dateKey] || 0
            })
        }
        return userGrowthStats

    }

    async monthlyRevenueData(transactions: IPayment[]) {

        const currentDate = new Date()
        const sixMonthsAgo = new Date()
        sixMonthsAgo.setMonth(currentDate.getMonth() - 6)
        const completedTransaction = transactions.filter((transaction) => {
            const transactionDate = new Date(transaction.createdAt)
            return (
                transactionDate >= sixMonthsAgo
            )
        })
        const revenueByMonth = completedTransaction.reduce((acc, transaction) => {
            const month = new Date(transaction.createdAt).toLocaleString('default', {
                month: 'short',
                year: 'numeric'
            })
            if (!acc[month]) {
                acc[month] = 0
            }
            acc[month] += transaction.amount
            return acc
        }, {} as { [key: string]: number })

        const sortedMonths = Object.keys(revenueByMonth).sort((a, b) => {
            const dateA = new Date(`01 ${a}`)
            const dateB = new Date(`01 ${b}`)
            return dateA.getTime() - dateB.getTime()
        })
        const chartData = sortedMonths.map((month) => ({
            name: month,
            revenue: revenueByMonth[month]
        }))
        return chartData
    }

    async users(): Promise<{ users: IUser[] } | null> {
        try {
            const users = await api.get('/user/users')
            let userData = users.data
            return { users: userData }
        } catch (error) {
            throw error
        }
    }


    async getUser(id: string): Promise<{ user: object } | null> {
        try {
            const commonData = await api.get(`/user/users/${id}`)

            if (!commonData) {
                return null
            }
            return { user: commonData.data }
        } catch (error) {
            throw error
        }
    }

    async updateApproval(id: string, isApproved: string) {
        try {
            const sentRequestToUserService = await api.patch(`user/${id}/approval`, { isApproved })
            return sentRequestToUserService.data
        } catch (error) {
            throw error
        }
    }


    async updateUserStatus(id: string, isActive: boolean) {
        try {
            const sentRequestToUserService = await api.patch(`user/${id}/status`, { isActive })
            return sentRequestToUserService.data
        } catch (error) {
            throw error
        }
    }



    async getAllUsersWithQueryResponse(params: ParamsData) {
        try {
            const getUsers = await this.users()
            if (!getUsers) {
                throw new CustomError('No users founded', HttpStatus.NOTFOUND)
            }
            const users = getUsers?.users
            const { search, page, limit } = params
            const usersSearch = users.filter((user) => {
                return (!search || user?.fullName.toLowerCase().includes(search.toLowerCase()))
            })
            const totalResult = users?.length || 0
            const pageSize = limit || 10
            const currentPage = page || 1
            const paginatedUsers = usersSearch?.slice((currentPage - 1) * pageSize, currentPage * pageSize)
            return { users: paginatedUsers, pagination: { totalResult, totalPages: Math.ceil(totalResult / pageSize), currentPage } }
        } catch (error) {
            throw error
        }
    }


}