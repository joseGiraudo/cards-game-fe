import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"
import Login from "../views/Login";
import Home from "../views/Home";






const AppRoutes = () => {

    const { isAuthenticated } = useAuth();

    return (
        <Routes>
            <Route path="/login" element={ <Login /> } />
            <Route
                path="/"
                element={
                    isAuthenticated ? <Home /> : <Navigate to="/login" replace />
                }
            />
        </Routes>
    )
}

export default AppRoutes;