import axios from "axios";

const RenderURL = "https://react-flashcards-server.onrender.com";

const URL = RenderURL || "http://localhost:3003";

console.log("🚀 ~ file: aws.js:4 ~ URL:", URL);

const api = axios.create({
    withCredentials: true, // Include credentials (cookies) in the request
});

//intenta revisar si estoy logeado o no
export const connectCognito = async () => {
    try {
        const response = await api.get(`${URL}/cognito`);

        if (response.data.value === -2) {
            return { msg: "error with cognito server", value: -2 };
        }
        return response.data;
    } catch (error) {
        // console.log("error with app server: ", error);
        return { msg: "error with app server", value: -1 };
    }
};

//revisa si el usuario existe en el userpool de cognito
export const aunthenticateUser = async (email, password) => {
    try {
        const response = await api.post(`${URL}/login`, {
            email,
            password,
        });
        console.log(
            "🚀 ~ file: aws.js:26 ~ aunthenticateUser ~ response:",
            response
        );

        return response;
    } catch (error) {
        console.log("🚀 ~ file: aws.js:29 ~ aunthenticateUser ~ error:", error);

        //errores pueden incluir que el server este caido o algun error en las credenciales

        throw error;
    }
};

//gets the user progress from the db using his id
//returns the progress string or
export const getUserProgress = async (id) => {
    console.log("🚀 ~ file: aws.js:42 ~ getUserProgress ~ id:", id);
    try {
        const response = await api.post(`${URL}/progress`, {
            id,
        });
        console.log(
            "🚀 ~ file: aws.js:47 ~ getUserProgress ~ response:",
            response
        );

        if (response.data.value === -1) {
            console.log("error trying to scan db");
            return null;
        }

        return response.data.value.progress;
    } catch (error) {
        console.log("🚀 ~ file: aws.js:51 ~ getUserProgress ~ error:", error);
        return null;
    }
};

export const saveUserProgress = async (currentProgress) => {
    try {
        //intento conectarme a mi servideor
        const response = await api.post(`${URL}/save`, currentProgress);
        console.log(
            "🚀 ~ file: aws.js:47 ~ getUserProgress ~ response:",
            response
        );

        //si el servidor esta vivo no tengo tokens
        if (response.data.value === -2) {
            console.log("error con mis tokens");
            return {
                msg: "error con mi refresh token, deberia relogear",
                value: -2,
            };
        }

        //si el servidor esta vivo pero la base de datos no lo esta
        if (response.data.value === -1) {
            console.log("error trying to scan db");
            return {
                msg: "Error trying to scan db, intentandolo mas tarde",
                value: -1,
            };
        }

        return { msg: "exito", value: response.data };
    } catch (error) {
        //si el servidor tiene un problema, necesito mandar una mensaje explicativo
        //y resetiar el save flag
        console.log("🚀 ~ file: aws.js:80 ~ saveUserProgress ~ error:", error);
        return {
            msg: "Error en el servidor, intentandolo mas tarde.",
            value: null,
        };
    }
};

export const quickScan = async () => {
    try {
        const response = await api.get(`${URL}/scanTables`);
        console.log("🚀 ~ file: aws.js:61 ~ quickScan ~ response:", response);
    } catch (error) {
        console.log("🚀 ~ file: aws.js:64 ~ quickScan ~ error:", error);

        return error;
    }
};
