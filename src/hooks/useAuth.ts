import { useSelector } from "react-redux"
import type { RootState } from "../store/store"


export const useAuth = () => {

    const { token, user, role } = useSelector((state: RootState) => state.auth);

    return {
        isAuthenticated: !!token,
        token,
        user,
        role,
    }
}