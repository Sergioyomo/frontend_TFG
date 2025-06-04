import { Typography, TextField, Stack, Button, Checkbox, FormGroup, FormControlLabel } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import { useNavigate } from "react-router";
import { apiUrl } from '../config';

/**
 * Componente para dar de alta a un nuevo sensei.
 * @returns {JSX.Element} El componente de alta de sensei.
 */
function AltaCine() {
  const [datos, setDatos] = useState({
    nombre: "",
    ubicacion: "",
    precioentrada: "",
  });
  const navigate = useNavigate();

  /**
   * Maneja el envío del formulario.
   * @param {Event} e - El evento de envío del formulario.
   */
  const handleSubmit = async (e) => {
    // No hacemos submit
    e.preventDefault();

    // Enviamos los datos mediante fetch
    try {
      const response = await fetch(apiUrl + "/cine", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      });

      if (response.ok) {
        const respuesta = await response.json();
        alert(respuesta.mensaje);
        if (respuesta.ok) {
          navigate("/"); // Volver a la página principal
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error:", error);
    }
  };

  /**
   * Maneja los cambios en los campos del formulario.
   * @param {Event} e - El evento de cambio del campo.
   */
  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
    console.log(datos);
  };

  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Alta de cine
      </Typography>
      <Grid
        container
        spacing={2}
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
              id="outlined-basic"
              label="Nombre"
              variant="outlined"
              name="nombre"
              value={datos.nombre}
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="ubicacion"
              variant="outlined"
              name="ubicacion"
              value={datos.ubicacion}
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="precio entrada"
              variant="outlined"
              name="precioentrada"
              value={datos.precioentrada}
              onChange={handleChange}
            />
            <Button variant="contained" type="submit">
              Aceptar
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default AltaCine;
