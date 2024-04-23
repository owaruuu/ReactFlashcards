import LectureButton from "./LectureButton.js/LectureButton.js";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useQueryClient, useQuery } from "react-query";
import { getAllUserData } from "../../aws/userDataApi.js";

import { userQuizProgress } from "../../data/fake-db.js";

const LectureButtons = () => {
    const queryClient = useQueryClient();

    const userDataQuery = useQuery({
        queryKey: ["allDataForUser"],
        queryFn: getAllUserData,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retryOnMount: false,
        retry: 1,
        throwOnError: false,
        onError: () => {
            console.log("aaaaaaaaaaaaaaaaaaaaaaa");
        },
    });

    // console.log("🚀 ~ LectureButtons ~ globalQuery:", userDataQuery);

    // const userDataQuery = queryClient.getQueryState("allDataForUser");
    // console.log("🚀 ~ LectureButtons ~ userDataQuery:", userDataQuery);
    // const starQuerySuccess =
    //     userDataQuery === undefined
    //         ? undefined
    //         : userDataQuery?.status === "success"
    //         ? true
    //         : false;

    // console.log("🚀 ~ LectureButtons ~ starQuerySuccess:", starQuerySuccess);
    const userId = 123;
    const myProgress = userQuizProgress[userId];

    const { lectures } = useContext(AppContext);

    const starredAmountObject =
        userDataQuery?.status === "success"
            ? calculateStarred(userDataQuery.data)
            : {};

    const lectureButtons = lectures.map((lecture) => {
        return (
            <LectureButton
                key={lecture.lectureId}
                lecture={lecture}
                id={lecture.lectureId}
                amount={lecture.termList.length}
                starQuerySuccess={userDataQuery.status}
                starredAmount={starredAmountObject?.[lecture.lectureId]}
                title={lecture.name}
                progress={myProgress[lecture.lectureId]}
            />
        );
    });
    return lectureButtons;
};

function calculateStarred(dataArray) {
    let result = {};

    dataArray.forEach((element) => {
        let japaneseStarred = 0;
        let spanishStarred = 0;

        if (element["japanese_terms_data"]) {
            for (const value of Object.values(element["japanese_terms_data"])) {
                if (value == "highlighted") {
                    japaneseStarred += 1;
                }
            }
        }

        if (element["spanish_terms_data"]) {
            for (const value of Object.values(element["spanish_terms_data"])) {
                if (value == "highlighted") {
                    spanishStarred += 1;
                }
            }
        }

        result = {
            ...result,
            [element.lecture_id]: japaneseStarred + spanishStarred,
        };
    });

    return result;
}

export default LectureButtons;
