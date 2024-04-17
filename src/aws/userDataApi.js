//will connect to the userData table in aws
import { api, URL } from "../api/api";

//funcion para modificar las opciones de las terminos en una lecture
export async function putUserData(userId, lectureId, options) {
    try {
        const response = await api.post(`${URL}/user-data`, {
            userId,
            lectureId,
            options,
        });
        console.log("🚀 ~ putUserData ~ response:", response);

        return response;
    } catch (error) {
        console.log("🚀 ~ putUserData ~ error:", error);
        return error;
    }
}

export async function getUserData() {
    try {
        const response = await api.get(`${URL}/user-data`);
        console.log("🚀 ~ getUserData ~ response:", response);

        return response;
    } catch (error) {
        console.log("🚀 ~ getUserData ~ error:", error);
        return error;
    }
}

export async function getLectureData(lectureId) {
    try {
        const response = await api.get(`${URL}/user-data/${lectureId}`);
        console.log("🚀 ~ getUserData ~ response:", response);

        return response;
    } catch (error) {
        console.log("🚀 ~ getUserData ~ error:", error);
        return error;
    }
}
