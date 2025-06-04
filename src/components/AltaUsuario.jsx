import { useState } from "react";
import { TextField, Button, Box, Typography, Alert, InputLabel, Select, MenuItem, FormControl, Stack } from "@mui/material";
import { apiUrl } from "../config";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router";

/**
 * Componente para el registro de usuarios.
 * @component
 * @returns {JSX.Element} JSX element del componente SignUp.
 */
function AltaUsuario() {
  const navigate = useNavigate();
  const [rol, setRol] = useState('N');
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    rol: "N",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  /**
   * Maneja el cambio en los campos del formulario.
   * @param {Object} e - Evento de cambio.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleChangeSelect = (event) => {
    setRol(event.target.value);
    setFormData({...formData, [event.target.name]: event.target.value})
  };

  /**
   * Valida los datos del formulario.
   * @returns {boolean} True si los datos son válidos, false en caso contrario.
   */
  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "El nombre de usuario es obligatorio.";
    }
    if (!formData.email) {
      newErrors.email = "El correo electrónico es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "El formato del correo no es válido.";
    }
    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria.";
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres.";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Devuelve true si no hay errores
  };

  /**
   * Maneja el envío del formulario.
   * @param {Object} e - Evento de envío.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch(apiUrl + "/usuario/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          rol:formData.rol,
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          rol: "N",
        });    
        setErrors({});
        const respuesta = await response.json();
        alert(respuesta.mensaje);
        if (respuesta.ok) {
            navigate("/"); // Volver a la página principal
          }
      } else {
        const data = await response.json();
        setErrors({
          apiError: data.mensaje || "Error al dar de alta el usuario.",
        });
      }
    } catch (error) {
      setErrors({ apiError: "Error de red. Inténtalo de nuevo más tarde." });
    }
  };

  return (
    <Box
      sx={{ mt: 2, mb: 2, justifyContent: "center", alignItems: "center" }}
      /*sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 4,
        mb: 4,
        p: 2,
        //boxShadow: 2,
        //borderRadius: 2,
      }}*/
    >
      <Typography variant="h5" align="center" gutterBottom>
        Alta Usuario
      </Typography>

      {errors.apiError && <Alert severity="error">{errors.apiError}</Alert>}
      {/* {success && <Alert severity="success">Registro exitoso.</Alert>} */}

      <Grid
        container
        spacing={2}
        direction="column"
        sx={{ mt: 2, mb: 2, justifyContent: "center", alignItems: "center" }}
      >
         <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Stack
            component="form"
            spacing={2}
            onSubmit={handleSubmit}
            sx={{ mx: 2 }}
          >
          <TextField
            fullWidth
            label="Nombre de usuario"
            name="username"
            value={formData.username}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
          />

          <TextField
            fullWidth
            label="Correo electrónico"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />

          <TextField
            fullWidth
            label="Contraseña"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />

          <TextField
            fullWidth
            label="Confirmar contraseña"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />
        <FormControl fullWidth variant="outlined">
        <InputLabel id="demo-simple-select-label">Rol</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={rol}
            name="rol"
            fullWidth  
            label="Rol"
            onChange={handleChangeSelect}

        >
            <MenuItem value="N">Normal</MenuItem>
            <MenuItem value="A">Administrador</MenuItem>
            <MenuItem value="AP">Administrador Privilegiado</MenuItem>
        </Select>
        </FormControl>

          <Button type="submit" fullWidth={true} variant="contained">
            Aceptar
          </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AltaUsuario;
