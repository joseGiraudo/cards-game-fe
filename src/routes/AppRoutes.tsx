import { Route, Routes } from "react-router-dom";
import Login from "../views/users/Login";
import Home from "../views/core/Home";
import Layout from '../components/Layout'; 
import Register from "../views/users/Register";
import UserList from "../views/users/UserList";
import NotFound from "../views/core/NotFound";
import CardList from "../views/cards/CardList";
import DeckForm from "../views/cards/DeckForm";
import DeckList from "../views/cards/DeckList";
import DeckView from "../views/cards/DeckView";
import ProtectedRoute from "./ProtectedRoute";
import Unauthorized from "../views/core/Unauthorized";
import AuthenticatedRoute from "./AuthenticatedRoute";





const AppRoutes = () => {
    return (
        <Routes>
            
            <Route path="/login" element={ <Login /> } />
            <Route path="/register" element={ <Register /> } />
            <Route path="/unauthorized" element={ <Unauthorized /> } />

            <Route element={<AuthenticatedRoute /> } >
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />

                    {/* solo para admin (rol admin = 1) */}
                    <Route element={<ProtectedRoute allowedRoles={[1]} />}>
                        <Route path="/users" element={ <UserList /> } />
                    </Route>

                    {/* solo para player (rol player = 4) */}
                    {/* Ver si permito todos los roles aca */}
                    <Route element={<ProtectedRoute allowedRoles={[4]} />}>
                        <Route path="/decks/new" element={ <DeckForm /> } />
                        <Route path="/decks/:deckId" element={ <DeckView /> } />
                        <Route path="/decks" element={ <DeckList /> } />
                    </Route>
                    <Route path="/cards" element={ <CardList /> } />

                    <Route path="*" element={ <NotFound /> } />

                </Route>
            </Route>

            <Route path="*" element={ <NotFound /> } />

        </Routes>
    )
}

export default AppRoutes;