import { Typography, TextField, Stack, Button, Checkbox, FormGroup, FormControlLabel } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { apiUrl } from "../config";

/**
 * Componente para modificar los datos de un pelicula.
 * Obtiene los datos del pelicula por su ID y permite modificarlos.
 *
 * @component
 * @example
 * return (
 *   <ModificarPelicula />
 * )
 */
function ModificarPelicula() {
  const params = useParams();
  const [portada, setPortada] = useState(null);
  const [previewPortada, setPreviewPortada] = useState(null); // imagen para mostrar
  let [datos, setDatos] = useState({
    id: params.idPelicula,
    titulo: "",
    sinopsis: "",
    duracion: "",
    edad_recomendada: "",
    fecha_estreno: "",
    fecha_fin_cartelera: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    async function getPeliculaById() {
      let response = await fetch(apiUrl + "/pelicula/" + datos.id);
      if (response.ok) {
        let data = await response.json();
        setDatos(data.datos);
        // Crear blob para mostrar la portada
      if (data.datos.portada?.data) {
        const mimeType = "image/jpeg"; // ajusta si envías otro tipo
        const byteArray = new Uint8Array(data.datos.portada.data);
        const blob = new Blob([byteArray], { type: mimeType });
        setPreviewPortada(URL.createObjectURL(blob));
      }
      } else if (response.status === 404) {
        let data = await response.json();
        alert(data.mensaje);
        navigate("/"); // Volver a la página principal por ruta erronea
      }
    }

    getPeliculaById();
  }, []); // Se ejecuta solo en el primer renderizado

  /**
   * Maneja el envío del formulario.
   * Envía los datos modificados del pelicula al servidor.
   *
   * @param {Event} e - Evento de envío del formulario.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
      try {
      const formData = new FormData();
      formData.append("titulo", datos.titulo);
      formData.append("sinopsis", datos.sinopsis);
      formData.append("duracion", datos.duracion);
      formData.append("edad_recomendada", datos.edad_recomendada);
      formData.append("fecha_estreno", datos.fecha_estreno);
      formData.append("fecha_fin_cartelera", datos.fecha_fin_cartelera);

      if (portada) {
        formData.append("portada", portada);
      }

      const response = await fetch(apiUrl + "/pelicula/" + datos.id, {
        method: "PUT",
        body: formData,
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
        Modificar de película
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{ mt: 2, mb:2, justifyContent: "center", alignItems: "center" }}
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
              label="Título"
              variant="outlined"
              name="titulo"
              value={datos.titulo}
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Sinopsis"
              variant="outlined"
              name="sinopsis"
              value={datos.sinopsis}
              onChange={handleChange}
              multiline
              rows={4}
            />
            <TextField
              id="outlined-basic"
              label="Edad recomendada"
              variant="outlined"
              name="edad_recomendada"
              value={datos.edad_recomendada}
              onChange={handleChange}
              type="number"
              itemProp={{step:"1",min:"0"}}
            />
            <TextField
              id="outlined-basic"
              label="Duración"
              variant="outlined"
              name="duracion"
              value={datos.duracion}
              onChange={handleChange}
              type="number"
              itemProp={{step:"1",min:"0"}}
            />
            <TextField
              type="date"
              InputLabelProps={{shrink:true}}
              id="outlined-basic"
              label="Fecha estreno"
              variant="outlined"
              name="fecha_estreno"
              value={datos.fecha_estreno}
              onChange={handleChange}
            />
              <TextField
              type="date"
              InputLabelProps={{shrink:true}}
              id="outlined-basic"
              label="Fecha fin cartelera"
              variant="outlined"
              name="fecha_fin_cartelera"
              value={datos.fecha_fin_cartelera}
              onChange={handleChange}
            />
              <div className="form-group" style={{ display: "flex", flexDirection:"column", justifyContent: "center"}}>
                  {previewPortada && (
            <img
              src={previewPortada}
              alt="Portada actual"
              style={{ maxWidth: "100%", marginBottom: "10px", borderRadius: "8px" }}
            />
          )}
          <Button variant="contained" component="label" sx={{backgroundColor:"darkblue", color:"white"}}>
            Subir nueva portada
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setPortada(file);
                  setPreviewPortada(URL.createObjectURL(file));
                }
              }}
            />
          </Button>     
            </div> 
            <Button variant="contained" type="submit">
              Aceptar
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default ModificarPelicula;
