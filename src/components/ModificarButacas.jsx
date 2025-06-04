import {
  Table, TableBody, TableCell, TableHead, TableRow,
  Button, Box, Typography, Stack, IconButton
} from '@mui/material';
import Grid from "@mui/material/Grid2";
import ChairIcon from '@mui/icons-material/Chair';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { apiUrl } from "../config";
const MAX_FILAS = 11;
const MAX_COLUMNAS = 15;


/**
 * Componente para modificar los datos de un butacas.
 * Obtiene los datos del butacas por su ID y permite modificarlos.
 *
 * @component
 * @example
 * return (
 *   <ModificarButacas />
 * )
 */
function ModificarButacas() {
  const params = useParams();
  const [butacasOriginales, setButacasOriginales] = useState([]);
  const [butacas, setButacas] = useState([
    {id: -1, id_sala: params.idSala, fila: "A", numero: 1},
    {id: -1, id_sala: params.idSala, fila: "A", numero: 2},
    {id: -1, id_sala: params.idSala, fila: "A", numero: 3},
    {id: -1, id_sala: params.idSala, fila: "A", numero: 4},
    {id: -1, id_sala: params.idSala, fila: "A", numero: 5}

  ]);
  const [filas, setFilas] = useState(['A']);
  const [numeros, setNumeros] = useState([1, 2, 3, 4, 5]);



  const navigate = useNavigate();

  useEffect(() => {
    async function getButacasById() {
      let response = await fetch(apiUrl + "/butacas/sala/" + params.idSala);
      if (response.ok) {
        let data = await response.json();
        setButacas(data.datos);
        setButacasOriginales(data.datos);
        const letras = [...new Set(data.datos.map(b => b.fila))].sort();
        const nums = [...new Set(data.datos.map(b => b.numero))].sort((a, b) => a - b);
        setFilas(letras);
        setNumeros(nums);
      } /*else if (response.status === 404) {
        let data = await response.json();
        alert(data.mensaje);
        navigate("/"); // Volver a la página principal por ruta erronea
      }*/
    }

    getButacasById();
  }, []); // Se ejecuta solo en el primer renderizado

  /**
   * Maneja el envío del formulario.
   * Envía los datos modificados del butacas al servidor.
   *
   * @param {Event} e - Evento de envío del formulario.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const nuevas = butacas.filter(b => b.id === -1).map(b => ({
            ...b,
            id_sala: parseInt(params.idSala)
          }));

          const eliminadas = butacasOriginales.filter(orig =>
            !butacas.some(b => b.fila === orig.fila && b.numero === orig.numero)
          );
      const response = await fetch(apiUrl + "/butacas/sala/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          butacasnuevas: nuevas,
          butacaseliminadas: eliminadas
        }),
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
const toggleButaca = (fila, numero) => {
    const existe = butacas.find(b => b.fila === fila && b.numero === numero);
    if (existe) {
      setButacas(butacas.filter(b => !(b.fila === fila && b.numero === numero)));
    } else {
      setButacas([...butacas, { id:-1, id_sala:parseInt(params.idSala,10), fila, numero }]);
    }
  };
  const siguienteLetra = (letras) => {
    const ultima = letras[letras.length - 1];
    return String.fromCharCode(ultima.charCodeAt(0) + 1);
  };
  const quitarUltimaFila = () => {
    if (filas.length > 1) {
      const nuevaFilas = filas.slice(0, -1);
      setFilas(nuevaFilas);
      setButacas(butacas.filter(b => nuevaFilas.includes(b.fila)));
    }
  };

  const quitarUltimaColumna = () => {
    if (numeros.length > 1) {
      const nuevaNumeros = numeros.slice(0, -1);
      setNumeros(nuevaNumeros);
      setButacas(butacas.filter(b => nuevaNumeros.includes(b.numero)));
    }
  };
  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Modificar butacas
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{ mt: 2, mb:2, justifyContent: "center", alignItems: "center" }}
      >
        <Grid>
          <Stack
            component="form"
            spacing={2}
            onSubmit={handleSubmit}
            sx={{ mx: 2 }}
          >
            <Table>
            <TableHead>
                <TableRow>
                <TableCell></TableCell>
            {numeros.map(num => (
              <TableCell key={num} align="center"><strong>{num}</strong></TableCell>
            ))}                </TableRow>
            </TableHead>
            <TableBody>
                {filas.map(fila => (
                <TableRow key={fila}>
                    <TableCell>{fila}</TableCell>
                    {numeros.map(num => {
                    const existe = butacas.find(b => b.fila === fila && b.numero === num);
                    return (
                        <TableCell key={num} align="center">
                       <IconButton onClick={() => toggleButaca(fila, num)}>
                      <ChairIcon sx={{ color: existe ? 'green' : 'gray' }} />
                    </IconButton>
                        </TableCell>
                    );
                    })}
                </TableRow>
                ))}
            </TableBody>
            </Table>
        <Box mt={2} display="flex" justifyContent="center" flexWrap="wrap" gap={2}>
        <Button
          variant="outlined"
          disabled={filas.length >= MAX_FILAS}
        onClick={() => {
            const nuevaFila = siguienteLetra(filas);
            setFilas([...filas, nuevaFila]);
            const nuevasButacas = numeros.map(num => ({id:-1, id_sala:parseInt(params.idSala,10), fila: nuevaFila, numero: num }));
            setButacas([...butacas, ...nuevasButacas]);
          }}        >
          Añadir fila
        </Button>
        <Button
          variant="outlined"
          disabled={filas.length <= 1}
          onClick={quitarUltimaFila}
        >
          Quitar fila
        </Button>

        <Button
          variant="outlined"
          disabled={numeros.length >= MAX_COLUMNAS}
          onClick={() => {
            const nuevoNumero = Math.max(...numeros) + 1;
            setNumeros([...numeros, nuevoNumero]);
            const nuevasButacas = filas.map(fila => ({ id:-1, id_sala:parseInt(params.idSala,10), fila, numero: nuevoNumero }));
            setButacas([...butacas, ...nuevasButacas]);
          }}        >
          Añadir columna
        </Button>

        <Button
          variant="outlined"
          disabled={numeros.length <= 1}
          onClick={quitarUltimaColumna}
        >
          Quitar columna
        </Button>
        <Button variant="contained" color="primary" type="submit">
          Guardar cambios
        </Button>
      </Box>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default ModificarButacas;
