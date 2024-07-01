import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import PromptModal from "./PromptModal";

const ExitTestModal = (props) => {
    // HOOKS
    const { blocker, setIsTakingTest } = props;

    // FUNCTIONS
    function handleLeaveTest() {
        setIsTakingTest(false);
        blocker.proceed();
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
