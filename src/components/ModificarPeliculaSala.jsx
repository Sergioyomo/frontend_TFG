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
function ModificarPeliculaSala() {
  const params = useParams();
  const [rowsCine, setRowsCine] = useState([]);
  const [rowsPelicula, setRowsPelicula] = useState([]);
  const [rowsSala, setRowsSala] = useState([]);
  const [id_cine, setId_cine] = useState(-1);
  const [id_pelicula, setId_pelicula] = useState(-1);
  const [id_sala, setId_sala] = useState(-1);

  
  let [datos, setDatos] = useState({
    id: params.idpeliculasala,
    id_cine: -1,
    id_pelicula: -1,
    id_sala: -1,
  });

  const navigate = useNavigate();

  useEffect(() => {
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

    async function getPeliculaSalaById() {
      let response = await fetch(apiUrl + "/peliculasala/" + datos.id);
      if (response.ok) {
        let data = await response.json();
        setDatos(data.datos);
        setId_pelicula(data.datos.id_pelicula);
        setId_sala(data.datos.id_sala);
        setId_cine(data.datos.id_cine);
      } else if (response.status === 404) {
        let data = await response.json();
        alert(data.mensaje);
        navigate("/"); // Volver a la página principal por ruta erronea
      }
    }

    getPeliculaSalaById();
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
      const response = await fetch(apiUrl + "/peliculasala/" + datos.id, {
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
        Modificar pelicula-sala
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
            <MenuItem value={-1}><em>selecciona cine</em></MenuItem>
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
            <MenuItem value={-1}><em>selecciona Sala</em></MenuItem>
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
        <InputLabel id="select-pelicula">Id Pelicula</InputLabel>
        <Select
            labelId="select-pelicula"
            id="selectPelicula"
            value={id_pelicula}
            name="id_pelicula"
            fullWidth  
            label="IdPelicula"
            onChange={handleChangeSelectPelicula}
        >
            <MenuItem value={-1}><em>selecciona pelicula</em></MenuItem>
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

export default ModificarPeliculaSala;
