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
        console.log("error with app server: ", error);
        return { msg: "error with app server", value: -1 };
    }
};
