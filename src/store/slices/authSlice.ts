import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as authService from '../../services/authService';

interface AuthUser {
    id: number;
    name: string;
    username: string;
    email: string;
    avatar: string;
    role: string
}

interface AuthState {
    token: string | null;
    user: AuthUser | null;
}


const initialState: AuthState = {
    token: null,
    user: null
}


// THUNK para login
export const login = createAsyncThunk(
  'auth/login',
  async (
    credentials: { email: string; password: string },
    thunkAPI
  ) => {
    try {        
        let data;
        if(credentials.email === 'test@correo.com' && credentials.password === 'test') {
            data = {
                response: {
                    token: "mock-jwt-token-" + Date.now(),
                    authUser: {
                        id: 1,
                        name: "Usuario Admin",
                        username: "admin",
                        email: "test@correo.com",
                        avatar: "/placeholder.svg?height=40&width=40",
                        role: "ADMIN",
                    },
                }
            }
            console.log(data);                
        } else if (credentials.email === 'test2@correo.com' && credentials.password === 'test2') {
            data = {
                response: {
                    token: "mock-jwt-token-" + Date.now(),
                    authUser: {
                        id: 1,
                        name: "Usuario Player",
                        username: "player",
                        email: "test2@correo.com",
                        avatar: "/placeholder.svg?height=40&width=40",
                        role: "PLAYER",
                    },
                }
            }
            console.log(data);                
        }
        else {
            data = await authService.login(credentials.email, credentials.password);
            console.log(data);
        }
        return data;
    } catch (error: any) {
        console.error(error.response.data.message);
        return thunkAPI.rejectWithValue(
            error.response?.data?.message || 'Error al iniciar sesión'
        );
    }
  }
);


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.user = null;
            localStorage.removeItem('token');
        },
    },

    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            
            state.token = action.payload.response.token;
            state.user = action.payload.response.authUser;

            localStorage.setItem('token', action.payload.response.token);
        })
    }
})

export const { logout } = authSlice.actions;

export default authSlice.reducer;