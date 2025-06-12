import React, { useEffect, useState, type ChangeEvent } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Alert,
  Box,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { getCountries, type Country } from "../../services/countryService";
import * as userService from "../../services/userService";
import type { User, UserDTO } from "../../models/user";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import type { SelectChangeEvent } from "@mui/material";

interface UserFormDialogProps {
  open: boolean;
  mode: 'create' | 'edit' | 'view';
  onClose: () => void;
  onSuccess?: () => void;
  userToEdit?: User | null;
}

const roles = [
  { id: 1, name: "Admin" },
  { id: 2, name: "Organizador" },
  { id: 3, name: "Juez" },
  { id: 4, name: "Jugador" },
];

const UserFormDialog: React.FC<UserFormDialogProps> = ({ open, mode, onClose, onSuccess, userToEdit }) => {
  const { user } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState<UserDTO>({
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

  useEffect(() => {
    if (userToEdit) {
      setFormData({
        ...userToEdit,
        password: "", // never prefill passwords
      });
    } else {
      setFormData({
        name: "",
        username: "",
        email: "",
        password: "",
        role: 4,
        countryId: 1,
        avatar: "",
      });
    }
    setFieldErrors({});
    setError(null);
    setSuccess(null);
  }, [userToEdit, open]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<number>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setFieldErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[name];
      return updatedErrors;
    });
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) errors.name = "El nombre es requerido";
    
    if (!formData.username.trim()) errors.username = "El nombre de usuario es requerido";
    else if (formData.username.length < 3) errors.username = "Debe tener al menos 3 caracteres";
    
    if (!formData.email.trim()) errors.email = "El email es requerido";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = "Email inválido";
    
    if (!formData.avatar.trim()) errors.avatar = "La url de avatar es requerida";

    if (!userToEdit && !formData.password) errors.password = "La contraseña es requerida";
    else if (!userToEdit && formData.password.length < 6) errors.password = "Mínimo 6 caracteres";

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
    if (!validateForm()) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (userToEdit) {
        await userService.updateUser(userToEdit.id, formData);
        setSuccess("Usuario actualizado correctamente");
      } else {
        await userService.createUser(formData);
        setSuccess("Usuario creado correctamente");
      }
      onSuccess?.();
      onClose();
    } catch (err) {
      setError("Error inesperado. Intenta nuevamente.");
      console.error("Error al guardar usuario:", err);
    } finally {
      setLoading(false);
    }
  };

  // Opciones de Vistas
  const getTitle = () => {
    switch (mode) {
        case "create":
        return "Registrar Usuario";
        case "edit":
        return "Editar Usuario";
        case "view":
        return "Ver Usuario";
        default:
        return "Usuario";
    }
    };


  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{getTitle()}</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

          <TextField
            fullWidth
            label="Nombre"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!fieldErrors.name}
            helperText={fieldErrors.name}
            margin="normal"
            disabled={mode === 'view' || loading}
          />

          <TextField
            fullWidth
            label="Nombre de Usuario"
            name="username"
            value={formData.username}
            onChange={handleChange}
            error={!!fieldErrors.username}
            helperText={fieldErrors.username}
            margin="normal"
            disabled={mode === 'view' || loading}
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={!!fieldErrors.email}
            helperText={fieldErrors.email}
            margin="normal"
            disabled={mode === 'view' || mode === 'edit' || loading}
          />

          {mode === 'create' && (
            <TextField
              fullWidth
              label="Contraseña"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={!!fieldErrors.password}
              helperText={fieldErrors.password}
              margin="normal"
              disabled={loading}
            />
          )}

          <FormControl fullWidth margin="normal" error={!!fieldErrors.role} disabled={loading}>
            <InputLabel id="role-label">Rol</InputLabel>
            <Select
              labelId="role-label"
              name="role"
              value={formData.role}
              label="Rol"
              onChange={handleChange as any}
              disabled={mode === 'view' || loading}
            >
              {roles.map((role) => (
                <MenuItem key={role.id} value={role.id}>{role.name}</MenuItem>
              ))}
            </Select>
            {fieldErrors.role && <FormHelperText>{fieldErrors.role}</FormHelperText>}
          </FormControl>

          <TextField
              fullWidth
              label="Avatar URL"
              name="avatar"
              type="text"
              value={formData.avatar}
              onChange={handleChange}
              error={!!fieldErrors.avatar}
              helperText={fieldErrors.avatar}
              margin="normal"
              disabled={loading}
            />

          <FormControl fullWidth margin="normal" disabled={loading}>
            <InputLabel id="country-label">País</InputLabel>
            <Select
              labelId="country-label"
              name="countryId"
              value={formData.countryId}
              label="País"
              onChange={handleChange as any}
              disabled={mode === 'view' || loading}
            >
              {countries.map((country) => (
                <MenuItem key={country.id} value={country.id}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <DialogActions sx={{ mt: 3 }}>
            <Button onClick={onClose} disabled={loading}>Cancelar</Button>

            {mode !== 'view' && (
                <Button type="submit" variant="contained" disabled={loading}>
                    {loading ? <CircularProgress size={20} sx={{ mr: 1 }} /> : userToEdit ? "Actualizar" : "Registrar"}
                </Button>
            )}

          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default UserFormDialog;
