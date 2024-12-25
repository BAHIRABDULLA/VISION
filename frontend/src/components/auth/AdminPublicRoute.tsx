
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "@/redux/store/store";

const AdminPublicRoute = ({children}:any)=>{
    const isAuthenticated = useSelector((state:RootState)=>state.adminAuth.isAuthenticated)
    return isAuthenticated ? <Navigate to='/admin/dashboard' /> : children
}
export default AdminPublicRoute