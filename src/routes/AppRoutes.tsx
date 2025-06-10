import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"
import Login from "../views/Login";
import Home from "../views/Home";
import Layout from '../components/Layout'; 
import Register from "../views/Register";
import UserList from "../views/users/UserList";
import UserForm from "../views/users/UserForm";
import NotFound from "../views/NotFound";





const AppRoutes = () => {

    const { isAuthenticated } = useAuth();

    return (
        <Routes>
            
            <Route path="/login" element={ <Login /> } />
            <Route path="/register" element={ <Register /> } />

            {isAuthenticated ? (
                <Route element={<Layout />}>
                    
                    
                    <Route path="/" element={<Home />} />

                    <Route path="/users" element={ <UserList /> } />

                    {/* Chequear el rol. debe ser admin o organizador  */}
                    <Route path="/users/new" element={ <UserForm /> } />

                    <Route path="*" element={ <NotFound /> } />

                </Route>
            ) : (
                <Route path="*" element={<Navigate to="/login" replace />} />
            )}

            <Route path="*" element={ <NotFound /> } />

        </Routes>
    )
}

export default AppRoutes;