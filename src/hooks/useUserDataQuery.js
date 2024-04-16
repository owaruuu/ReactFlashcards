import { useQuery } from "react-query";
import { getUserData } from "../aws/userDataApi";

export function useUserDataQuery(lectureId) {
    return useQuery("userDataQuery", () => getUserData(lectureId));
}
