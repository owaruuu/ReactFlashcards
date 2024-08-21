import { useQuery } from "react-query";
import { getKanjiSvgData } from "../cloudFront/cloudFront";

export function useGetKanjiSvgDataQuery(kanji, kanjiName, enabled) {
    return useQuery({
        queryKey: [`${kanji}-query`],
        queryFn: () => getKanjiSvgData(kanjiName),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retryOnMount: false,
        retry: 1,
        throwOnError: false,
        enabled: enabled,
    });
}
