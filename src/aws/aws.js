import { defer } from "react-router-dom";
import { api, URL } from "../api/api";

//intenta revisar si estoy logeado o no
export const connectCognito = async () => {
    try {
        //intenta revisar los tokens del usuario
        //retorna el contenido del idToken si funciona
        const response = await api.get(`${URL}/cognito`);
        return response.data;
    } catch (error) {
        console.log("🚀 ~ connectCognito ~ error:", error);
        if (error.code === "ERR_NETWORK") {
            return { error: "error with app server", value: -1 };
        }
        if (error.response.status === 401) {
            return { error: "no credentials", value: 0 };
        }
    }
};

export const confirmUser = async (email, code) => {
    try {
        const response = await api.post(`${URL}/api/v2/auth/confirm`, {
            email,
            code,
        });

        return { response, error: null };
    } catch (error) {
        console.log("🚀 ~ file: aws.js:31 ~ confirmUser ~ error:", error);
        return { response: error.response, error };
    }
};

export const registerUser = async (email, password, repeatPassword) => {
    try {
        const { data } = await api.post(`${URL}/api/v2/auth/register`, {
            email,
            password,
            repeatPassword,
        });

        return { response: data };
    } catch (error) {
        console.log("🚀 ~ file: aws.js:46 ~ registerUser ~ error:", error);
        return { error, response: error.response };
    }
};

//intenta obtener tokens usando mis credenciales y las guarda en las cookies
export const authenticateUser = async (email, password) => {
    try {
        const response = await api.post(`${URL}/api/v2/auth/login`, {
            email,
            password,
        });

        return response;
    } catch (error) {
        throw error;
    }
};

//intento borrar las cookies del usuario, si el servidor no esta online le aviso al usuario
export const logoutUser = async () => {
    try {
        const response = await api.get(`${URL}/api/v2/auth/logout`);
        return response;
    } catch (error) {
        throw error;
    }
};

//gets the user progress from the db using his id
//returns the progress string or
export const getUserProgress = async () => {
    try {
        const response = await api.get(`${URL}/progress`);

        if (response.data.value === -1) {
            return null;
        }

        if (response.data.value === "") {
            return "{}";
        }

        return response.data.value;
    } catch (error) {
        console.log("🚀 ~ getUserProgress ~ error:", error);
        return null;
    }
};

export const saveUserProgress = async (currentProgress) => {
    try {
        //intento conectarme a mi servideor
        const response = await api.post(`${URL}/save`, currentProgress);

        //si el servidor esta vivo no tengo tokens
        if (response.data.value === -2) {
            return {
                msg: "error con mi refresh token, deberia relogear",
                value: -2,
            };
        }

        //si el servidor esta vivo pero la base de datos no lo esta
        if (response.data.value === -1) {
            return {
                msg: "Error trying to scan db, intentandolo mas tarde",
                value: -1,
            };
        }

        return { msg: "exito", value: response.data };
    } catch (error) {
        return {
            msg: "Error en el servidor, intentandolo mas tarde.",
            value: null,
        };
    }
};

/**
 * Intenta obtener los ids de las lecciones a las que el usuario tiene acceso
 * @returns Un array de numeros que representa los ids de las lecciones que puedo acceder
 */
export const getExtraPerms = async () => {
    const permissionsPromise = api.get(`${URL}/permissions`);
    return defer({ perms: permissionsPromise });
};

export const getExtraLessons = async (keys) => {
    try {
        const response = await api.post(`${URL}/lessons`, { keys });
        // console.log("🚀 ~ getExtraLessons ~ response:", response);
        return {
            data: response.data.Responses.lectures,
            kanjiData: response.data.Responses.kanjiSets,
        };
    } catch (error) {
        console.log("🚀 ~ getExtraLessons ~ error:", error);
        return { error };
    }
};

//Intenta obtener una lecture desde la DB
//necesito verificar que tengo el permiso ?
// export const getLesson = async (id) => {
//     try {
//         const response =
//     } catch (error) {
//         console.log("🚀 ~ getLesson ~ error:", error)
//         return error;
//     }
// }
