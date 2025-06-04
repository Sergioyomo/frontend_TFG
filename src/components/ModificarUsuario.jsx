import { TextField, Button, Box, Typography, Alert, InputLabel, Select, MenuItem, FormControl, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { apiUrl } from "../config";

/**
 * Componente para modificar los datos de un usuario.
 * Obtiene los datos del usuario por su ID y permite modificarlos.
 *
 * @component
 * @example
 * return (
 *   <ModificarUsuario />
 * )
 */
function ModificarUsuario() {
  const params = useParams();
  const [rol, setRol] = useState('N');
  
  let [datos, setDatos] = useState({
    id: params.idUsuario,
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
    rol: "N",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getUsuarioById() {
      let response = await fetch(apiUrl + "/usuario/" + datos.id);
      if (response.ok) {
        let data = await response.json();
        setDatos(data.datos);
        setRol(data.datos.rol);
      } else if (response.status === 404) {
        let data = await response.json();
        alert(data.mensaje);
        navigate("/"); // Volver a la página principal por ruta erronea
      }
    }

    getUsuarioById();
  }, []); // Se ejecuta solo en el primer renderizado
    const validate = () => {
    const newErrors = {};
    if (!datos.nombre.trim()) {
      newErrors.nombre = "El nombre de usuario es obligatorio.";
    }
    if (!datos.email) {
      newErrors.email = "El correo electrónico es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.email)) {
      newErrors.email = "El formato del correo no es válido.";
    }
    if (!datos.password) {
    } else if (datos.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres.";
    }
    if (datos.password !== datos.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Devuelve true si no hay errores
  };
  /**
   * Maneja el envío del formulario.
   * Envía los datos modificados del usuario al servidor.
   *
   * @param {Event} e - Evento de envío del formulario.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
        if(!datos.password){
            delete datos.password
        }
      const response = await fetch(apiUrl + "/usuario/" + datos.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      });

      if (response.ok) {
        setSuccess(true);
        setErrors({});
        alert("Actualización correcta");
        navigate(-1); // Volver a la ruta anterior
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

  /**
   * Maneja los cambios en los campos de texto.
   *
   * @param {Event} e - Evento de cambio en el campo de texto.
   */
  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeSelect = (event) => {
  setRol(event.target.value);
  setDatos({...datos, [event.target.name]: event.target.value})
  };
  return (
    <>
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
        Modificar Usuario
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
            name="nombre"
            value={datos.nombre}
            onChange={handleChange}
            error={!!errors.nombre}
            helperText={errors.nombre}
          />

          <TextField
            fullWidth
            label="Correo electrónico"
            name="email"
            value={datos.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />

          <TextField
            fullWidth
            label="Contraseña"
            name="password"
            type="password"
            value={datos.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />

          <TextField
            fullWidth
            label="Confirmar contraseña"
            name="confirmPassword"
            type="password"
            value={datos.confirmPassword}
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
    </>
  );
}

export default ModificarUsuario;
