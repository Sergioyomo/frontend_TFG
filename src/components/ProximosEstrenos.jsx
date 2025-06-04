import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { apiUrl } from "../config";
import { Grid, Card, CardContent, Container, Typography, CardMedia } from "@mui/material";

function ProximosEstrenos() {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    /**
     * Obtiene la lista de pelicula.
     */
    async function getPelicula() {
      let response = await fetch(apiUrl + "/pelicula?estreno=true");

      if (response.ok) {
        let data = await response.json();
        let peliculasConImagen = await Promise.all(
          data.datos.map(async (pelicula) => {
            if (pelicula.portada?.data) {
              const imagen = await bufferToDataURL(pelicula.portada.data);
              return { ...pelicula, portadaBase64: imagen };
            }
            return pelicula;
          })
        );
        setRows(peliculasConImagen);
      }
    }

    getPelicula();
  }, []); // Se ejecuta solo en el primer renderizado

  return (
    <>
     <Container maxWidth="lg" sx={{mt:4, mb:4}}>
      <Grid container spacing={3} justifyContent="center">
      {rows.map((pelicula) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={pelicula.id}>
          <Card sx={{ height: "100%", display: "flex", flexDirection: "column", backgroundColor: "#1976d2", color:"white", borderColor: "gray", borderStyle:"solid", borderWidth:"4px"}}>
          <CardMedia
              component="img"
              height="430"
              image={pelicula.portadaBase64}            
              alt={pelicula.titulo}
              /*sx={{
                objectFit: "contain", // o "cover"
                backgroundColor: "#fff" // opcional: fondo blanco para imágenes con transparencia
              }}*/
            />
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h6" component="div">
                {pelicula.titulo}
              </Typography>
              <Typography variant="body2">
                fecha de estreno: {pelicula.fecha_estreno}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
    </Container>
    </>
  );
}
const bufferToDataURL = (data, mimeType = "image/jpeg") => {
  return new Promise((resolve, reject) => {
    const uint8Array = new Uint8Array(data);
    const blob = new Blob([uint8Array], { type: mimeType });
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result); // devuelve el base64
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};
export default ProximosEstrenos;
