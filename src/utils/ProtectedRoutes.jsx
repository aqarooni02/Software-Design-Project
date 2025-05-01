import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
    const user = true
    return user ? <Outlet/> : <Navigate to="signin"/>
}

export default ProtectedRoutes