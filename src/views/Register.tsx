"use client"

import type React from "react"

import { useEffect, useState, type ChangeEvent } from "react"
import type { UserDTO } from "../models/user"
import { registerPlayer } from "../services/userService"
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material"
import { SportsEsports } from "@mui/icons-material"
import { type Country, getCountries } from "../services/countryService"
import type { SelectChangeEvent } from "@mui/material"

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    countryId: 0,
    avatar: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [countries, setCountries] = useState<Country[]>([])

  useEffect(() => {
    setCountries(getCountries())
  }, [])

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<number>) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {}

    if (!formData.name.trim()) {
      errors.firstName = "El nombre es requerido"
    }

    if (!formData.username.trim()) {
      errors.username = "El nombre de usuario es requerido"
    } else if (formData.username.length < 3) {
      errors.username = "El nombre de usuario debe tener al menos 3 caracteres"
    }

    if (!formData.email.trim()) {
      errors.email = "El email es requerido"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Ingresa un email válido"
    }

    if (!formData.password) {
      errors.password = "La contraseña es requerida"
    } else if (formData.password.length < 6) {
      errors.password = "La contraseña debe tener al menos 6 caracteres"
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      // Preparar los datos para enviar al backend ASP.NET
      const registrationData: UserDTO = {
        name: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: 4,
        countryId: formData.countryId,
        avatar: formData.avatar,
      }

      // Usar el service para registrar el jugador
      const result = await registerPlayer(registrationData)
      setSuccess("Registro completado exitosamente")
      console.log("result: ", result)
    } catch (err) {
      setError("Error inesperado. Por favor, intenta nuevamente.")
      console.error("Registration error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Card elevation={3}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <SportsEsports sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
            <Typography variant="h4" component="h1" gutterBottom>
              Registro de Jugador
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Únete a nuestra comunidad gaming
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
            <Grid container spacing={2}>
              <TextField
                fullWidth
                label="Nombre"
                value={formData.name}
                name="name"
                onChange={handleChange}
                error={!!fieldErrors.firstName}
                helperText={fieldErrors.name}
                disabled={loading}
              />
            </Grid>

            <TextField
              fullWidth
              label="Nombre de Usuario"
              value={formData.username}
              name="username"
              onChange={handleChange}
              error={!!fieldErrors.username}
              helperText={fieldErrors.username}
              margin="normal"
              disabled={loading}
            />

            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email}
              name="email"
              onChange={handleChange}
              error={!!fieldErrors.email}
              helperText={fieldErrors.email}
              margin="normal"
              disabled={loading}
            />

            <TextField
              fullWidth
              label="Contraseña"
              type="password"
              value={formData.password}
              name="password"
              onChange={handleChange}
              error={!!fieldErrors.password}
              helperText={fieldErrors.password}
              margin="normal"
              disabled={loading}
            />

            <FormControl fullWidth margin="normal">
              <InputLabel id="country-select-label">País</InputLabel>
              <Select
                labelId="country-select-label"
                id="countryId"
                name="countryId"
                value={formData.countryId}
                label="País"
                onChange={handleChange}
                disabled={loading}
              >
                {countries.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

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
                  Registrando...
                </>
              ) : (
                "Registrarse"
              )}
            </Button>

            <Typography variant="body2" color="text.secondary" align="center">
              ¿Ya tienes una cuenta?{" "}
              <Link variant="body2" underline="none" href="/login" sx={{ mt: 2, display: 'block', textAlign:'center' }}>
                Iniciar Sesión
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  )
}

export default Register
