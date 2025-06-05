import { Typography, TextField, Stack, Button, Checkbox, FormGroup, FormControlLabel } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { apiUrl } from "../config";

/**
 * Componente para modificar los datos de un cine.
 * Obtiene los datos del cine por su ID y permite modificarlos.
 *
 * @component
 * @example
 * return (
 *   <ModificarCine />
 * )
 */
function ModificarCine() {
  const params = useParams();
  let [datos, setDatos] = useState({
    id: params.idCine,
    nombre: "",
    ubicacion: "",
    precioentrada: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    async function getCineById() {
      let response = await fetch(apiUrl + "/cine/" + datos.id);
      if (response.ok) {
        let data = await response.json();
        setDatos(data.datos);
      } else if (response.status === 404) {
        let data = await response.json();
        alert(data.mensaje);
        navigate("/"); // Volver a la página principal por ruta erronea
      }
    }

    getCineById();
  }, []); // Se ejecuta solo en el primer renderizado

  /**
   * Maneja el envío del formulario.
   * Envía los datos modificados del cine al servidor.
   *
   * @param {Event} e - Evento de envío del formulario.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(apiUrl + "/cine/" + datos.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      });

      if (response.ok) {
        alert("Actualización correcta");
        navigate(-1); // Volver a la ruta anterior
      } else {
        const data = await response.json();
        alert(data.mensaje);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error:", error);
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
  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Modificar cine
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{ mt: 2, justifyContent: "center", alignItems: "center" }}
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
              label="Ubicación"
              variant="outlined"
              name="ubicacion"
              value={datos.ubicacion}
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Precio entrada"
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

export default ModificarCine;
