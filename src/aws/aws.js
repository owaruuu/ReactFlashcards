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
