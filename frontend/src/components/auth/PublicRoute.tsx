import React from "react";

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "@/redux/store/store";

const PublicRoute = ({children}:any)=>{
    const isMenteeAuthenticated = useSelector((state:RootState)=>state.menteeAuth.isAuthenticated)
    const isMentorAuthenticated = useSelector((state:RootState)=>state.mentorAuth.isAuthenticated)

    // if(isMenteeAuthenticated){
    //     return <Navigate to='/signin' />
    // }
    // if(isMentorAuthenticated){
    //     return <Navigate to='/signin'/>
    // }
    // return children
    const isAuthenticated = useSelector((state:RootState)=>state.menteeAuth.isAuthenticated)
    return isAuthenticated ? <Navigate to='/' /> : children
}
export default PublicRoute