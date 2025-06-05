import { MDBFooter, MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";

/**
 * Componente del pie de página.
 * @returns {JSX.Element} El componente del pie de página.
 */
function Footer() {
    return (
        <MDBFooter bgColor="secondary" className="text-center text-lg-start text-dark mt-4">
            <MDBContainer className="p-4">
                <MDBRow>
                    <MDBCol lg="6" md="12" className="mb-4">
                        <h5 className="text-uppercase">BlueLight</h5>
                        <p>Explora el mundo de los cines actuales y sus grandes historias.</p>
                    </MDBCol>
                    {/*<MDBCol lg="3" md="6" className="mb-4">
                        <h5 className="text-uppercase">Enlaces</h5>
                        <ul className="list-unstyled mb-0">
                            <li><a href="/" className="text-light">Inicio</a></li>
                            <li><a href="/altasensei" className="text-light">Alta de sensei</a></li>
                            <li><a href="/listadosensei" className="text-light">Listado de sensei</a></li>
                            <li><a href="/altaAprendiz" className="text-light">Alta de aprendiz</a></li>
                            <li><a href="/listadoAprendiz" className="text-light">Listado de aprendiz</a></li>
                        </ul>
                    </MDBCol>*/}
                    <MDBCol lg="3" md="6" className="mb-4 ms-auto">
                        <h5 className="text-uppercase">Síguenos</h5>
                        <div class="socials">
                            <a href="https://www.facebook.com/" style={{display:'inline-block', minHeight:'40px', width:'40px', backgroundColor:'#00C3FF', margin:'0 15px 10px 0', textAlign:'center', lineHeight:'40px', borderRadius:'50%', color:'#FFFFFF', fontSize:'20px'}}> <i class="fa-brands fa-facebook-f"></i></a>
                            <a href="https://x.com/" style={{display:'inline-block', minHeight:'40px', width:'40px', backgroundColor:'#00C3FF', margin:'0 15px 10px 0', textAlign:'center', lineHeight:'40px', borderRadius:'50%', color:'#FFFFFF', fontSize:'20px'}}> <i class="fab fa-twitter"></i></a>
                            <a href="https://www.youtube.com/" style={{display:'inline-block', minHeight:'40px', width:'40px', backgroundColor:'#00C3FF', margin:'0 15px 10px 0', textAlign:'center', lineHeight:'40px', borderRadius:'50%', color:'#FFFFFF', fontSize:'20px'}}> <i class="fab fa-youtube"></i></a>
                            <a href="https://www.instagram.com/" style={{display:'inline-block', minHeight:'40px', width:'40px', backgroundColor:'#00C3FF', margin:'0 15px 10px 0', textAlign:'center', lineHeight:'40px', borderRadius:'50%', color:'#FFFFFF', fontSize:'20px'}}> <i class="fab fa-instagram"></i></a>
                            </div>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
                © {new Date().getFullYear()} BlueLight Cinemas - Todos los derechos reservados
            </div>
        </MDBFooter>
    );
}

export default Footer;
