import { Typography, TextField, Stack, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { apiUrl } from "../config";

/**
 * Componente para modificar los datos de un sala.
 * Obtiene los datos del sala por su ID y permite modificarlos.
 *
 * @component
 * @example
 * return (
 *   <ModificarSala />
 * )
 */
function ModificarSala() {
  const params = useParams();
  const [rows, setRows] = useState([]);
  const [id_cine, setId_cine] = useState(-1);
  let [datos, setDatos] = useState({
    id: params.idSala,
    id_cine: "",
    nombre: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
     async function getCine() {
      let response = await fetch(apiUrl + "/cine");

      if (response.ok) {
        let data = await response.json();
        setRows(data.datos);
      }
    }

    getCine();
    async function getSalaById() {
      let response = await fetch(apiUrl + "/sala/" + datos.id);
      if (response.ok) {
        let data = await response.json();
        setDatos(data.datos);
        setId_cine(data.datos.id_cine);
      } else if (response.status === 404) {
        let data = await response.json();
        alert(data.mensaje);
        navigate("/"); // Volver a la página principal por ruta erronea
      }
    }

    getSalaById();
  }, []); // Se ejecuta solo en el primer renderizado

  /**
   * Maneja el envío del formulario.
   * Envía los datos modificados del sala al servidor.
   *
   * @param {Event} e - Evento de envío del formulario.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(apiUrl + "/sala/" + datos.id, {
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
    const handleChangeSelect = (event) => {
    setId_cine(event.target.value);
    setDatos({...datos, [event.target.name]: event.target.value})
  };
  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Modificar sala
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
            <MenuItem value={-1}><em>selecciona cine</em></MenuItem>
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
              label="nombre"
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

export default ModificarSala;
