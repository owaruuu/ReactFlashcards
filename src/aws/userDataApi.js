import { api, URL } from "../api/api";

//reemplaza el objeto con las opciones de los terminos en espaniol o japones para una leccion
export async function postLectureData({ lectureId, attributeName, newValue }) {
    // console.log("🚀 ~ lastReviewed:", lastReviewed);
    // console.log("USANDO POSTLECTUREDATA");
    try {
        const response = await api.post(
            `${URL}/api/v2/user-data/studySession`,
            {
                lectureId,
                attributeName,
                newValue,
            },
        );

        return response;
    } catch (error) {
        // console.log("🚀 ~ postLectureData ~ error:", error);
        throw error;
    }
}

export async function postSessionPointsData({
    lectureId,
    attributeName,
    pointsAttributeName,
    newValue,
    newPoints,
    lastReviewed,
}) {
    // console.log("USANDO POSTSESSIONPOINTSDATA");
    try {
        const response = await api.post(`${URL}/api/v2/user-data/points`, {
            lectureId,
            attributeName,
            pointsAttributeName,
            newValue,
            newPoints,
            lastReviewed,
        });

        return response;
    } catch (error) {
        // console.log("🚀 ~ postLectureData ~ error:", error);
        throw error;
    }
}

//get data about term options
export async function getAllUserData() {
    // console.log("USANDO GETALLUSERDATA");
    try {
        const response = await api.get(`${URL}/api/v2/getAllUserData`);
        return [...response.data.Items];
    } catch (error) {
        console.log("🚀 ~ getUserData ~ error:", error);
        throw error;
    }
}

export async function getLectureData(lectureId) {
    // console.log("USANDO GETLECTUREDATA");
    // console.warn("called get lecture data");
    try {
        const response = await api.get(`${URL}/api/v2/user-data/${lectureId}`);
        //
        let result = {
            user_id: null,
            lecture_id: lectureId,
            japanese_terms_data: {},
            spanish_terms_data: {},
            japanese_session: {},
            spanish_session: {},
            recognize_session: {},
            recognize_terms_data: {},
            write_session: {},
            write_terms_data: {},
        };
        if (response.data.Item) {
            if (response.data.Item) {
                result = { ...result, ...response.data.Item };
            }
        }

        return { data: result };
    } catch (error) {
        console.log("🚀 ~ getLectureData ~ error:", error);
        throw error;
    }
}
