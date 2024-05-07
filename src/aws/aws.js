import { api, URL } from "../api/api";

//intenta revisar si estoy logeado o no
export const connectCognito = async () => {
    try {
        const response = await api.get(`${URL}/cognito`);
        return response.data;
    } catch (error) {
        return { msg: "error with app server", value: -1 };
    }
};

export const confirmUser = async (email, code) => {
    try {
        const response = await api.post(`${URL}/confirmUser`, { email, code });

        return response;
    } catch (error) {
        //recibo los errores si el server esta caido
        throw error;
    }
};

export const registerUser = async (email, password) => {
    try {
        const response = await api.post(`${URL}/register`, {
            email,
            password,
        });

        return response;
    } catch (error) {
        return error;
    }
};

//revisa si el usuario existe en el userpool de cognito
export const aunthenticateUser = async (email, password) => {
    try {
        const response = await api.post(`${URL}/login`, {
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
        const response = await api.get(`${URL}/logout`);
        return response;
    } catch (error) {
        throw error;
    }
};

//gets the user progress from the db using his id
//returns the progress string or
export const getUserProgress = async (id) => {
    try {
        const response = await api.post(`${URL}/progress`, {
            id,
        });
        // console.log("🚀 ~ getUserProgress ~ response:", response);

        if (response.data.value === -1) {
            return null;
        }

        if (response.data.value.progress === "") {
            return "{}";
        }

        return response.data.value.progress;
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

export const getExtraPerms = async (email) => {
    try {
        const response = await api.post(`${URL}/permissions`, { email });
        // console.log("🚀 ~ getExtraPerms ~ response:", response);
        return response;
    } catch (error) {
        console.log("🚀 ~ getExtraPerms ~ error:", error);
        return error;
    }
};

export const getExtraLessons = async (keys) => {
    //esta funcion se encarga de traer las lecciones en la base de datos

    try {
        const response = await api.post(`${URL}/lessons`, { keys });

        return response;
    } catch (error) {
        return error;
    }
};
