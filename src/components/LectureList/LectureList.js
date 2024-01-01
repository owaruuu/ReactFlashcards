import LectureButtons from "./LectureButtons";
// import { lectures } from "../data/lectures";
import BackToTopButton from "../Buttons/BackToTopButton";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import Spinner from "react-bootstrap/Spinner";
import { getExtraLessons, getExtraPerms } from "../../aws/aws";

const LectureList = () => {
    const { loggedIn, dispatch, lectures, gotLectures, user } =
        useContext(AppContext);

    const [extraLessonMessage, setExtraLessonMessage] = useState("");

    useEffect(() => {
        const getLectures = async () => {
            //aqui hacer primero hacer consulta por permisos y con los resultados
            //hacer consulta a lectures
            //asumiremos por ahora que ya tengo los resultados de permisos

            try {
                //consulta a los permisos
                const userEmail = user.userName;
                console.log(
                    "🚀 ~ file: LectureList.js:24 ~ getLectures ~ userEmail:",
                    userEmail
                );
                const perms = await getExtraPerms(userEmail);
                console.log(
                    "🚀 ~ file: LectureList.js:29 ~ getLectures ~ perms:",
                    perms
                );

                const result = perms.data.Item ? perms.data.Item.access : [];

                if (result.length === 0) {
                    setExtraLessonMessage("No tienes acceso a mas lecciones.");
                    return dispatch({
                        type: "SET_LECTURES_FLAG",
                        payload: true,
                    });
                }

                const response = await getExtraLessons(result);
                console.log(
                    "🚀 ~ file: LectureList.js:19 ~ getLectures ~ response:",
                    response
                );
                if (response.data.Responses.lectures.length > 0) {
                    const extraLectures = response.data.Responses.lectures.map(
                        (item) => {
                            return JSON.parse(item.lecture);
                        }
                    );

                    const newLectures = [...lectures, ...extraLectures];
                    console.log(
                        "🚀 ~ file: LectureList.js:32 ~ getLectures ~ newLectures:",
                        newLectures
                    );
                    dispatch({
                        type: "SET_LECTURES",
                        payload: newLectures,
                    });
                    dispatch({ type: "SET_LECTURES_FLAG", payload: true });
                }
            } catch (error) {
                console.log(
                    "🚀 ~ file: LectureList.js:25 ~ getLectures ~ error:",
                    error
                );
            }
        };

        if (loggedIn && !gotLectures) {
            getLectures();
        }
    }, [loggedIn]);

    return (
        <div className="lectureList">
            <h2 className="lectureListTitle">Set List</h2>
            <div className="lectureButtons">
                <LectureButtons />
                {loggedIn && !gotLectures ? (
                    <Spinner
                        className="spinner"
                        animation="border"
                        role="status"
                    >
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                ) : (
                    ""
                )}
                <p>{extraLessonMessage}</p>
            </div>
            <BackToTopButton />
        </div>
    );
};

export default LectureList;