import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Button from "@mui/material/Button";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useNavigate } from "react-router";
import { apiUrl } from "../config";
import generatePDF from "../utils/generatePDF";
/**
 * Componente para listar los senseis.
 * @returns {JSX.Element} El componente de listado de senseis.
 */
function ListadoPelicula() {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    /**
     * Obtiene la lista de pelicula.
     */
    async function getPelicula() {
      let response = await fetch(apiUrl + "/pelicula");

      if (response.ok) {
        let data = await response.json();
        setRows(data.datos);
      }
    }

    getPelicula();
  }, []); // Se ejecuta solo en el primer renderizado

  /**
   * Maneja la eliminación de un pelicula.
   * @param {number} idPelicula - El ID del pelicula a eliminar.
   */
  const handleDelete = async (idPelicula) => {
    let response = await fetch(apiUrl + "/pelicula/" + idPelicula, {
      method: "DELETE",
    });
      console.log(response);
    if (response.ok) {
      // Utilizando filter creo un array sin el plato borrado
      const peliculaTrasBorrado = rows.filter(
        (pelicula) => pelicula.id != idPelicula
      );
      // Establece los datos de nuevo para provocar un renderizado
      setRows(peliculaTrasBorrado);
    }
  };

  return (
    <>
      <Box id="pdf-content">
        <Typography variant="h4" align="center" sx={{ mt: 2 }}>
          Listado de película
        </Typography>

        <Box sx={{ mx: 4 }}>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">ID</TableCell>
                  <TableCell>TÍTULO</TableCell>
                  <TableCell>SINOPSIS</TableCell>
                  <TableCell>DURACIÓN</TableCell>
                  <TableCell>EDAD RECOMENDADA</TableCell>
                  <TableCell>FECHA ESTRENO</TableCell>
                  <TableCell>FECHA FIN CARTELERA</TableCell>
                  <TableCell>ELIMINAR</TableCell>
                  <TableCell>EDITAR</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="right">{row.id}</TableCell>
                    <TableCell>{row.titulo}</TableCell>
                    <TableCell>{row.sinopsis}</TableCell>
                    <TableCell>{row.duracion}</TableCell>
                    <TableCell>{row.edad_recomendada}</TableCell>
                    <TableCell>{row.fecha_estreno}</TableCell>
                    <TableCell>{row.fecha_fin_cartelera}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        onClick={() => handleDelete(row.id)}
                        color="error"
                      >
                        <DeleteForeverIcon fontSize="small" />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        onClick={() => navigate("/modificarpelicula/" + row.id)}
                      >
                        <EditNoteIcon fontSize="small" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>


      <Box sx={{ mx: 4, mt: 2, mb:2}}>
        <Button variant="contained" onClick={generatePDF}>
          Imprimir listado
        </Button>
      </Box>
    </>
  );
}

export default ListadoPelicula;
