import { Typography, Box, Card, Button, CardMedia, CardContent, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import ChairIcon from '@mui/icons-material/Chair';import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { apiUrl } from '../config';
import useUserStore from "../stores/useUserStore";
import jsPDF from "jspdf";
import QRCode from 'qrcode';




/**
 * Componente para dar de alta a un nuevo sensei.
 * @returns {JSX.Element} El componente de alta de sensei.
 */
function Entrada() {
  const params = useParams();
  const [sesion, setSesion] = useState(null);
  const [butacas, setButacas] = useState([]);
  const [seleccionadas, setSeleccionadas] = useState([]);
  const { user, isLoggedIn } = useUserStore();

  const navigate = useNavigate();

  /**
   * Maneja el envío del formulario.
   * @param {Event} e - El evento de envío del formulario.
   */
  useEffect(() => {
    if(!isLoggedIn()){
      navigate(`/login/${params.idsesion}`); // o cualquier otra ruta de tu app
      return;
    }
    async function cargarDatos() {
      const res = await fetch(apiUrl + `/sesion/entrada/${params.idsesion}`);
      const data = await res.json();
      if (data.datos.portada?.data) {
        const imagen = await bufferToDataURL(data.datos.portada.data);
        data.datos.portadaBase64= imagen;
      }
      setSesion(data.datos);

      const resButacas = await fetch(apiUrl +`/butacasOcupadas/sesion/${params.idsesion}/${data.datos.id_sala}`);
      const dataButacas = await resButacas.json();
      setButacas(dataButacas.datos); // cada butaca con { fila, numero, ocupada }
    }

    cargarDatos();
  }, [params.idusuario, navigate]);
  

  const handleSubmit = async (e) => {
    // No hacemos submit
    e.preventDefault();
    const datosenviar={id_usuario:user.id, id_sesion:params.idsesion, cantidad:seleccionadas.length}
    const datosenviarbutacas={id_sesion:params.idsesion, butacas:seleccionadas}

    // Enviamos los datos mediante fetch
    try {
      const responsebutacas = await fetch(apiUrl + "/butacasOcupadas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosenviarbutacas),
      });

      if(responsebutacas.ok){
      const response = await fetch(apiUrl + "/entrada", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosenviar),
      });

      if (response.ok) {
        const respuesta = await response.json();
        alert(respuesta.mensaje);
        if (respuesta.ok) {
          generarPDFEntrada();
          navigate(-1); // Volver a la página principal
        }
      }
    }
    } catch (error) {
      console.error("Error:", error);
      alert("Error:", error);
    }
  };

const generarPDFEntrada = async () => {
  const doc = new jsPDF();

  // Generar contenido del QR (puede ser un resumen de la entrada o un ID de reserva)
  const contenidoQR = `Película: ${sesion.titulo}\nFecha: ${sesion.dia} ${sesion.hora}\nSala: ${sesion.sala}\nUsuario: ${params.idusuario}\nButacas: ${seleccionadas.map(b => `${b.fila}${b.numero}`).join(', ')}`;

  const qrBase64 = await QRCode.toDataURL(contenidoQR);

  // Imagen de portada
  if (sesion.portadaBase64) {
    doc.addImage(sesion.portadaBase64, 'JPEG', 15, 15, 40, 60);
  }

  doc.setFontSize(16);
  doc.text("Entrada de Cine", 65, 25);

  doc.setFontSize(12);
  doc.text(`Película: ${sesion.titulo}`, 65, 40);
  doc.text(`Fecha: ${sesion.dia}`, 65, 50);
  doc.text(`Hora: ${sesion.hora}`, 65, 60);
  doc.text(`Sala: ${sesion.sala}`, 65, 70);
  doc.text(`Usuario: ${user.nombre}`, 65, 80);

  seleccionadas.forEach((b, idx) => {
    doc.text(`Butaca ${b.numero}: Fila ${b.fila}`, 20, 90 + idx * 10);
  });

  const total = (seleccionadas.length * sesion.precioentrada).toFixed(2);
  doc.text(`Total pagado: ${total} €`, 20, 100 + seleccionadas.length * 10);

  // Añadir QR al final
  doc.addImage(qrBase64, 'PNG', 140, 30, 50, 50);

  doc.save(`entrada-${sesion.titulo}.pdf`);
};

  /**
   * Maneja los cambios en los campos del formulario.
   * @param {Event} e - El evento de cambio del campo.
   */

    const toggleButaca = (butaca) => {
        if (butaca.ocupada) return;
        const key = `${butaca.fila}-${butaca.numero}`;
        setSeleccionadas((prev) =>
        prev.find(b => b.fila === butaca.fila && b.numero === butaca.numero)
            ? prev.filter(b => `${b.fila}-${b.numero}` !== key)
            : [...prev, butaca]
        );
    };

  if (!sesion) return <Typography>Cargando...</Typography>;
  // Agrupar por fila y detectar columnas
const butacasPorFila = {};
const columnas = new Set();

butacas.forEach((b) => {
  if (!butacasPorFila[b.fila]) butacasPorFila[b.fila] = {};
  butacasPorFila[b.fila][b.numero] = b;
  columnas.add(b.numero);
});

const columnasOrdenadas = [...columnas].sort((a, b) => a - b);
const filasOrdenadas = Object.keys(butacasPorFila).sort();

return (
    <Box maxWidth="md" mx="auto" mt={4} mb={2} px={2}>
      <Card sx={{ display: "flex", mb: 4 }}>
        <CardMedia
          component="img"
          image={sesion.portadaBase64}
          alt={sesion.titulo}
          sx={{ width: 160 }}
        />
        <CardContent>
          <Typography variant="h5">{sesion.titulo}</Typography>
          <Typography>Fecha: {sesion.dia}</Typography>
          <Typography>Sesion: {sesion.hora}</Typography>
          <Typography>Sala: {sesion.sala}</Typography>
          <Typography>Cine: {sesion.cine}</Typography>
          <Typography>Ubicacion: {sesion.ubicacion}</Typography>
          <Typography>Precio: {sesion.precioentrada}€</Typography>
        </CardContent>
      </Card>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6">Selecciona tus butacas</Typography>
        <Table size="small">
        <TableHead>
            <TableRow>
            <TableCell></TableCell>
            {columnasOrdenadas.map((col) => (
                <TableCell key={col} align="center">
                <Typography fontWeight="bold">{col}</Typography>
                </TableCell>
            ))}
            </TableRow>
        </TableHead>
        <TableBody>
            {filasOrdenadas.map((fila) => (
            <TableRow key={fila}>
                <TableCell>
                <Typography fontWeight="bold">{fila}</Typography>
                </TableCell>
                {columnasOrdenadas.map((col) => {
                const butaca = butacasPorFila[fila][col];
                const seleccionada = seleccionadas.find((b) => b.id === butaca?.id);

                return (
                    <TableCell key={col} align="center">
                    {butaca ? (
                        <ChairIcon
                        onClick={() => !butaca.ocupada && toggleButaca(butaca)}
                        sx={{
                            cursor: butaca.ocupada ? 'not-allowed' : 'pointer',
                            color: butaca.ocupada
                            ? 'gray'
                            : seleccionada
                            ? 'green'
                            : '#1976d2',
                        }}
                        />
                    ) : null}
                    </TableCell>
                );
                })}
            </TableRow>
            ))}
        </TableBody>
        </Table>
<Box mt={3}>
        <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
            Leyenda:
        </Typography>
        <Box display="flex" gap={4} alignItems="center">
            <Box display="flex" alignItems="center" gap={1}>
            <ChairIcon sx={{ color: '#1976d2' }} />
            <Typography variant="body2">Disponible</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
            <ChairIcon sx={{ color: 'green' }} />
            <Typography variant="body2">Seleccionada</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
            <ChairIcon sx={{ color: 'gray' }} />
            <Typography variant="body2">Ocupada</Typography>
            </Box>
        </Box>
        </Box>
      </Paper>

      <Typography>
        Butacas seleccionadas: {seleccionadas.map(b => `${b.fila}${b.numero}`).join(", ")}
      </Typography>

        <Box mt={2}>
        <Typography variant="h6">
            🎟 Entradas: {seleccionadas.length} — Total: {(seleccionadas.length * sesion.precioentrada).toFixed(2)} €
        </Typography>
        </Box>

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        disabled={seleccionadas.length === 0}
        onClick={ handleSubmit
      /*    {
          // Enviar a backend la reserva
          console.log("Reservando butacas:", seleccionadas);
          // fetch POST ...
        }*/
      }
      >
        Confirmar reserva
      </Button>
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
export default Entrada;
