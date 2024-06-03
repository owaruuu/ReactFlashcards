import "./Styles/LectureList.css";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { getExtraLessons, getExtraPerms } from "../../aws/aws";
import LectureButtons from "./LectureButtons";
import BackToTopButton from "../Buttons/BackToTopButton";
import Spinner from "react-bootstrap/Spinner";
import DismissableBanner from "../DismissableBanner/DismissableBanner";
import ReorderButton from "./components/ReorderButton";
import FilterContainer from "./components/FilterContainer";

const LectureList = () => {
    const { loggedIn, dispatch, lectures, gotLectures, user } =
        useContext(AppContext);

    const [orderingState, setOrderingState] = useState(null);
    const [filterState, setFilterState] = useState({
        basico1: false,
        basico2: false,
        basico3: false,
        basico4: false,
        basico5: false,
        basico6: false,
        basico7: false,
        basico8: false,
        basico9: false,
        basico10: false,
        extra1: false,
    });
    // console.log("🚀 ~ LectureList ~ filterState:", filterState);
    const [dateButtonState, setDateButtonState] = useState(null);
    const [sizeButtonState, setSizeButtonState] = useState(null);

    const [extraLessonMessage, setExtraLessonMessage] = useState("");
    let filters = new Set();
    lectures.forEach((lecture) => {
        filters.add(lecture.lectureGroup);
    });

    useEffect(() => {
        const getLectures = async () => {
            try {
                //consulta a los permisos
                const userEmail = user.userName;
                // console.log("🚀 ~ getLectures ~ userEmail:", userEmail);

                const perms = await getExtraPerms(userEmail);
                // console.log("🚀 ~ getLectures ~ perms:", perms);

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
            setOrderingState(name + "ASC");
        } else if (state === "ASC") {
            callback("DESC");
            setOrderingState(name + "DESC");
        } else if (state === "DESC") {
            callback(null);
            setOrderingState(null);
        }
    }

    function handleFilterClick(payload) {
        setFilterState((prev) => {
            return { ...prev, [payload.type]: payload.value };
        });
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
                {loggedIn && (
                    <>
                        <div className="ordering">
                            <span>ordernar por: </span>
                            <ReorderButton
                                name={"date"}
                                text={"fecha sesión"}
                                state={dateButtonState}
                                onClick={cycleState}
                                callback={setDateButtonState}
                            />
                            <ReorderButton
                                name={"size"}
                                text={"tamaño sesión"}
                                state={sizeButtonState}
                                onClick={cycleState}
                                callback={setSizeButtonState}
                            />
                        </div>
                        <FilterContainer
                            state={filterState}
                            onClick={handleFilterClick}
                            filters={filters}
                        />
                    </>
                )}
            </div>

            <div className="lectureButtons">
                <LectureButtons
                    orderingState={orderingState}
                    filterState={filterState}
                    lectures={lectures}
                />
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
            <div className="backToTopDiv">
                <BackToTopButton />
            </div>
        </div>
    );
};

export default LectureList;
