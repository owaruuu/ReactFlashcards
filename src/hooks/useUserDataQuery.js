import { useQuery } from "react-query";
import { getLectureData } from "../aws/userDataApi";

export function useDataForUserByLectureIdQuery(lectureId, initialData) {
    return useQuery({
        queryKey: ["dataForUserByLectureIdQuery"],
        queryFn: () => getLectureData(lectureId),
        initialData: initialData,
    });
}
