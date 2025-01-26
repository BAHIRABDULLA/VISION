import { Route, Routes } from 'react-router-dom'
import React, { Suspense } from 'react'
import AdminPrivateRoute from '@/components/auth/AdminPrivateRoute'
import AdminPublicRoute from '@/components/auth/AdminPublicRoute'
import Login from '@/pages/admin-authentication/Login'


import Admin from '@/features/admin/Admin'
import Loading from '@/components/Loading'


const Dashboard = React.lazy(() => import('@/pages/admin-dashboard/Dashboard'))
const Users = React.lazy(() => import('@/pages/admin-dashboard/Users'))
const ViewUser = React.lazy(() => import('@/pages/admin-dashboard/ViewUser'))
const Courses = React.lazy(() => import('@/pages/admin-dashboard/Courses'))
const AddCourse = React.lazy(() => import('@/pages/admin-dashboard/AddCourse'))
const EditCourse = React.lazy(() => import('@/pages/admin-dashboard/EditCourse'))
const Resource = React.lazy(() => import('@/pages/admin-dashboard/Resource'))
const AddResource = React.lazy(() => import('@/pages/admin-dashboard/AddResource'))
const EditResource = React.lazy(() => import('@/pages/admin-dashboard/EditResource'))
const Transaction = React.lazy(() => import('@/pages/admin-dashboard/Transaction'))
const CategoriesSkills = React.lazy(() => import('@/pages/admin-dashboard/Categories'))

const AdminRoute = () => {
    return (
        <Suspense fallback={<Loading/>} >
            <Routes>
                <Route path='/admin' element={<AdminPrivateRoute><Admin /></AdminPrivateRoute>}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="users" element={<Users />} />
                    <Route path='users/:id' element={<ViewUser />} />
                    <Route path='courses' element={<Courses />} />
                    <Route path='courses/add' element={<AddCourse />} />
                    <Route path='courses/:id' element={<EditCourse />} />
                    <Route path='resources' element={<Resource />} />
                    <Route path='resources/add' element={<AddResource />} />
                    <Route path='resources/:id' element={<EditResource />} />
                    <Route path='categories' element={<CategoriesSkills />} />
                    <Route path='transaction' element={<Transaction />} />

                </Route>
                <Route path='/admin/login' element={<AdminPublicRoute><Login /></AdminPublicRoute>} />
            </Routes>
        </Suspense>
    )
}

export default AdminRoute