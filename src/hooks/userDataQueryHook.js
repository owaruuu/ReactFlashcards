import { useQuery, useMutation, useQueryClient } from "react-query";
import {
    getLectureData,
    postLectureData,
    getAllUserData,
    postSessionPointsData,
} from "../aws/userDataApi";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { getLectureQueryString } from "../utils/utils";
import { getTestData, saveTestTry, saveUserProgress } from "../aws/aws";

//query global para todas las lecciones
export function useAllLecturesDataQuery(enabled) {
    return useQuery({
        queryKey: ["allDataForUser"],
        queryFn: getAllUserData,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retryOnMount: false,
        retry: 1,
        throwOnError: false,
        enabled: enabled,
        // staleTime: 0
    });
}

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

//query local para una prueba
export function useTestQuery(testId, enabled) {
    return useQuery({
        enabled: enabled,
        queryKey: [`test_${testId}_query`],
        queryFn: () => getTestData(testId),
        retry: 1,
        //cacheTime: 0,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    });
}

//Cambia el mute o highlight de un termino
export function useTermOptionsMutation(queryKey) {
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
        },
    });
}

/**
 * Mutation to update the test results for an user
 */
export function useTestMutation(onSuccessCallback) {
    //TODO necesito convertir esto a un transact
    // const { dispatch } = useContext(AppContext);
    return useMutation({
        mutationFn: saveTestTry,
        retry: true,
        onSuccess: () => {
            onSuccessCallback();
            // dispatch({ type: "SET_SAVE_TEST", payload: true });
            // dispatch({ type: "SET_IS_TAKING_TEST", payload: false });
        },
    });
}

//Crea una sesion o reescribe una sesion mala
export function useCreateSessionMutation(queryKey) {
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

//modifica los ids en la sesion, agrega o quita puntos a terminos y actualiza la tabla de userSessions
export function useSessionPointsMutation(queryKey) {
    const { dispatch } = useContext(AppContext);
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: postSessionPointsData,
        onMutate: async (variables) => {
            // console.log("on mutate en session points mutation");
            await queryClient.cancelQueries({
                queryKey: [queryKey],
            });

            const previousValue = queryClient.getQueryData([queryKey]);
            let optimisticValue = {
                data: {
                    ...previousValue.data,
                    [variables.attributeName]: variables.newValue,
                },
            };

            if (variables.newPoints) {
                optimisticValue.data[variables.pointsAttributeName] =
                    variables.newPoints;
            }

            //optimistic update
            queryClient.setQueryData([queryKey], optimisticValue);
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
            // console.log("on success en session points mutation");
            const globalQuery = queryClient.getQueryData("allDataForUser");

            const allButChanged = globalQuery.filter((object) => {
                return object.lecture_id != variables.lectureId;
            });

            const oldValue = globalQuery.filter((object) => {
                return object.lecture_id == variables.lectureId;
            });

            const newValue = {
                ...oldValue[0],
                lecture_id: variables.lectureId,
                [variables.attributeName]: variables.newValue,
            };

            if (variables.newPoints) {
                newValue[variables.pointsAttributeName] = variables.newPoints;
            }

            const newArray = [...allButChanged, newValue];

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
