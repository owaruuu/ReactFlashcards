import "./Styles/LectureList.css";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { getExtraLessons, getExtraPerms } from "../../aws/aws";
import LectureButtons from "./LectureButtons";
import BackToTopButton from "../Buttons/BackToTopButton";
import Spinner from "react-bootstrap/Spinner";
import DismissableBanner from "../Misc/DismissableBanner";
import FilterButton from "./components/FilterButton";

const LectureList = () => {
    const { loggedIn, dispatch, lectures, gotLectures, user } =
        useContext(AppContext);

    const [filterState, setFilterState] = useState(null);
    // console.log("🚀 ~ LectureList ~ filterState:", filterState);
    const [dateButtonState, setDateButtonState] = useState(null);
    const [sizeButtonState, setSizeButtonState] = useState(null);

    const [extraLessonMessage, setExtraLessonMessage] = useState("");

    useEffect(() => {
        const getLectures = async () => {
            try {
                //consulta a los permisos
                const userEmail = user.userName;

                const perms = await getExtraPerms(userEmail);

                const result = perms.data.Item ? perms.data.Item.access : [];

                if (result.length === 0) {
                    setExtraLessonMessage("No tienes acceso a mas lecciones.");
                    return dispatch({
                        type: "SET_LECTURES_FLAG",
                        payload: true,
                    });
                }

                const response = await getExtraLessons(result);

                if (response.data.Responses.lectures.length > 0) {
                    const orderedResults =
                        response.data.Responses.lectures.sort(
                            (a, b) => a.orderNumber - b.orderNumber
                        );

                    const extraLectures = orderedResults.map((item) => {
                        return JSON.parse(item.lecture);
                    });

                    const newLectures = [...lectures, ...extraLectures];

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

    function cycleState(name, state, callback) {
        setDateButtonState(null);
        setSizeButtonState(null);
        if (state === null) {
            callback("ASC");
            setFilterState(name + "ASC");
        } else if (state === "ASC") {
            callback("DESC");
            setFilterState(name + "DESC");
        } else if (state === "DESC") {
            callback(null);
            setFilterState(null);
        }
    }

    return (
        <div className="lectureList">
            {!loggedIn && (
                <DismissableBanner
                    text={
                        "Inicia sesion o crea una cuenta para guardar tu progreso."
                    }
                    bgColor={"#ab071d"}
                    color={"white"}
                    transition={1}
                ></DismissableBanner>
            )}
            <div className="titleContainer">
                <h2 className="lectureListTitle">Lecciones</h2>
                <div className="filter">
                    <span>ordernar por: </span>
                    <FilterButton
                        name={"date"}
                        text={"fecha sesión"}
                        state={dateButtonState}
                        onClick={cycleState}
                        callback={setDateButtonState}
                    />
                    <FilterButton
                        name={"size"}
                        text={"tamaño sesión"}
                        state={sizeButtonState}
                        onClick={cycleState}
                        callback={setSizeButtonState}
                    />
                </div>
            </div>

            <div className="lectureButtons">
                <LectureButtons filterState={filterState} />
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
