import LectureButton from "./LectureButton.js/LectureButton.js";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useQueryClient, useQuery } from "react-query";
import { getAllUserData } from "../../aws/userDataApi.js";

import { userQuizProgress } from "../../data/fake-db.js";
import { pickDifference } from "../../utils/utils.js";

const LectureButtons = (props) => {
    // console.log("🚀 ~ LectureButtons ~ props:", props);
    // console.log("🚀 ~ LectureButtons ~ userDataQuery:", userDataQuery);

    const userId = 123;
    const myProgress = userQuizProgress[userId];

    const { lectures, loggedIn } = useContext(AppContext);
    // console.log("🚀 ~ LectureButtons ~ lectures:", lectures);

    const userDataQuery = useQueryClient().getQueryState("allDataForUser");

    // const userDataQuery = useQuery({
    //     queryKey: ["allDataForUser"],
    //     queryFn: getAllUserData,
    //     refetchOnWindowFocus: false,
    //     refetchOnMount: false,
    //     retryOnMount: false,
    //     retry: 1,
    //     throwOnError: false,
    //     enabled: loggedIn ? true : false,
    //     onError: (error) => {
    //         console.log("🚀 ~ LectureButtons ~ error:", error);
    //     },
    //     onSuccess: (data) => {
    //         console.log("setie la data global desde el lecture buttons");
    //     },
    // });
    // console.log("🚀 ~ LectureButtons ~ userDataQuery:", userDataQuery);
    const starredAmountObject =
        userDataQuery?.status === "success"
            ? calculateStarred(userDataQuery.data)
            : {};

    const dataObject =
        userDataQuery?.status === "success"
            ? buildLectureData(userDataQuery.data)
            : {};
    // console.log("🚀 ~ LectureButtons ~ dataObject:", dataObject);

    const filledLectures = lectures.map((lecture) => {
        if (dataObject[lecture.lectureId]) {
            if (dataObject[lecture.lectureId]["japanese_session"]) {
                lecture["japanese_session"] =
                    dataObject[lecture.lectureId]["japanese_session"];
            }
            if (dataObject[lecture.lectureId]["spanish_session"]) {
                lecture["spanish_session"] =
                    dataObject[lecture.lectureId]["spanish_session"];
            }
        }

        return lecture;
    });

    const sortedLectures = sortLectures(props.filterState, filledLectures);

    const lectureButtons = sortedLectures.map((lecture) => {
        return (
            <LectureButton
                key={lecture.lectureId}
                lecture={lecture}
                id={lecture.lectureId}
                amount={lecture.termList.length}
                starQuerySuccess={userDataQuery?.status}
                starredAmount={starredAmountObject?.[lecture.lectureId]}
                userDataQueryData={dataObject}
                userDataQueryStatus={userDataQuery?.status}
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

function buildLectureData(dataArray) {
    let result = {};

    dataArray.forEach((element) => {
        result[element.lecture_id] = {
            japanese_session: element["japanese_session"],
            spanish_session: element["spanish_session"],
        };
    });

    return result;
}

function sortLectures(filterState, lectures) {
    let clonedLectures = JSON.parse(JSON.stringify(lectures));
    // console.log("🚀 ~ sortLectures ~ clonedLectures:", clonedLectures);

    switch (filterState) {
        case "dateASC":
            // console.log("Date ASC");
            return clonedLectures.sort(sortByDateASC);
        case "dateDESC":
            // console.log("Date DESC");
            return clonedLectures.sort(sortByDateDESC);
        case "sizeASC":
            // console.log("Name ASC");
            return clonedLectures.sort(sortBySessionSizeASC);
        case "sizeDESC":
            // console.log("Name DESC");
            return clonedLectures.sort(sortBySessionSizeDESC);
    }

    return clonedLectures;
}

function sortByDateASC(a, b) {
    return sortByDate(a, b);
}

function sortByDateDESC(a, b) {
    return sortByDate(b, a);
}

function sortByDate(a, b) {
    const japaneseDateA = a["japanese_session"]?.lastReviewed;
    const spanishDateA = a["spanish_session"]?.lastReviewed;
    let japaneseDataObjectA, spanishDataObjectA;
    if (japaneseDateA) {
        japaneseDataObjectA = new Date(japaneseDateA);
    }
    if (spanishDateA) {
        spanishDataObjectA = new Date(spanishDateA);
    }
    const chosenADiff = pickDifference(japaneseDataObjectA, spanishDataObjectA);

    const japaneseDateB = b["japanese_session"]?.lastReviewed;
    const spanishDateB = b["spanish_session"]?.lastReviewed;
    let japaneseDataObjectB, spanishDataObjectB;
    if (japaneseDateB) {
        japaneseDataObjectB = new Date(japaneseDateB);
    }
    if (spanishDateB) {
        spanishDataObjectB = new Date(spanishDateB);
    }
    const chosenBDiff = pickDifference(japaneseDataObjectB, spanishDataObjectB);

    // const chosenBDiff = pickDifference(bDate, aDate);
    //a is less than b by some ordering criterion

    if (chosenADiff && chosenBDiff) {
        // console.log(
        //     "🚀 ~ sortByDateASC ~ chosenADiff && chosenBDiff:",
        //     chosenADiff,
        //     chosenBDiff
        // );
        if (chosenADiff < chosenBDiff) {
            // console.log("a is less than b by some ordering criterion");
            // console.log(
            //     "🚀 ~ sortByDateASC ~ chosenADiff < chosenBDiff:",
            //     chosenADiff < chosenBDiff
            // );
            return 1;
        } else if (chosenADiff > chosenBDiff) {
            // console.log("a is greater than b by the ordering criterion");
            //a is greater than b by the ordering criterion
            return -1;
        }
    } else if (chosenADiff && !chosenBDiff) {
        return 1;
    } else if (!chosenADiff && chosenBDiff) {
        return -1;
    }

    return 0;
}

function sortBySessionSizeASC(a, b) {
    return sortBySessionSize(a, b);
}

function sortBySessionSizeDESC(a, b) {
    return sortBySessionSize(b, a);
}

function sortBySessionSize(a, b) {
    //aqui la logica
    //obtener tamanio de las sesiones
    let japaneseSessionSizeA = a["japanese_session"]?.terms.length;
    let spanishSessionSizeA = a["spanish_session"]?.terms.length;
    if (japaneseSessionSizeA === undefined) {
        japaneseSessionSizeA = 0;
    }

    if (spanishSessionSizeA === undefined) {
        spanishSessionSizeA = 0;
    }

    const aSessionSize = japaneseSessionSizeA + spanishSessionSizeA;

    let japaneseSessionSizeB = b["japanese_session"]?.terms.length;
    let spanishSessionSizeB = b["spanish_session"]?.terms.length;
    if (japaneseSessionSizeB === undefined) {
        japaneseSessionSizeB = 0;
    }
    if (spanishSessionSizeB === undefined) {
        spanishSessionSizeB = 0;
    }

    const bSessionSize = japaneseSessionSizeB + spanishSessionSizeB;

    if (aSessionSize < bSessionSize) {
        return -1;
    }

    if (bSessionSize > aSessionSize) {
        return 1;
    }

    return 0;
}

export default LectureButtons;
