import { useEffect, useState } from "react";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { apiUrl } from "../config";
import Typography from "@mui/material/Typography";
import { MDBContainer } from "mdb-react-ui-kit";


/**
 * Componente para mostrar una gráfica de barras con los pesos de los senseis.
 * @returns {JSX.Element} El componente de la gráfica de senseis.
 */
function GraficaPeliculaTaquillera() {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    /**
     * Obtiene los datos de los senseis para la gráfica.
     */
    async function getDatosGraficaPeliculaTaquillera() {
      let response = await fetch(apiUrl + "/pelicula/taquillera", {
        method: "GET",
      }); 

      if (response.ok) {
        let data = await response.json();
        // Hacer map para simplificar estructura de datos, eliminando atributos que contienen un punto en el nombre
        let datosGrafica = data.datos.map((fila) => {
          return {
            titulo: fila.titulo,
            vendidas: parseInt(fila.vendidas),
          };
        });
        setDatos(datosGrafica);
        // console.log(data.datos);
        //console.log(datosGrafica);
      }
    }

    getDatosGraficaPeliculaTaquillera();
  }, []); // Se ejecuta solo en el primer renderizado

  return (
    <>
      {/* Contenedor para el contenido del PDF */}
        <MDBContainer align="center">
        <Typography variant="h4" align="center" sx={{ mt: 4 }}>
          Películas más taquilleras
        </Typography>

        {/* Gráfico de barras para los pesos */}  
        <BarChart
          width={800}
          height={400}
          
          data={datos}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="4 4" />
          <XAxis dataKey="titulo" />
          <YAxis />          
          <Tooltip />
          <Legend />
          <Bar dataKey="vendidas" fill="#8884d8" activeBar={<Rectangle fill="green" stroke="blue" />} />
        </BarChart>

      </MDBContainer>
    </>
  );
}

export default GraficaPeliculaTaquillera;
