import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../hooks/useAuth";
import React, { useEffect, useState } from "react";
import { Alert, Box, Button, Container, Link, Paper, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { clearError, login } from "../../store/slices/authSlice";
import type { AppDispatch, RootState } from '../../store/store';


const Login = () => {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    
    // Obtener loading y error del estado de Redux
    const { loading, error } = useSelector((state: RootState) => state.auth)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if(isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        //Limpio errores (x las dudas)
        dispatch(clearError());

        try {
            // Dispatch del login action
            const result = await dispatch(login({ email, password }))
            // Verificar si el login fue exitoso
            if (login.fulfilled.match(result)) {
                // Opcional: limpiar el formulario
                setEmail("")
                setPassword("")
                // La redirección se maneja automáticamente por el useEffect
                // cuando isAuthenticated cambie a true
            } 
        } catch (error) {
            // Los errores se manejan automáticamente en el slice de Redux
            console.error("Login failed:", error)
        }
    }


    return (
        <Container maxWidth="sm" >
            <Paper elevation={3} sx={{p: 4, mt:8}} >
                <Typography variant="h5" gutterBottom>
                    Iniciar Sesión
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }} onClose={() => dispatch(clearError())}>
                        {error}
                    </Alert>
                )}

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
                    <Button type="submit" disabled={loading} variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        {loading ? "Iniciando sesión..." : "Iniciar sesión"}
                    </Button>
                    <Box sx={{ mt: 2, display: 'block', textAlign:'center' }}>
                        <Typography variant="body2" sx={{my:1, color: 'gray'}}>¿Eres Nuevo?</Typography>
                        <Link variant="body1" underline="none" href="/register">
                            Registrarse
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Container>
    )

}



export default Login;