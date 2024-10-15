import AddCourse from '@/features/admin/AddCourse'
import Courses from '@/features/admin/Courses'
import Resource from '@/features/admin/Resource'
import ViewUser from '@/features/admin/ViewUser'
import Admin from '@/pages/admin/Admin'
import Dashboard from '@/components/admin/Dashboard'
import Login from '@/pages/admin/Login'
import Users from '@/features/admin/Users'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

const AdminRoute = () => {
    return (
        <Routes>
            <Route path='/admin' element={<Admin />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="users" element={<Users />} />
                <Route path='users/:id' element={<ViewUser />} />
                <Route path='courses' element={<Courses />} />
                <Route path='courses/add' element={<AddCourse />} />
                <Route path='resources' element={<Resource />} />
            </Route>
            <Route path='/admin/login' element={<Login />} />
        </Routes>
    )
}

export default AdminRoute