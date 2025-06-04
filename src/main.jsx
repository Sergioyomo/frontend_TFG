import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProviderWrapper } from "./ThemeProvider";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./css/global.css";

import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";

import Login from "./components/Login";
import SignUp from "./components/Signup";

import ListadoCine from "./components/ListadoCine";
import ModificarCine from "./components/ModificarCine";
import AltaCine from "./components/AltaCine";
import AltaPelicula from "./components/AltaPelicula";
import ListadoPelicula from "./components/ListadoPelicula";
import ModificarPelicula from "./components/ModificarPelicula";
import Cines from "./components/Cines";
import ProximosEstrenos from "./components/ProximosEstrenos";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./components/Unauthorized";
import AltaUsuario from "./components/AltaUsuario";
import ListadoUsuario from "./components/ListadoUsuario";
import ModificarUsuario from "./components/ModificarUsuario";
import CinePeliculas from "./components/CinePeliculas";
import ListadoSala from "./components/ListadoSala";
import AltaSala from "./components/AltaSala";
import ModificarSala from "./components/ModificarSala";
import AltaPeliculaSala from "./components/AltaPeliculaSala";
import ListadoPeliculaSala from "./components/ListadoPeliculaSala";
import ModificarPeliculaSala from "./components/ModificarPeliculaSala";
import Pelicula from "./components/Pelicula";
import ListadoSesion from "./components/ListadoSesion";
import AltaSesion from "./components/AltaSesion";
import ModificarSesion from "./components/ModificarSesion";
import ModificarButacas from "./components/ModificarButacas";
import Entrada from "./components/Entrada";

import PaginaError from "./pages/PaginaError";

/**
 * Configuración de las rutas de la aplicación.
 * Define las rutas principales y sus componentes correspondientes.
 */
let router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <PaginaError />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "login/:idsesion",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },  
      {
        path: "cines",
        element: <Cines />,
      },
      {
        path: "proximosestrenos",
        element: <ProximosEstrenos />,
      },
      {
        path: "cinepeliculas/:idCine",
        element: <CinePeliculas />,
      },
      {
        path: "unauthorized",
        element: <Unauthorized />,
      },
      {
        path: "pelicula/:idsala/:idpelicula",
        element: <Pelicula />,
      },
      {
        path: "entrada/:idsesion",
        element: <Entrada />,
      },
      {
        element: <ProtectedRoute allowedRoles={["A","AP"]} />,
        children: [
          {
            path: "listadocine",
            element: <ListadoCine />,
          },
          {
            path: "altacine",
            element: <AltaCine />,
          },
          {
            path: "modificarcine/:idCine",
            element: <ModificarCine />,
          },
          {
          path: "altapelicula",
          element: <AltaPelicula />,
          },
          {
            path: "listadopelicula",
            element: <ListadoPelicula />,
          },
          {
            path: "modificarPelicula/:idPelicula",
            element: <ModificarPelicula />,
          },
          {
            path: "listadosala",
            element: <ListadoSala />,
          },
          {
            path: "altasala",
            element: <AltaSala />,
          },
          {
            path: "modificarsala/:idSala",
            element: <ModificarSala />,
          },
          {
            path: "modificarbutacas/:idSala",
            element: <ModificarButacas />,
          },
          {
            path: "altapeliculasala",
            element: <AltaPeliculaSala />,
          },
          {
            path: "listadopeliculasala",
            element: <ListadoPeliculaSala />,
          },
          {
            path: "modificarpeliculasala/:idpeliculasala",
            element: <ModificarPeliculaSala />,
          },
          {
            path: "listadosesion",
            element: <ListadoSesion />,
          },
          {
            path: "altasesion",
            element: <AltaSesion />,
          },
          {
            path: "modificarsesion/:idsesion",
            element: <ModificarSesion />,
          },
      ],
      },
      {
        element: <ProtectedRoute allowedRoles={["AP"]} />,
        children: [
          {
            path: "listadousuario",
            element: <ListadoUsuario />,
          },
          {
            path: "altausuario",
            element: <AltaUsuario />,
          },
          {
            path: "modificarUsuario/:idUsuario",
            element: <ModificarUsuario />,
          },
      ],
      },
    ],
  },
]);

/**
 * Renderiza la aplicación en el elemento con id "root".
 */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProviderWrapper>
      <RouterProvider router={router} />
    </ThemeProviderWrapper>
  </StrictMode>
);
