import React from "react";
import Modal from "react-bootstrap/Modal";

const PromptModal = (props) => {
    const { title, message, proceedButton, cancelButton, visible, onHide } =
        props;
    console.log("🚀 ~ PromptModal ~ onHide:", onHide);

    return (
        <Modal show={visible} onHide={onHide}>
            <Modal.Header>
                <Modal.Title>
                    {title}
                    {/* {props.buttonClicked === "userPanel"
                        ? "Quieres ver tu perfil ?"
                        : "Quieres cerrar sesion ?"} */}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{message}</p>
                {/* <p>
                    <BsFillExclamationTriangleFill
                        style={{ color: "#f5ad00", fontSize: "18px" }}
                    />{" "}
                    Si estas en medio de una prueba perderas tu avanze.
                </p> */}
                {proceedButton}
                {cancelButton}

                {/* <button onClick={props.hideFunc}>Volver</button>
                <button
                    onClick={() => {
                        if (props.buttonClicked === "userPanel") {
                            props.userPanelFunc();
                        } else {
                            props.logoutFunc();
                        }
                        props.hideFunc();
                    }}
                >
                    {props.buttonClicked === "userPanel"
                        ? "Cancelar prueba"
                        : "Cerrar sesion"}
                </button> */}
            </Modal.Body>
        </Modal>
    );
};

export default PromptModal;
