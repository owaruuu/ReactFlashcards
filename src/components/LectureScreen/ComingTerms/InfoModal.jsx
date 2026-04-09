import React from "react";
import { Modal } from "react-bootstrap";

const InfoModal = ({ visible, hideFunc, showFunc }) => {
    return (
        <Modal show={visible} onHide={hideFunc}>
            <Modal.Body>
                <p>
                    Cada palabra tiene un nivel que va creciendo cuando
                    respondes con el{" "}
                    <span className="greenButton">boton verde</span> . A medida
                    que incrementas el nivel, el tiempo de espera incrementa,
                    desde 24 horas hasta 15 dias. Esto con la finalidad de{" "}
                    <span className="italic">'espaciar'</span> la{" "}
                    <span className="italic">'repeticion'</span> 😄 asi los
                    terminos que mas te cuesten se mantendran con intervalos
                    cortos y los que ya sabes iran apareciendo cada vez mas
                    lejos.
                </p>
                <button onClick={hideFunc}>Volver</button>
            </Modal.Body>
        </Modal>
    );
};

export default InfoModal;
