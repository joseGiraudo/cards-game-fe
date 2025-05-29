import { createSlice } from "@reduxjs/toolkit";


interface AuthState {
    token: string | null;
    user: { name: string, email: string } | null;
    role: string | null;
}


const initialState: AuthState = {
    token: null,
    user: null,
    role: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.role = null;
            localStorage.removeItem('token');
        },
        login: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.role = action.payload.role;
            localStorage.setItem('token', action.payload.token);
        }
    }
})

export const { logout, login } = authSlice.actions;

export default authSlice.reducer;