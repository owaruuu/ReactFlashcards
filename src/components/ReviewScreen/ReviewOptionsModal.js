import React from "react";
import Modal from "react-bootstrap/Modal";

const ReviewOptionsModal = (props) => {
    return (
        <Modal show={props.visible} onHide={props.hideFunc}>
            <Modal.Header closeButton>
                <Modal.Title>Opciones</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>asdasdasdasdasdasd</p>
            </Modal.Body>
        </Modal>
    );
};

export default ReviewOptionsModal;
