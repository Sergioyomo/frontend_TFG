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
import ChairIcon from '@mui/icons-material/Chair';
/**
 * Componente para listar los senseis.
 * @returns {JSX.Element} El componente de listado de senseis.
 */
function ListadoSala() {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    /**
     * Obtiene la lista de sala.
     */
    async function getSala() {
      let response = await fetch(apiUrl + "/sala");

      if (response.ok) {
        let data = await response.json();
        setRows(data.datos);
      }
    }

    getSala();
  }, []); // Se ejecuta solo en el primer renderizado

  /**
   * Maneja la eliminación de un sala.
   * @param {number} idSala - El ID del sala a eliminar.
   */
  const handleDelete = async (idSala) => {
    let response = await fetch(apiUrl + "/sala/" + idSala, {
      method: "DELETE",
    });
      console.log(response);
    if (response.ok) {
      // Utilizando filter creo un array sin el plato borrado
      const salaTrasBorrado = rows.filter(
        (sala) => sala.id != idSala
      );
      // Establece los datos de nuevo para provocar un renderizado
      setRows(salaTrasBorrado);
    }
  };

  return (
    <>
      <Box id="pdf-content">
        <Typography variant="h4" align="center" sx={{ mt: 2 }}>
          Listado de sala
        </Typography>

        <Box sx={{ mx: 4 }}>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">ID</TableCell>
                  <TableCell>ID_CINE</TableCell>
                  <TableCell>NOMBRE</TableCell>
                  <TableCell>ELIMINAR</TableCell>
                  <TableCell>EDITAR</TableCell>
                  <TableCell>Butacas</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="right">{row.id}</TableCell>
                    <TableCell>{row.id_cine}</TableCell>
                    <TableCell>{row.nombre}</TableCell>
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
                        onClick={() => navigate("/modificarsala/" + row.id)}
                      >
                        <EditNoteIcon fontSize="small" />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        onClick={() => navigate("/modificarButacas/" + row.id)}
                      >
                        <ChairIcon fontSize="small" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      <Box sx={{ mx: 4, mt: 2, mb:2 }}>
        <Button variant="contained" onClick={generatePDF}>
          Imprimir listado
        </Button>
      </Box>
     
    </>
  );
}

export default ListadoSala;
