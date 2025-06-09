import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"
import Login from "../views/Login";
import Home from "../views/Home";
import Layout from '../components/Layout'; 
import Register from "../views/Register";





const AppRoutes = () => {

    const { isAuthenticated } = useAuth();

    return (
        <Routes>
            
            <Route path="/login" element={ <Login /> } />
            <Route path="/register" element={ <Register /> } />

            {isAuthenticated ? (
                <Route element={<Layout />}>
                    
                    
                    <Route path="/" element={<Home />} />
                    
                    

                </Route>
            ) : (
                <Route path="*" element={<Navigate to="/login" replace />} />
            )}

        </Routes>
    )
}

export default AppRoutes;