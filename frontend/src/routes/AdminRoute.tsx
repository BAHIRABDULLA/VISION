import AddCourse from '@/pages/admin-dashboard/AddCourse'
import Courses from '@/pages/admin-dashboard/Courses'
import Resource from '@/pages/admin-dashboard/Resource'
import ViewUser from '@/pages/admin-dashboard/ViewUser'
import Admin from '@/features/admin/Admin'
import Dashboard from '@/components/admin/Dashboard'
import Login from '@/pages/admin-authentication/Login'
import Users from '@/pages/admin-dashboard/Users'
import { Route, Routes } from 'react-router-dom'
import AdminPublicRoute from '@/components/auth/AdminPublicRoute'
import AdminPrivateRoute from '@/components/auth/AdminPrivateRoute'
import EditCourse from '@/pages/admin-dashboard/EditCourse'
import AddResource from '@/pages/admin-dashboard/AddResource'
import CategoriesSkills from '@/pages/admin-dashboard/Categories'
import EditResource from '@/pages/admin-dashboard/EditResource'
import Transaction from '@/pages/admin-dashboard/Transaction'

const AdminRoute = () => {
    return (
        <Routes>
            <Route path='/admin' element={<AdminPrivateRoute><Admin /></AdminPrivateRoute>}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="users" element={<Users />} />
                <Route path='users/:id' element={<ViewUser />} />
                <Route path='courses' element={<Courses />} />
                <Route path='courses/add' element={<AddCourse />} />
                <Route path='courses/:id' element={<EditCourse/>} />
                <Route path='resources' element={<Resource />} />
                <Route path='resources/add' element={<AddResource />} />
                <Route path='resources/:id' element={<EditResource />} />
                <Route path='categories' element={<CategoriesSkills />} />
                <Route path='transaction' element={<Transaction/>} />

            </Route>
            <Route path='/admin/login' element={<AdminPublicRoute><Login /></AdminPublicRoute>} />
        </Routes>
    )
}

export default AdminRoute