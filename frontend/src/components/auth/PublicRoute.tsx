import React from "react";

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "@/redux/store/store";


interface PublicRouteProps {
    children: React.ReactNode;
}


const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
    const isMenteeAuthenticated = useSelector(
        (state: RootState) => state.menteeAuth.isAuthenticated
    );
    const isMentorAuthenticated = useSelector(
        (state: RootState) => state.mentorAuth.isAuthenticated
    );

    if (isMenteeAuthenticated) {
        return <Navigate to="/" />;
    }

    if (isMentorAuthenticated) {
        return <Navigate to="/dashboard" />;
    }

    return <>{children}</>;

};

export default PublicRoute