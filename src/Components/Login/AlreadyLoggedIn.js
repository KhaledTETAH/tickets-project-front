import React from "react";
import { useLocalState } from "../Utils/UseLocalStorage";
import { Navigate } from "react-router-dom";

const AlreadyLoggedIn = ({children}) => {
    const [user, setUser] = useLocalState("", "user");
    return !user ? children : <Navigate to="/home"/>
}

export default AlreadyLoggedIn;