import { useDispatch } from "react-redux";
import { useAuth } from "../hooks/useAuth";
import React, { useEffect, useState } from "react";
import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login } from "../store/slices/authSlice";
import type { AppDispatch } from '../store/store';







const Login = () => {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if(isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        dispatch(login({email, password}))
    }


    return (
        <Container maxWidth="sm" >
            <Paper elevation={3} sx={{p: 4, mt:8}} >
                <Typography variant="h5" gutterBottom>
                    Iniciar Sesión
                </Typography>

                <Box component="form" onSubmit={handleSubmit} >

                    <TextField
                        label="Email"
                        fullWidth
                        margin="normal"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        label="Contraseña"
                        fullWidth
                        margin="normal"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Iniciar sesión
                    </Button>
                </Box>
            </Paper>
        </Container>
    )

}



export default Login;