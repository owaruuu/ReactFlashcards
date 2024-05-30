import { createContext, useReducer } from "react";
import { lectures } from "../data/lectures";

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
        case "SET_LECTURES":
            return { ...state, lectures: action.payload };
        case "SET_LECTURES_FLAG":
            return { ...state, gotLectures: action.payload };
        case "SET_USER":
            return {
                ...state,
                user: { ...state.user, ...action.payload },
            };
        case "CHANGE_SCREEN":
            return {
                ...state,
                appState: {
                    ...state.appState,
                    ...action.payload,
                    lastScreen:
                        state.appState.currentScreen ===
                        action.payload.currentScreen
                            ? state.appState.lastScreen
                            : state.appState.currentScreen,
                },
            };
        case "UPDATE_PROGRESS":
            return {
                ...state,
                user: { ...state.user, ...action.payload },
                needToSave: true,
            };
        case "UPDATE_USER_DATA":
            return {
                ...state,
                userData: { ...state.userData, ...action.payload },
            };
        case "SET_SAVE_FLAG":
            return { ...state, needToSave: action.payload };
        case "SET_IS_TAKING_TEST":
            return { ...state, isTakingTest: action.payload };
        case "SET_SAVE_TEST":
            return { ...state, savedTest: action.payload };
        case "SET_SAVE_ERROR":
            return { ...state, saveError: action.payload };
        case "SET_SAVE_INFO_MSG":
            return { ...state, saveInfoMessage: action.payload };
        default:
            throw new Error("wrong action type: " + action.type);
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
    lectures: lectures,
    gotLectures: false,
    user: {
        userName: "",
        currentProgress: null,
    },
    userData: { currentData: {} },
    appState: { currentScreen: "main", currentLecture: null, lastScreen: null }, //currentLecture es el id
    needToSave: false,
    isTakingTest: false,
    savedTest: false,
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
                lectures: state.lectures,
                gotLectures: state.gotLectures,
                user: state.user,
                userData: state.userData,
                appState: state.appState,
                needToSave: state.needToSave,
                isTakingTest: state.isTakingTest,
                savedTest: state.savedTest,
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
