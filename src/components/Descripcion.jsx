import { MDBContainer } from "mdb-react-ui-kit";

/**
 * Componente de descripción de la comunidad de artes marciales.
 * @returns {JSX.Element} El componente de descripción.
 */
function Descripcion() {
    return (
        <MDBContainer className="text-center my-4">
            <h2>Bienvenido a BlueLight Cinemas la aplicación que recopila los mejores cines y carteleras<br/><span style={{ color: 'blue' }}>para ti</span> </h2>
            <p>Descubre todo lo nuevo de cada cartelera y busca los mejores precios para tus entradas.</p>
            <p>Y recuerda que, para nosotros, la satisfaccion de los clientes es nuestra máxima prioridad.</p>
        </MDBContainer>
    );
}

export default Descripcion;