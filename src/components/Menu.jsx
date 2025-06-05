import { useContext, useState } from "react";
import { ThemeContext } from "../ThemeProvider";
import { apiUrl } from "../config";
import { useNavigate } from "react-router";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
  MDBBtn,
  MDBNavbarLink,
} from "mdb-react-ui-kit";
import useUserStore from "../stores/useUserStore";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";

/**
 * Componente del menú de navegación.
 * @returns {JSX.Element} El componente del menú.
 */
function Menu() {
  const [openBasic, setOpenBasic] = useState(false);
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const { user, clearUser, isAdmin, isUser, isLoggedIn, isAdminP } = useUserStore();
  const navigate = useNavigate();
/**
   * Maneja el cierre de sesión del usuario.
   */
const logout = async () => {
  try {
    const response = await fetch(apiUrl + "/usuario/logout", {
      method: "POST",
     // credentials: "include", // Necesario para enviar cookies
    });

    if (response.ok) {
      const data = await response.json();
      // Limpiar el estado global de autenticación (si usas Zustand, Context, etc.)
      clearUser();
      // Redireccionar al usuario
      navigate("/");
    }
  } catch (error) {
    console.error("Error en logout", error);
  }
};
  return (
    <MDBNavbar expand="lg" light={!darkMode} dark={darkMode} bgColor={darkMode ? "dark" : "light"}>
      {/* Contenedor que separa el contenido en dos secciones */}
      <MDBContainer fluid className="d-flex justify-content-between align-items-center">
        {/* Sección izquierda: Logo y menú */}
        <div className="d-flex align-items-center">
          <MDBNavbarBrand href="/">
            <img src={logo} height="40" alt="logo" loading="lazy" />
            <h3>
            <span style={{ color: 'blue' }}>Blue</span>
            <span style={{ color: 'gray' }}>Light</span>
            </h3>

          </MDBNavbarBrand>

          {/* Botón de menú en móviles */}
          <MDBNavbarToggler
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setOpenBasic(!openBasic)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>

          {/* Menú de navegación */}
          <MDBCollapse navbar open={openBasic}>
            <MDBNavbarNav className="mb-2 mb-lg-0">
            {(isAdmin() || isAdminP())?(
              <>
                 <MDBDropdown>
                  <MDBDropdownToggle tag="a" className="nav-link" role="button">
                    Admin
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBNavbarItem>
                <MDBDropdown dropright>
                  <MDBDropdownToggle tag="a" className="nav-link" role="button">
                    Cine
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <Link to="/altacine" style={{ color: darkMode ? "#fff" : "#4f4f4f" }}>
                      <MDBDropdownItem link>Alta de cine</MDBDropdownItem>
                    </Link>
                    <Link to="/listadocine" style={{ color: darkMode ? "#fff" : "#4f4f4f" }}>
                      <MDBDropdownItem link>Listado de cine</MDBDropdownItem>
                    </Link>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBDropdown dropright>
                  <MDBDropdownToggle tag="a" className="nav-link" role="button">
                    Película
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <Link to="/altapelicula" style={{ color: darkMode ? "#fff" : "#4f4f4f" }}>
                      <MDBDropdownItem link>Alta de Película</MDBDropdownItem>
                    </Link>
                    <Link to="/listadopelicula" style={{ color: darkMode ? "#fff" : "#4f4f4f" }}>
                      <MDBDropdownItem link>Listado de Película</MDBDropdownItem>
                    </Link>
                  </MDBDropdownMenu>
                </MDBDropdown>
                <MDBDropdown dropright>
                  <MDBDropdownToggle tag="a" className="nav-link" role="button">
                    Sala
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <Link to="/altasala" style={{ color: darkMode ? "#fff" : "#4f4f4f" }}>
                      <MDBDropdownItem link>Alta de sala</MDBDropdownItem>
                    </Link>
                    <Link to="/listadosala" style={{ color: darkMode ? "#fff" : "#4f4f4f" }}>
                      <MDBDropdownItem link>Listado de sala</MDBDropdownItem>
                    </Link>
                  </MDBDropdownMenu>
                </MDBDropdown>
                <MDBDropdown dropright>
                  <MDBDropdownToggle tag="a" className="nav-link" role="button">
                    Película-Sala
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <Link to="/altapeliculasala" style={{ color: darkMode ? "#fff" : "#4f4f4f" }}>
                      <MDBDropdownItem link>Alta de película-sala</MDBDropdownItem>
                    </Link>
                    <Link to="/listadopeliculasala" style={{ color: darkMode ? "#fff" : "#4f4f4f" }}>
                      <MDBDropdownItem link>Listado de película-sala</MDBDropdownItem>
                    </Link>
                  </MDBDropdownMenu>
                </MDBDropdown>
                <MDBDropdown dropright>
                  <MDBDropdownToggle tag="a" className="nav-link" role="button">
                    Sesiones
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <Link to="/altasesion" style={{ color: darkMode ? "#fff" : "#4f4f4f" }}>
                      <MDBDropdownItem link>Alta de sesión</MDBDropdownItem>
                    </Link>
                    <Link to="/listadosesion" style={{ color: darkMode ? "#fff" : "#4f4f4f" }}>
                      <MDBDropdownItem link>Listado de sesiones</MDBDropdownItem>
                    </Link>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>
              </MDBDropdownMenu>
              </MDBDropdown>
              </>
              ):null}
              {(isAdminP())?(
              <>
              <MDBNavbarItem>
                <MDBDropdown>
                  <MDBDropdownToggle tag="a" className="nav-link" role="button">
                    Usuario
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <Link to="/altausuario" style={{ color: darkMode ? "#fff" : "#4f4f4f" }}>
                      <MDBDropdownItem link>Alta de usuario</MDBDropdownItem>
                    </Link>
                    <Link to="/listadousuario" style={{ color: darkMode ? "#fff" : "#4f4f4f" }}>
                      <MDBDropdownItem link>Listado de usuario</MDBDropdownItem>
                    </Link>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>
              </>
              ):null}
              <MDBNavbarItem>
              <Link to="/cines" style={{ color: darkMode ? "#fff" : "#4f4f4f" }}>
              <MDBNavbarLink link>Cines</MDBNavbarLink>
              </Link>
              </MDBNavbarItem>
              <MDBNavbarItem>
              <Link to="/proximosestrenos" style={{ color: darkMode ? "#fff" : "#4f4f4f" }}>
              <MDBNavbarLink link>Próximos estrenos</MDBNavbarLink>
              </Link>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </div>

        {/* Sección derecha: Botón de cambio de tema */}
        {/* Sección derecha: Botón de cambio de tema y botón de iniciar sesión */}
<div className="d-flex align-items-center gap-2">
      <MDBBtn outline color={darkMode ? "light" : "dark"} onClick={() => setDarkMode(!darkMode)}>
        <MDBIcon icon={darkMode ? "sun" : "moon"} fas />
        </MDBBtn>
  
  {!isLoggedIn() ? (
                <>
                  <Link to="/login">
                    <MDBBtn style={{ backgroundColor: "#007bff", color: "#fff" }}>Iniciar sesión</MDBBtn>
                  </Link>
                </>
              ) : (
                <>
                  <span className="mx-2">Hola, {user.nombre}</span>
                  <MDBBtn size="sm" color="danger" onClick={logout}>
                    Logout
                  </MDBBtn> 
                </>
              )
              }
</div>   
      </MDBContainer>
    </MDBNavbar>
  );
}

export default Menu;
