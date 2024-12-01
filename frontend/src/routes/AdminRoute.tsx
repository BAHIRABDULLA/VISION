import AddCourse from '@/features/admin/AddCourse'
import Courses from '@/features/admin/Courses'
import Resource from '@/features/admin/Resource'
import ViewUser from '@/features/admin/ViewUser'
import Admin from '@/pages/admin/Admin'
import Dashboard from '@/components/admin/Dashboard'
import Login from '@/pages/admin/Login'
import Users from '@/features/admin/Users'
import { Route, Routes } from 'react-router-dom'
import AdminPublicRoute from '@/components/auth/AdminPublicRoute'
import AdminPrivateRoute from '@/components/auth/AdminPrivateRoute'
import EditCourse from '@/features/admin/EditCourse'
import AddResource from '@/features/admin/AddResource'

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
            </Route>
            <Route path='/admin/login' element={<AdminPublicRoute><Login /></AdminPublicRoute>} />
        </Routes>
    )
}

export default AdminRoute