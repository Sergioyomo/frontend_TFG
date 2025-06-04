import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { apiUrl } from "../config";
import { Box, Card, CardContent, Button, Typography, CardMedia, Paper } from "@mui/material";


function ProximosEstrenos() {
  const [pelicula, setPelicula] = useState({});
  const [sesiones, setSesiones] = useState([]);
  const navigate = useNavigate();
  const params = useParams();
  const [diasOrdenados, setDiasOrdenados] = useState([]);
  const [sesionesAgrupadas, setSesionesAgrupadas] = useState({});

  function formatearDia(fechaStr) {
  const fecha = new Date(fechaStr);
  return fecha.toLocaleDateString("es-ES", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
      });
    }


  useEffect(() => {
    /**
     * Obtiene la lista de pelicula.
     */
    async function getPelicula() {
      let response = await fetch(apiUrl + "/pelicula/"+ params.idpelicula);

      if (response.ok) {
        let data = await response.json();

            if (data.datos.portada?.data) {
              const imagen = await bufferToDataURL(data.datos.portada.data);
              data.datos.portadaBase64= imagen;
            }
        setPelicula(data.datos);
      }
    }

    getPelicula();

    async function getSesiones() {
      let response = await fetch(apiUrl + "/sesion/por-pelicula-sala/"+params.idsala+"/"+ params.idpelicula);

      if (response.ok) {
        let data = await response.json();
        setSesiones(data.datos);
        let sesionesRecojidas=data.datos;
        if (sesionesRecojidas) {
          const agrupadas = sesionesRecojidas.reduce((acc, sesion) => {
            if (!acc[sesion.dia]) acc[sesion.dia] = [];
            acc[sesion.dia].push(sesion);
            return acc;
          }, {});
          const dias = Object.keys(agrupadas).sort((a, b) => new Date(a) - new Date(b));

          setSesionesAgrupadas(agrupadas);
          setDiasOrdenados(dias);
        }
      }
    }
    getSesiones();
  }, []); // Se ejecuta solo en el primer renderizado

return (
    <Box maxWidth="md" mx="auto" my={4} px={2}>
      <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, boxShadow: 4 }}>
        <CardMedia
          component="img"
          image={pelicula.portadaBase64}
          alt={pelicula.titulo}
          sx={{ width: { xs: '100%', md: 300 }, objectFit: 'cover' }}
        />
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {pelicula.titulo}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Duración: {pelicula.duracion} min
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Edad recomendada: {pelicula.edad_recomendada}+
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Estreno: {pelicula.fecha_estreno}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Fin de cartelera: {pelicula.fecha_fin_cartelera}
          </Typography>
          <Typography variant="body1" mt={2}>
            {pelicula.sinopsis}
          </Typography>
          <Typography variant="h6" mt={4}>Horarios:</Typography>
            {(!sesiones || sesiones.length === 0) ? (
              <Typography variant="body2" color="text.secondary">No hay sesiones programadas.</Typography>
            ) : ( 
              <>
              {diasOrdenados.map((dia) => (
                <Paper key={dia} sx={{ p: 2, my: 1 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {formatearDia(dia)}
                  </Typography>
                  <Box 
                  display="flex" flexWrap="wrap" gap={1} mt={1}>
                    {sesionesAgrupadas[dia].sort((a, b) => a.hora.localeCompare(b.hora)).map((sesion) => (
                    <Box
                        key={sesion.id}
                        onClick={()=>navigate(`/entrada/${sesion.id}`)}
                        sx={{
                          backgroundColor: "#f0f0f0",
                          px: 2,
                          py: 0.5,
                          borderRadius: "8px",
                          fontWeight: "500",
                          cursor: "pointer", // importante para indicar que es clickeable
                          '&:hover': {
                            backgroundColor: "#e0e0e0",
                          },
                        }}
                      >
                        {sesion.hora}
                      </Box>
                    ))}
                  </Box>
                </Paper>
              ))}
              </>
              )}
        </CardContent>
      </Card>
      <Box mt={2}>
        <Button variant="text" onClick={() => navigate(-1)}>
          ← Volver
        </Button>
      </Box>
    </Box>
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
