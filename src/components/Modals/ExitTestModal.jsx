import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import PromptModal from "./PromptModal";

const ExitTestModal = (props) => {
    // HOOKS
    const { blocker } = props;

    // FUNCTIONS
    function handleLeaveTest() {
        blocker.proceed();
        scrollTo(0, 0);
    }
    // COMPONENTS
    const proceedButton = <button onClick={handleLeaveTest}>Salir</button>;
    const cancelButton = (
        <button onClick={() => blocker.reset()}>Cancelar</button>
    );

    return (
        <PromptModal
            title="Salir de la prueba"
            message="Si sales de la prueba perderas el progreso que llevas dentro de ella.
                Estas seguro que quieres salir ?"
            proceedButton={proceedButton}
            cancelButton={cancelButton}
            visible={blocker.state === "blocked"}
            onHide={() => blocker.reset()}
        />
    );
};

export default ExitTestModal;
