import React from "react";
import { useLocalState } from "../Utils/UseLocalStorage";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({children}) => {
    const [user, setUser] = useLocalState("", "user");
    return user ? children : <Navigate to="/"/>
};

export default PrivateRoute;