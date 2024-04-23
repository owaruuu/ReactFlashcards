import { useQuery, useMutation, useQueryClient } from "react-query";
import { getLectureOptionsData, postLectureData } from "../aws/userDataApi";

import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function useTermsDataForUserByLectureIdQuery(
    queryKey,
    lectureId,
    language,
    initialData,
    enabled
) {
    const queryClient = useQueryClient();
    return useQuery({
        enabled: enabled,
        queryKey: [queryKey],
        queryFn: () => getLectureOptionsData(lectureId, language),
        retry: 1,
        initialData: initialData,
        cacheTime: 0,
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            const globalQuery = queryClient.getQueryData("allDataForUser");

            const allButChanged = globalQuery.filter((object) => {
                return object.lecture_id != lectureId;
            });

            const oldValue = globalQuery.filter((object) => {
                return object.lecture_id == lectureId;
            });

            const newArray = [
                ...allButChanged,
                {
                    ...oldValue[0],
                    lecture_id: lectureId,
                    [`${language}_terms_data`]: data.data,
                },
            ];

            queryClient.setQueryData("allDataForUser", newArray);
        },
    });
}

export function useTermsDataForUserByLectureIdMutation(queryKey) {
    const { dispatch, saveError } = useContext(AppContext);
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: postLectureData,
        onMutate: async (variables) => {
            console.log("on mutate en mutation");
            await queryClient.cancelQueries({
                queryKey: [queryKey],
            });

            //get previos values to return as context
            const previousValue = queryClient.getQueryData([queryKey]);
            // console.log("🚀 ~ onMutate: ~ previousValue:", previousValue);

            //optimistic update
            queryClient.setQueryData([queryKey], {
                data: variables.newValue,
            });
            return { previousValue };
        },
        onError: (err, variables, context) => {
            console.log("on error en mutation");
            dispatch({ type: "SET_SAVE_ERROR", payload: true });
            queryClient.setQueryData([queryKey], {
                data: context.previousValue.data,
            });
        },
        onSuccess: (data, variables, context) => {
            console.log("on success en mutation");
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

export function useJapaneseTermsQuery(lectureId, enabled) {
    const queryClient = useQueryClient();
    const allUserDataQuery = queryClient.getQueryState("allDataForUser");
    const allUserData = queryClient.getQueryData("allDataForUser");
    // console.log("🚀 ~ useJapaneseTermsQuery ~ allUserData:", allUserData);

    return useTermsDataForUserByLectureIdQuery(
        "japaneseTermsForUserByLectureIdQuery",
        lectureId,
        "japanese",
        {
            data: findLectureData("japanese", allUserData, lectureId),
        },
        enabled
    );
}

export function useSpanishTermsQuery(lectureId, enabled) {
    const queryClient = useQueryClient();
    const allUserData = queryClient.getQueryData("allDataForUser");

    return useTermsDataForUserByLectureIdQuery(
        "spanishTermsForUserByLectureIdQuery",
        lectureId,
        "spanish",
        {
            data: findLectureData("spanish", allUserData, lectureId),
        },
        enabled
    );
}

function findLectureData(language, dataArray, lectureId) {
    let result = undefined;
    if (dataArray) {
        dataArray.forEach((element) => {
            if (element.lecture_id == lectureId) {
                result = element[`${language}_terms_data`];
            }
        });
    }

    return result;
}
