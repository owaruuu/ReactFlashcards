import { useState } from "react";
import Modal from "react-bootstrap/Modal";

const OptionsModal = (props) => {
    return (
        <Modal show={props.visible} onHide={props.hideFunc}>
            <Modal.Header closeButton>
                <Modal.Title>Options</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div class="form-check form-switch">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flipTermsSwitch"
                        checked={props.flip}
                        onChange={props.handleFlip}
                    />
                    <label class="form-check-label" for="flipTermsSwitch">
                        Switch Terms and Answers
                    </label>
                    <p class="form-check-p">
                        Use this option to see if you can recall the term from
                        the other side.
                    </p>
                </div>
                <div class="form-check form-switch">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="randomSwitch"
                        checked={props.random}
                        onChange={props.handleRandom}
                    />
                    <label class="form-check-label" for="randomSwitch">
                        Random order
                    </label>
                    <p class="form-check-p">
                        Sort the cards randomly for better a study experience.
                    </p>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default OptionsModal;
