import { Typography, Stack, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { apiUrl } from '../config';

/**
 * Componente para dar de alta a un nuevo sensei.
 * @returns {JSX.Element} El componente de alta de sensei.
 */
function AltaPeliculaSala() {
  const [datos, setDatos] = useState({
    id_cine: -1,
    id_pelicula: -1,
    id_sala: -1,
  });
  const [rowsCine, setRowsCine] = useState([]);
  const [rowsPelicula, setRowsPelicula] = useState([]);
  const [rowsSala, setRowsSala] = useState([]);
  const [id_cine, setId_cine] = useState(-1);
  const [id_pelicula, setId_pelicula] = useState(-1);
  const [id_sala, setId_sala] = useState(-1);
  const navigate = useNavigate();
  useEffect(() => {
    /**
     * Obtiene la lista de cine.
     */
    async function getCine() {
      let response = await fetch(apiUrl + "/cine");

      if (response.ok) {
        let data = await response.json();
        setRowsCine(data.datos);
      }
    }
    async function getPelicula() {
      let response = await fetch(apiUrl + "/pelicula");

      if (response.ok) {
        let data = await response.json();
        setRowsPelicula(data.datos);
      }
    }
    async function getSala() {
      let response = await fetch(apiUrl + "/sala");

      if (response.ok) {
        let data = await response.json();
        setRowsSala(data.datos);
      }
    }

    getSala();
    getPelicula();
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
      const response = await fetch(apiUrl + "/peliculasala", {
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
  const handleChangeSelect = (event) => {
    setId_cine(event.target.value);
    setDatos({...datos, [event.target.name]: event.target.value})
    setId_sala(-1);
    setDatos({...datos, ["id_sala"]: -1})

  };
  const handleChangeSelectSala = (event) => {
    setId_sala(event.target.value);
    setDatos({...datos, [event.target.name]: event.target.value})
  };
  const handleChangeSelectPelicula = (event) => {
    setId_pelicula(event.target.value);
    setDatos({...datos, [event.target.name]: event.target.value})
  };
  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Añadir pelicula a sala
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
        <InputLabel id="select-cine">Id Cine</InputLabel>
        <Select
            labelId="select-cine"
            id="selectCine"
            value={id_cine}
            name="id_cine"
            fullWidth  
            label="IdCine"
            onChange={handleChangeSelect}

        >
            <MenuItem value={-1}><em>Selecciona cine</em></MenuItem>
            {rowsCine.map((row) => (
            <MenuItem value={row.id}>{row.nombre}</MenuItem>
            ))}
        </Select>
    </FormControl>
    <FormControl fullWidth variant="outlined">
        <InputLabel id="select-sala">Id Sala</InputLabel>
        <Select
            labelId="select-sala"
            id="selectSala"
            value={id_sala}
            name="id_sala"
            fullWidth  
            label="IdSala"
            onChange={handleChangeSelectSala}

        >
            <MenuItem value={-1}><em>Selecciona sala</em></MenuItem>
            {/*rowsSala.map((row) => (
            <MenuItem value={row.id} className={`sala-menuItem cine-${row.id_cine}`}>{row.nombre}</MenuItem>
            ))*/}
            {rowsSala
                .filter((row) => row.id_cine.toString() === id_cine.toString())
                .map((row) => (
                <MenuItem key={row.id} value={row.id}>
                    {row.nombre}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
        <FormControl fullWidth variant="outlined">
        <InputLabel id="select-pelicula">Id Película</InputLabel>
        <Select
            labelId="select-pelicula"
            id="selectPelicula"
            value={id_pelicula}
            name="id_pelicula"
            fullWidth  
            label="IdPelicula"
            onChange={handleChangeSelectPelicula}

        >
            <MenuItem value={-1}><em>Selecciona película</em></MenuItem>
            {rowsPelicula.map((row) => (
            <MenuItem value={row.id}>{row.titulo}</MenuItem>
            ))}
        </Select>
    </FormControl>
            <Button variant="contained" type="submit">
              Aceptar
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default AltaPeliculaSala;
