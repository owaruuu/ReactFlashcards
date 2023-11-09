import { createContext, useReducer } from "react";

export const AppReducer = (state, action) => {
    switch (action.type) {
        case "SET_INIT":
            return { ...state, init: action.payload };
        case "SET_COGNITO_ERROR":
            return { ...state, cognitoError: action.payload };
        case "SET_SERVER_ERROR":
            return { ...state, serverError: action.payload };
        case "SET_DB_ERROR":
            return { ...state, dbError: action.payload };
        case "SET_LOADED":
            return { ...state, loaded: action.payload };
        case "SET_LOG_STATUS":
            return { ...state, loggedIn: action.payload };
        case "SET_LOGIN_CONTROL_MSG":
            return { ...state, LoginControlErrorMessage: action.payload };
        case "SET_USER":
            return {
                ...state,
                user: { ...state.user, ...action.payload },
            };
        case "GREEN_TERM":
            //logica para cambiar un termino a 'learned'
            return null;
        case "RED_TERM":
            //logica para cambiar un termino a 'learning'
            return null;
        case "CHANGE_SCREEN":
            return {
                ...state,
                appState: {
                    ...state.appState,
                    ...action.payload,
                },
            };
        case "UPDATE_PROGRESS":
            return {
                ...state,
                user: { ...state.user, ...action.payload },
                needToSave: true,
            };
        case "SET_SAVE_FLAG":
            return { ...state, needToSave: action.payload };
        case "SET_SAVE_ERROR":
            return { ...state, saveError: action.payload };
        case "SET_SAVE_INFO_MSG":
            return { ...state, saveInfoMessage: action.payload };
        default:
            throw "wrong action type: " + action.type;
    }
};

//Crear un initial state leyendo de la base de datos o localStorage
const initialState = {
    init: false, //true despues de haber intentado conectarse a cognito
    cognitoError: false, //para fallas con el servicio de cognito
    cognito: false,
    serverError: false, //para fallas con mi server de Render.com
    loaded: false,
    loggedIn: false, //true si ya confirme que tengo tokens validos
    loginControlErrorMessage: "",
    user: {
        userName: "",
        currentProgress: null,
    },
    appState: { currentScreen: "main", currentLecture: null }, //currentLecture es el id
    needToSave: false,
    saveError: false,
    saveInfoMessage: "",
    dbError: false,
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
                serverError: state.serverError,
                loaded: state.loaded,
                loggedIn: state.loggedIn,
                LoginControlErrorMessage: state.LoginControlErrorMessage,
                user: state.user,
                appState: state.appState,
                needToSave: state.needToSave,
                saveError: state.saveError,
                saveInfoMessage: state.saveInfoMessage,
                dbError: state.dbError,
                dispatch,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};
