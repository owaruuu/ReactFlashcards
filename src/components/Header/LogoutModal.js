import Modal from "react-bootstrap/Modal";
import { BsFillExclamationTriangleFill } from "react-icons/bs";

const LogoutModal = (props) => {
    return (
        <Modal show={props.visible} onHide={props.hideFunc}>
            <Modal.Header>
                <Modal.Title>Quieres cerrar sesion ?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    <BsFillExclamationTriangleFill
                        style={{ color: "#f5ad00", fontSize: "18px" }}
                    />{" "}
                    Si estas en medio de una prueba perderas tu avanze.
                </p>
                <button onClick={props.hideFunc}>Volver</button>
                <button
                    onClick={() => {
                        props.logoutFunc();
                        props.hideFunc();
                    }}
                >
                    Cerrar sesion
                </button>
            </Modal.Body>
        </Modal>
    );
};

export default LogoutModal;
