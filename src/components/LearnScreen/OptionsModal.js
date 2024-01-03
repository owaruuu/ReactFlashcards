import Modal from "react-bootstrap/Modal";

const OptionsModal = (props) => {
    return (
        <Modal show={props.visible} onHide={props.hideFunc}>
            <Modal.Header closeButton>
                <Modal.Title>Opciones</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-check form-switch">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flipTermsSwitch"
                        checked={props.flip}
                        onChange={props.handleFlip}
                    />
                    <label
                        className="form-check-label"
                        forhtml="flipTermsSwitch"
                    >
                        Switch Terms and Answers
                    </label>
                    <p className="form-check-p">
                        Use this option to see if you can recall the term from
                        the other side.
                    </p>
                </div>
                <div className="form-check form-switch">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="randomSwitch"
                        checked={props.random}
                        onChange={props.handleRandom}
                    />
                    <label className="form-check-label" forhtml="randomSwitch">
                        Random order
                    </label>
                    <p className="form-check-p">
                        Sort the cards randomly for better a study experience.
                    </p>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default OptionsModal;
