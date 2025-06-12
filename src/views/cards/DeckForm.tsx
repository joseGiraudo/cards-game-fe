import React, { useState, type ChangeEvent } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../../store/store'
import type { CreateDeckDTO } from '../../models/card'
import { Alert, Box, Button, Card, CardContent, CircularProgress, Container, TextField, Typography } from '@mui/material'
import * as cardService from '../../services/cardService';
import { useNavigate } from 'react-router-dom'


const DeckForm = () => {
    const { user } = useSelector((state: RootState) => state.auth)
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState<CreateDeckDTO>({
        name: "",
    })
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
    
        // Limpiar el error del campo modificado
        setFieldErrors((prevErrors) => {
          const updatedErrors = { ...prevErrors };
          delete updatedErrors[name];
          return updatedErrors;
        });
      };

    const validateForm = (): boolean => {
        const errors: Record<string, string> = {};

        if (!formData.name.trim()) {
        errors.name = "El nombre es requerido";
        }
        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
    
        if (!validateForm()) {
          return;
        }
    
        setLoading(true);
        setError(null);
        setSuccess(null);
    
        try {    
          // Usar el service para registrar el jugador
          const result = await cardService.createDeck(formData);
          setSuccess("Mazo creado exitosamente");
          console.log("result: ", result);
        } catch (err) {
          setError("Error inesperado. Por favor, intenta nuevamente.");
          console.error("Registration error:", err);
        } finally {
          setLoading(false);
          navigate('/decks')
        }
      };


    if(user?.role !== 4) {
        return (
            <Container maxWidth="sm" sx={{ py: 4, textAlign: "center" }}>
                <h3>Solo los jugadores pueden crear mazos</h3>
            </Container>
        )
    }
    
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Card elevation={3}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Crear un Mazo
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Nombre"
              value={formData.name}
              name="name"
              onChange={handleChange}
              error={!!fieldErrors.name}
              helperText={fieldErrors.name}
              disabled={loading}
              margin="normal"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mt: 3, mb: 2, py: 1.5 }}
            >
              {loading ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  Creando Mazo...
                </>
              ) : (
                "Crear Mazo"
              )}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  )
}

export default DeckForm