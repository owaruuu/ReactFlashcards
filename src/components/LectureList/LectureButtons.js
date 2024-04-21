import LectureButton from "./LectureButton.js/LectureButton.js";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useQueryClient } from "react-query";

import { userQuizProgress } from "../../data/fake-db.js";

const LectureButtons = () => {
    const queryClient = useQueryClient();

    const userDataQuery = queryClient.getQueryState("allDataForUser");
    // console.log("🚀 ~ LectureButtons ~ userDataQuery:", userDataQuery);

    const starQuerySuccess = userDataQuery?.status === "success" ? true : false;

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
                starQuerySuccess={starQuerySuccess}
                starredAmount={starredAmountObject?.[lecture.lectureId]} //cambiar
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
            for (const [key, value] of Object.entries(
                element["japanese_terms_data"]
            )) {
                if (value == "highlighted") {
                    japaneseStarred += 1;
                }
            }
        }

        if (element["spanish_terms_data"]) {
            for (const [key, value] of Object.entries(
                element["spanish_terms_data"]
            )) {
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
