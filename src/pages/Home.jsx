import { Outlet, useLocation } from "react-router";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import Carrusel from "../components/Carrusel";
import Descripcion from "../components/Descripcion";
import GraficaPeliculaTaquillera from "../components/GraficaPeliculaTaquillera";

/**
 * Componente de la página principal.
 * Muestra el menú, el contenido principal y el pie de página.
 * Si la ruta es "/", muestra el carrusel y la descripción.
 *
 * @component
 * @example
 * return (
 *   <Home />
 * )
 */
function Home() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="main-content">
      <Menu />
      <div className="content">
        {isHome ? (
          <>
            <Carrusel />
            <Descripcion />
            <GraficaPeliculaTaquillera />
          </>
        ) : (
          <Outlet />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Home;