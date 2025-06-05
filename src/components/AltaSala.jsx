import { Typography, TextField, Stack, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { apiUrl } from '../config';

/**
 * Componente para dar de alta a un nuevo sensei.
 * @returns {JSX.Element} El componente de alta de sensei.
 */
function AltaSala() {
  const [datos, setDatos] = useState({
    id_cine: -1,
    nombre: "",
  });
  const [rows, setRows] = useState([]);
  const [id_cine, setId_cine] = useState(-1);
  const navigate = useNavigate();
  useEffect(() => {
    /**
     * Obtiene la lista de cine.
     */
    async function getCine() {
      let response = await fetch(apiUrl + "/cine");

      if (response.ok) {
        let data = await response.json();
        setRows(data.datos);
      }
    }

    getCine();
  }, []);
  /**
   * Maneja el envío del formulario.
   * @param {Event} e - El evento de envío del formulario.
   */
  const handleSubmit = async (e) => {
    // No hacemos submit
    e.preventDefault();

    // Enviamos los datos mediante fetch
    try {
      const response = await fetch(apiUrl + "/sala", {
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
  const handleChangeSelect = (event) => {
    setId_cine(event.target.value);
    setDatos({...datos, [event.target.name]: event.target.value})
  };

  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Alta de sala
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
    <FormControl fullWidth variant="outlined">
        <InputLabel id="demo-simple-select-label">Id Cine</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={id_cine}
            name="id_cine"
            fullWidth  
            label="IdCine"
            onChange={handleChangeSelect}

        >
            <MenuItem value={-1}><em>Selecciona cine</em></MenuItem>
            {rows.map((row) => (
            <MenuItem value={row.id}>{row.nombre}</MenuItem>
            ))}
           { /*{console.log(rows)}
            {setId_cine(rows[0].id)}
            {setDatos({...datos, ["id_cine"]: rows[0].id})}
        */}
        </Select>
    </FormControl>
            <TextField
              id="outlined-basic"
              label="Nombre"
              variant="outlined"
              name="nombre"
              value={datos.nombre}
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

export default AltaSala;
