import { createContext, useReducer } from "react";

export const AppReducer = (state, action) => {
    switch (action.type) {
        case "SET_INIT":
            return { ...state, init: action.payload };
        case "SET_COGNITO_ERROR":
            // console.log("setting cognito error");
            return { ...state, cognitoError: action.payload };
        case "SET_LOADED":
            //logica para cambiar el estado de loaded
            return { ...state, loaded: action.payload };
        case "SET_LOG_STATUS":
            return { ...state, loggedIn: action.payload };
        case "SET_USER":
            return { ...state, user: action.payload };
        case "GREEN_TERM":
            //logica para cambiar un termino a 'learned'
            return null;
        case "RED_TERM":
            //logica para cambiar un termino a 'learning'
            return null;
        case "CHANGE_SCREEN":
            //logica para cambiar la pantalla
            return {
                ...state,
                appState: {
                    currentScreen: action.payload.newScreen,
                    currentLecture: action.payload.newLecture,
                },
            };

        default:
            throw "wrong action type: " + action.type;
    }
};

//Crear un initial state leyendo de la base de datos o localStorage
const initialState = {
    init: false, //true despues de haber intentado conectarse a cognito
    cognitoError: false,
    cognito: false,
    loaded: false,
    loggedIn: false, //true si ya confirme que tengo tokens validos
    user: {
        userName: "",
        currentProgress: null,
    },
    appState: { currentScreen: "main", currentLecture: null }, //currentLecture es el id
};

export const AppContext = createContext();

export const AppProvider = (props) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    return (
        <AppContext.Provider
            value={{
                init: state.init,
                cognitoError: state.cognitoError,
                cognito: state.cognito,
                loaded: state.loaded,
                loggedIn: state.loggedIn,
                user: state.user,
                appState: state.appState,
                dispatch,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};
