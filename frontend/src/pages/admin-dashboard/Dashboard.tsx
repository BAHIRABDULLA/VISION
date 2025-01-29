
import { getAdminDashbaordData } from "@/services/adminApi";
import  { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  // PieChart,
  // Pie,
  // Cell,
} from "recharts";

interface IDashboardData {
  approvedMentors: number,
  coursePurchased: number,
  revenue: number,
  totalMentors: number,
  totalReviews: number,
  totalUsers: number,
}

const Dashboard = () => {  
  const [dashboardData, setDashbaordData] = useState<IDashboardData>()
  const [usersGrowthData,setUsersGrowthData] = useState([])
  const [monthlyRevenueData,setMonthlyRevenueData ]  = useState([])

  const fetchAdminDashboardData = async () => {
    const response = await getAdminDashbaordData()
    setDashbaordData(response?.data?.dashboardData?.dashBoardData)
    setUsersGrowthData(response?.data?.dashboardData.userGrowthStats)
    setMonthlyRevenueData(response?.data?.dashboardData.monthlyRevenueData)

  }
  useEffect(() => {
    fetchAdminDashboardData()
  }, [])

  // const coursePopularityData = [
  //   { name: "Python", value: 30 },
  //   { name: "Java", value: 25 },
  //   { name: "JavaScript", value: 20 },
  //   { name: "React", value: 15 },
  //   { name: ".NET", value: 10 },
  // ];

  // const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#845EC2"];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-gray-500">Total Users</h2>
          <p className="text-3xl text-black font-bold">{dashboardData?.totalUsers || 0}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-gray-500">Total Mentors</h2>
          <p className="text-3xl font-bold">{dashboardData?.totalMentors || 0}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-gray-500">Courses Purchased</h2>
          <p className="text-3xl font-bold">{dashboardData?.coursePurchased || 0}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-gray-500">Revenue This Month</h2>
          <p className="text-3xl font-bold">₹  {dashboardData?.revenue || 0}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-gray-500">Approved Mentors</h2>
          <p className="text-3xl font-bold">{dashboardData?.approvedMentors || 0}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-gray-500">Total Reviews</h2>
          <p className="text-3xl font-bold">{dashboardData?.totalReviews || 0}</p>
        </div>
      </div>


      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">User Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={usersGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Monthly Revenue</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyRevenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Course Popularity */}
      {/* <div className="bg-white shadow rounded-lg p-4 mt-6">
        <h2 className="text-lg font-semibold mb-4">Course Popularity</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={coursePopularityData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {coursePopularityData.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div> */}
    </div>
  );
};

export default Dashboard