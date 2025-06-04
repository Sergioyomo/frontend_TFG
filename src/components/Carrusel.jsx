import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";
import carrusel1 from "../assets/images/carrusel1.jpg";
import carrusel2 from "../assets/images/carrusel2.jpg";
import carrusel3 from "../assets/images/carrusel3.jpg";

/**
 * Componente de carrusel de imágenes.
 * @returns {JSX.Element} El componente de carrusel.
 */
function Carrusel() {
    return (
        <MDBCarousel showIndicators showControls fade>
            <MDBCarouselItem itemId={1}>
                <img src={carrusel1} className="d-block w-100" style={{ height: '450px', objectFit: 'cover' }} alt="carrusel1" />
            </MDBCarouselItem>
            <MDBCarouselItem itemId={2}>
                <img src={carrusel2} className="d-block w-100" style={{ height: '450px', objectFit: 'cover' }} alt="carrusel2" />
            </MDBCarouselItem>
            <MDBCarouselItem itemId={3}>
                <img src={carrusel3} className="d-block w-100" style={{ height: '450px', objectFit: 'cover' }} alt="carrusel3" />
            </MDBCarouselItem>
        </MDBCarousel>
    );
}

export default Carrusel;
