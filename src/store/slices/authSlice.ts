import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as authService from '../../services/authService';


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


// THUNK para login
export const login = createAsyncThunk(
  'auth/login',
  async (
    credentials: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const data = await authService.login(credentials.email, credentials.password);
      console.log(data);      
      return data; // { token, user, role }
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
            state.role = null;
            localStorage.removeItem('token');
        }
    },
})

export const { logout } = authSlice.actions;

export default authSlice.reducer;