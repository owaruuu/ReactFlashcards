import { api, cloudFrontURL } from "../api/api";

export async function getKanjiSvgData(kanjiName) {
    try {
        const response = await api.get(`${cloudFrontURL}/${kanjiName}`);
        console.log("🚀 ~ getKanjiSvgData ~ response:", response);
        return response.data;
    } catch (error) {
        console.log("🚀 ~ getKanjiSvgData ~ error:", error);
        return error;
    }
}
