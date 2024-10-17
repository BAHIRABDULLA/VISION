import React from "react";

import { useSelector, UseSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "@/redux/store/store";

const PublicRoute = ({children}:any)=>{
    const isAuthenticated = useSelector((state:RootState)=>state.auth.isAuthenticated)
    return isAuthenticated ? <Navigate to='/' /> : children
}
export default PublicRoute