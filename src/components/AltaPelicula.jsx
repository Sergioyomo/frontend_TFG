import { Typography, TextField, Stack, Button, FormGroup, FormControlLabel } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import { useNavigate } from "react-router";
import { apiUrl } from '../config';

/**
 * Componente para dar de alta a un nuevo sensei.
 * @returns {JSX.Element} El componente de alta de sensei.
 */
function AltaPelicula() {
  const [portada, setPortada] = useState(null);
  const [previewPortada, setPreviewPortada] = useState(null); // imagen para mostrar
  const [datos, setDatos] = useState({
    titulo: "",
    sinopsis: "",
    edad_recomendada: 0,
    duracion: 0,
    fecha_estreno:"",
    fecha_fin_cartelera:"",
  });
  const navigate = useNavigate();

  /**
   * Maneja el envío del formulario.
   * @param {Event} e - El evento de envío del formulario.
   */
  const handleSubmit = async (e) => {
    // No hacemos submit
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
        const response = await fetch(apiUrl + "/pelicula", {
          method: "POST",
          body: formData,

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
        Alta de película
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

export default AltaPelicula;
