import React, { useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useBlocker } from "react-router-dom";

const TryTestView = () => {
    const { savedTest, dispatch } = useContext(AppContext);

    //HOOKS
    //Bloquea la navegacion usando React Router
    let blocker = useBlocker(
        ({ currentLocation, nextLocation }) =>
            !savedTest && currentLocation.pathname !== nextLocation.pathname
    );

    //EFFECTS
    //prevenimos recargar la pagina o navegar usando la barra
    useEffect(() => {
        const handleBeforeUnload = (event) => {
            // Perform actions before the component unloads
            if (!savedTest) {
                event.preventDefault(); //esto previene salir/recargar la pagina
                event.returnValue = ""; //esto es necesario al parecer
            } else {
                //console.log("no preveni nada porque ya salve");
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    //FUNCTIONS
    function handleLeaveTest() {
        dispatch({ type: "SET_IS_TAKING_TEST", payload: false });
        blocker.proceed();
    }

    return (
        <div>
            TryTestView
            {blocker.state === "blocked" ? (
                <div>
                    <p>Are you sure you want to leave?</p>
                    <button onClick={handleLeaveTest}>Proceed</button>
                    <button onClick={() => blocker.reset()}>Cancel</button>
                </div>
            ) : null}
        </div>
    );
};

export default TryTestView;
