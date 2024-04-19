//will connect to the userData table in aws
import { api, URL } from "../api/api";

//funcion para modificar las opciones de las terminos en una lecture
export async function postLectureData({ lectureId, attributeName, newValue }) {
    try {
        const response = await api.post(`${URL}/user-data`, {
            lectureId,
            attributeName,
            newValue,
        });
        console.log("🚀 ~ postLectureData ~ response:", response);

        return response;
    } catch (error) {
        console.log("🚀 ~ postLectureData ~ error:", error);
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
        console.log("🚀 ~ getLectureData ~ response:", response);

        return { data: response.data.Item };
    } catch (error) {
        console.log("🚀 ~ getLectureData ~ error:", error);
        return error;
    }
}
