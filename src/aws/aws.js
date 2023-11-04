import axios from "axios";

const api = axios.create({
    withCredentials: true, // Include credentials (cookies) in the request
});

//intenta revisar si estoy logeado o no
export const connectCognito = async () => {
    try {
        const response = await api.get("http://localhost:3003/cognito");

        return response.data;
    } catch (error) {
        // console.log("error with app server: ", error);
        return { msg: "error with app server", value: -1 };
    }
};

//revisa si el usuario existe en el userpool de cognito
export const aunthenticateUser = async (email, password) => {
    try {
        const response = await api.post("http://localhost:3003/login", {
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
        const response = await api.post("http://localhost:3003/progress", {
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

export const quickScan = async () => {
    try {
        const response = await api.get("http://localhost:3003/scanTables");
        console.log("🚀 ~ file: aws.js:61 ~ quickScan ~ response:", response);
    } catch (error) {
        console.log("🚀 ~ file: aws.js:64 ~ quickScan ~ error:", error);

        return error;
    }
};
