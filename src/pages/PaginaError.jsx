import Menu from "../components/Menu";
import { Box, Button, Typography } from "@mui/material";

/**
 * Componente de página de error.
 * Muestra un mensaje de error cuando la página no se encuentra.
 *
 * @component
 * @example
 * return (
 *   <PaginaError />
 * )
 */
function PaginaError() {
  return (
    <>
      <Menu />
      {/* Mensaje de error */}
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        No hemos encontrado la página que buscas
      </Typography>
      {/* Botón para volver a la página principal */}
      <Box textAlign={"center"} sx={{ mt: 2 }}>
        <Button variant="contained" align="center" href="/" sx={{ mt: 2 }}>
          Ir a la página princial
        </Button>
      </Box>
    </>
  );
}

export default PaginaError;
