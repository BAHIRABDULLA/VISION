
// import { getAdminDashbaordData } from "@/services/adminApi";
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
  PieChart,
  Pie,
  Cell,
} from "recharts";


const Dashboard = () => {

  // const fetchAdminDashboardData = async()=>{
  //   const response = await getAdminDashbaordData()
  // }


  const userGrowthData = [
    { name: "Week 1", users: 400 },
    { name: "Week 2", users: 600 },
    { name: "Week 3", users: 800 },
    { name: "Week 4", users: 1200 },
  ];

  const revenueData = [
    { name: "January", revenue: 4000 },
    { name: "February", revenue: 5000 },
    { name: "March", revenue: 7000 },
    { name: "April", revenue: 8000 },
  ];

  const coursePopularityData = [
    { name: "Python", value: 30 },
    { name: "Java", value: 25 },
    { name: "JavaScript", value: 20 },
    { name: "React", value: 15 },
    { name: ".NET", value: 10 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#845EC2"];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-gray-500">Total Users</h2>
          <p className="text-3xl text-black font-bold">50,000</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-gray-500">Total Mentors</h2>
          <p className="text-3xl font-bold">2,000</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-gray-500">Courses Purchased</h2>
          <p className="text-3xl font-bold">1,200</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-gray-500">Revenue This Month</h2>
          <p className="text-3xl font-bold">$10,000</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">User Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userGrowthData}>
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
            <BarChart data={revenueData}>
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
      <div className="bg-white shadow rounded-lg p-4 mt-6">
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
      </div>
    </div>
  );
};

export default Dashboard