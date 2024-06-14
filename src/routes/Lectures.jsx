import React from "react";
import { useEffect, useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Outlet, useLoaderData } from "react-router-dom";
import { getExtraLessons } from "../aws/aws";
import { freePerms } from "../data/freePerms.js";
import { useQuery } from "react-query";
import { getAllUserData } from "../aws/userDataApi";

const Lectures = () => {
    let perms = useLoaderData();

    //Al fallar el objeto tendre un error code
    if (perms.code) {
        perms = [];
    }

    const { loggedIn, dispatch, lectures, gotLectures } =
        useContext(AppContext);

    // en /lectures creo la query global para todas las lecciones
    const userDataQuery = useQuery({
        queryKey: ["allDataForUser"],
        queryFn: getAllUserData,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retryOnMount: false,
        retry: 1,
        throwOnError: false,
        enabled: loggedIn ? true : false,
    });

    const [extraLessonMessage, setExtraLessonMessage] = useState("");

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

    const [orderingState, setOrderingState] = useState(null);
    const [dateButtonState, setDateButtonState] = useState(null);
    const [sizeButtonState, setSizeButtonState] = useState(null);

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

    useEffect(() => {
        const getLectures = async () => {
            try {
                if (perms.length === 0) {
                    setExtraLessonMessage("No tienes acceso a mas lecciones.");
                    return dispatch({
                        type: "SET_LECTURES_FLAG",
                        payload: true,
                    });
                }

                const response = await getExtraLessons(perms);

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
            // console.log("getting lectures");
            getLectures();
        }
    }, [loggedIn]);

    return (
        <Outlet
            context={{
                userDataQuery,
                extraLessonMessage,
                orderingState,
                dateButtonState,
                setDateButtonState,
                sizeButtonState,
                setSizeButtonState,
                cycleState,
                filterState,
                handleFilterClick,
                perms: [...perms, ...freePerms],
            }}
        />
    );
};

export default Lectures;
