import React from "react";

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "@/redux/store/store";


interface PublicRouteProps {
    children: React.ReactNode;
}


const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {


    console.log(children,'children in public route');
    
    const isMenteeAuthenticated = useSelector(
        (state: RootState) => state.menteeAuth.isAuthenticated
    );
    const isMentorAuthenticated = useSelector(
        (state: RootState) => state.mentorAuth.isAuthenticated
    );



    if (isMenteeAuthenticated) {
        return <Navigate to="/" />;
    }

    if (isMentorAuthenticated ) {
        console.log(isMentorAuthenticated,'is mentor authenticatedd in public roiute');
        
        return <Navigate to="/dashboard" />;
    }
    console.log('bleeeeee    bleeeeeee   blelee');
    
    return <>{children}</>;

};

export default PublicRoute