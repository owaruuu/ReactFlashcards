import { useQuery, useMutation, useQueryClient } from "react-query";
import { getLectureData, postLectureData } from "../aws/userDataApi";

const japaneseTermsQueryKey = "japaneseTermsForUserByLectureIdQuery";

export function useJapaneseTermsDataForUserByLectureIdQuery(
    lectureId,
    initialData
) {
    // console.log("llamo la contruccion de la query y paso la initial data");
    return useQuery({
        queryKey: [japaneseTermsQueryKey],
        queryFn: () => getLectureData(lectureId),
        initialData: initialData,
        cacheTime: 0,
        refetchOnWindowFocus: false,
    });
}

export function useJapaneseTermsDataForUserByLectureIdMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: postLectureData,
        onMutate: async (variables) => {
            await queryClient.cancelQueries({
                queryKey: [japaneseTermsQueryKey],
            });

            const previousValue = queryClient.getQueryData([
                japaneseTermsQueryKey,
            ]);

            //optimistic update
            queryClient.setQueryData([japaneseTermsQueryKey], {
                data: {
                    japanese_terms_data: variables.newValue,
                },
            });
            return { previousValue };
        },
        onError: (err, variables, context) => {
            queryClient.setQueryData(
                [japaneseTermsQueryKey],
                context.previousValue
            );
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({
                queryKey: [japaneseTermsQueryKey],
            });
        },
    });
}
