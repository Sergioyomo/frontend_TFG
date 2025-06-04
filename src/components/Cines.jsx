import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { apiUrl } from "../config";
import { Grid, Card, CardContent, Container, Typography, Button } from "@mui/material";

/**
 * Componente para listar los senseis.
 * @returns {JSX.Element} El componente de listado de senseis.
 */
function Cines() {
  const [rows, setRows] = useState([]);
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
  }, []); // Se ejecuta solo en el primer renderizado
  return (
    <>
    <Container maxWidth="lg" sx={{mt:4, mb:4}}>
      <Grid container spacing={3} justifyContent="center">
      {rows.map((cine) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={cine.id}>
          <Card sx={{ height: "100%", display: "flex", flexDirection: "column", backgroundColor: "#1976d2", color:"white", borderColor: "gray", borderStyle:"solid", borderWidth:"4px"}}>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h6" component="div">
                {cine.nombre}
              </Typography>
              <Typography variant="body2">
                {cine.ubicacion}
              </Typography>
              <Typography variant="body2">
                Precio de entrada: {cine.precioentrada} €
              </Typography>
               <Button
                  variant="contained"
                  onClick={() => navigate("/cinepeliculas/" + cine.id)}
                  sx={{backgroundColor:"white", color:"black", mt:1}}

              > Ver taquilla
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
    </Container>
    </>
  );
}

export default Cines;
