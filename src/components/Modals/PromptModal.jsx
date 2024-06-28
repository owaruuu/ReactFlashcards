import React from "react";
import Modal from "react-bootstrap/Modal";

const PromptModal = (props) => {
    const { title, message, proceedButton, cancelButton, visible, onHide } =
        props;

    return (
        <Modal show={visible} onHide={onHide}>
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{message}</p>
                {proceedButton}
                {cancelButton}
            </Modal.Body>
        </Modal>
    );
};

export default PromptModal;
