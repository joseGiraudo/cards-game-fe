import React, { useEffect, useState, type ChangeEvent } from "react";
import { getCountries, type Country } from "../../services/countryService";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import type { UserDTO } from "../../models/user";
import * as userService from "../../services/userService";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

const roles = [
  { id: 1, name: "Admin" },
  { id: 2, name: "Organizador" },
  { id: 3, name: "Juez" },
  { id: 4, name: "Jugador" },
];

const UserForm = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    role: 4,
    countryId: 1,
    avatar: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    setCountries(getCountries());
  }, []);

  const handleChange = (
    event:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<number>
  ) => {
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

    if (!formData.username.trim()) {
      errors.username = "El nombre de usuario es requerido";
    } else if (formData.username.length < 3) {
      errors.username = "El nombre de usuario debe tener al menos 3 caracteres";
    }

    if (!formData.email.trim()) {
      errors.email = "El email es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Ingresa un email válido";
    }

    if (!formData.password) {
      errors.password = "La contraseña es requerida";
    } else if (formData.password.length < 6) {
      errors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (user?.role === 2 && formData.role !== 3) {
      errors.role = "Los organizadores solo pueden crear jueces";
    } else if (user?.role !== 1 && user?.role !== 2) {
      errors.role = "No tienes permisos para crear usuarios";
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
      // Preparar los datos para enviar al backend ASP.NET
      const registrationData: UserDTO = {
        name: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        countryId: formData.countryId,
        avatar: formData.avatar,
      };

      // Usar el service para registrar el jugador
      const result = await userService.createUser(registrationData);
      setSuccess("Registro completado exitosamente");
      console.log("result: ", result);
    } catch (err) {
      setError("Error inesperado. Por favor, intenta nuevamente.");
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Card elevation={3}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Registro de Usuarios
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

            <FormControl
              fullWidth
              margin="normal"
              error={!!fieldErrors.role}
              disabled={loading}
            >
              <InputLabel id="role-select-label">Rol</InputLabel>
              <Select
                labelId="role-select-label"
                id="role"
                name="role"
                value={formData.role}
                label="Role"
                onChange={handleChange}
                disabled={loading}
              >
                {roles.map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.name}
                  </MenuItem>
                ))}
              </Select>
              {fieldErrors.role && (
                <FormHelperText>{fieldErrors.role}</FormHelperText>
              )}
            </FormControl>

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
                "Registrar Usuario"
              )}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UserForm;
