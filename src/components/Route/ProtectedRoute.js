import { Navigate, Route } from "react-router-dom";
import React from 'react';

const ProtectedRoute = ({isAuthenticated:IsAuthenticated, ...rest }) => (
    <Route {...rest}/>
)
export default ProtectedRoute