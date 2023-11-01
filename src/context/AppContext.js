import { createContext, useReducer } from "react";

export const AppReducer = (state, action) => {
    switch (action.type) {
        case "GREEN_TERM":
            //logica para cambiar un termino a 'learned'
            return null;
        case "RED_TERM":
            //logica para cambiar un termino a 'learning'
            return null;
        case "CHANGE_SCREEN":
            //logica para cambiar la pantalla
            return (state = {
                ...state,
                appState: {
                    currentScreen: action.payload.newScreen,
                    currentLecture: action.payload.newLecture,
                },
            });
        case "SET_LOADED":
            //logica para cambiar el estado de loaded
            return (state = { ...state, loaded: action.payload });
        default:
            throw "wrong action type: " + action.type;
    }
};

//Crear un initial state leyendo de la base de datos o localStorage
const initialState = {
    loaded: false,
    appState: { currentScreen: "main", currentLecture: null },
};

export const AppContext = createContext();

export const AppProvider = (props) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    return (
        <AppContext.Provider
            value={{
                loaded: state.loaded,
                appState: state.appState,
                dispatch,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};
