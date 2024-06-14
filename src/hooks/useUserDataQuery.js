import { useQuery, useMutation, useQueryClient } from "react-query";
import { getLectureData, postLectureData } from "../aws/userDataApi";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { getLectureQueryString } from "../utils/utils";

//query local para una leccion
export function useLectureQuery(lectureId, enabled) {
    const allUserData = useQueryClient().getQueryData("allDataForUser");
    const initialData = findLectureData(allUserData, lectureId);

    return useQuery({
        enabled: enabled,
        queryKey: [getLectureQueryString(lectureId)],
        queryFn: () => getLectureData(lectureId),
        retry: 1,
        placeholderData: { data: initialData },
        //cacheTime: 0,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    });
}

export function useLectureMutation(queryKey) {
    const { dispatch } = useContext(AppContext);
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: postLectureData,
        onMutate: async (variables) => {
            // console.log("on mutate en mutation");
            await queryClient.cancelQueries({
                queryKey: [queryKey],
            });

            //get previos values to return as context
            //contiene todos los attributos de una leccion
            const previousValue = queryClient.getQueryData([queryKey]);
            // console.log("🚀 ~ onMutate: ~ previousValue:", previousValue);

            //optimistic update
            queryClient.setQueryData([queryKey], {
                data: {
                    ...previousValue.data,
                    [variables.attributeName]: variables.newValue,
                },
            });
            return { previousValue };
        },
        onError: (err, variables, context) => {
            // console.log("on error en mutation");
            dispatch({ type: "SET_SAVE_ERROR", payload: true });
            queryClient.setQueryData([queryKey], {
                data: context.previousValue.data,
            });
        },
        onSuccess: (data, variables, context) => {
            // console.log("on success en mutation");
            const globalQuery = queryClient.getQueryData("allDataForUser");

            const allButChanged = globalQuery.filter((object) => {
                return object.lecture_id != variables.lectureId;
            });

            const oldValue = globalQuery.filter((object) => {
                return object.lecture_id == variables.lectureId;
            });

            const newArray = [
                ...allButChanged,
                {
                    ...oldValue[0],
                    lecture_id: variables.lectureId,
                    [variables.attributeName]: variables.newValue,
                },
            ];

            //cambio el estado de la query global
            queryClient.setQueryData("allDataForUser", newArray);

            dispatch({ type: "SET_SAVE_ERROR", payload: false });

            // Invalidate and refetch
            // queryClient.invalidateQueries({
            //     queryKey: [queryKey],
            // });
        },
    });
}

export function useSessionMutation(queryKey) {
    const { dispatch } = useContext(AppContext);
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: postLectureData,
        onMutate: async (variables) => {
            // console.log("on mutate en mutation");
            await queryClient.cancelQueries({
                queryKey: [queryKey],
            });

            const previousValue = queryClient.getQueryData([queryKey]);

            //optimistic update
            queryClient.setQueryData([queryKey], {
                data: {
                    ...previousValue.data,
                    [variables.attributeName]: variables.newValue,
                },
            });
            return { previousValue };
        },
        onError: (err, variables, context) => {
            // console.log("on error en session mutation");
            dispatch({ type: "SET_SAVE_ERROR", payload: true });
            queryClient.setQueryData([queryKey], {
                data: context.previousValue.data,
            });
        },
        onSuccess: (data, variables, context) => {
            // console.log("on success en session mutation");
            const globalQuery = queryClient.getQueryData("allDataForUser");
            // console.log("🚀 ~ useSessionMutation ~ globalQuery:", globalQuery);

            const allButChanged = globalQuery.filter((object) => {
                return object.lecture_id != variables.lectureId;
            });

            const oldValue = globalQuery.filter((object) => {
                return object.lecture_id == variables.lectureId;
            });

            const newArray = [
                ...allButChanged,
                {
                    ...oldValue[0],
                    lecture_id: variables.lectureId,
                    [variables.attributeName]: variables.newValue,
                },
            ];

            //cambio el estado de la query global
            queryClient.setQueryData("allDataForUser", newArray);
            dispatch({ type: "SET_SAVE_ERROR", payload: false });
        },
    });
}

function findLectureData(dataArray, lectureId) {
    let result = undefined;
    if (dataArray) {
        dataArray.forEach((element) => {
            if (element.lecture_id == lectureId) {
                result = element;
            }
        });
    }

    return result;
}
