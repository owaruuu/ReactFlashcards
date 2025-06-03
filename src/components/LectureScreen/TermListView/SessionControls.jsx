import React, { useEffect, useState } from "react";
import InteractionBlocker from "../InteractionBlocker";
import { BiSolidHide } from "react-icons/bi";
import { HiStar } from "react-icons/hi2";
import { ImLab } from "react-icons/im";
import { useCreateSessionMutation } from "../../../hooks/userDataQueryHook";
import {
    getLectureQueryString,
    ONE_HOUR,
    showDifference,
    shuffleArray,
} from "../../../utils/utils";
import { useNavigate } from "react-router-dom";

const MAX_SESSION_SIZE = 30;

const SessionControls = ({
    language,
    lectureId,
    terms,
    sessionData,
    termsData = {}, //ADD default state
    pointsData = {}, //ADD default state
    lectureQuery, //ADD lecture query to read status
}) => {
    const navigate = useNavigate();

    const hasSession = sessionData?.terms?.length > 0;
    const lastReviewDate = sessionData ? sessionData.lastReviewed : undefined;
    const amountReviewedToday = calculateReviewed(); //REMOVE check for data

    const amountInfo = hasSession
        ? sessionData.terms.length > 1
            ? `(${sessionData.terms.length} terminos)`
            : "(1 termino)"
        : "";

    const [starred, setStarred] = useState(() =>
        starredAmount(terms, termsData)
    );

    const [muted, setMuted] = useState(mutedAmount(terms, termsData));

    const [createSessionError, setCreateSessionError] = useState(false);

    const lectureSessionMutation = useCreateSessionMutation(
        getLectureQueryString(lectureId)
    );

    //FUNCTIONS
    function onNewAllSessionClick() {
        const options = {
            showHighlighted: true,
            showNormal: true,
            showMuted: true,
        };
        const newValue = {
            terms: calculateIds(options, terms, termsData),
            options: options,
            lastReviewed: lastReviewDate ? lastReviewDate : undefined,
        };

        onNewSessionCreate(language, newValue);
    }

    //revisa cuantos de los terminos llevan mas de 12 horas sin estudiar
    function calculateReviewed() {
        let amount = 0;
        for (const [key, value] of Object.entries(pointsData)) {
            //ADD check for muted state
            if (termsData[key] !== "muted") {
                const moreThanTwelve = calculateTwelve(value.date);
                if (!moreThanTwelve) {
                    amount += 1;
                }
            }
        }

        return amount;
    }

    //calcula si ya han pasado las 12 horas
    function calculateTwelve(date) {
        if (date === undefined) {
            return true;
        }

        const termDate = new Date(date).getTime();
        const today = new Date().getTime();
        const difference = today - termDate;
        if (difference / ONE_HOUR >= 12) {
            return true;
        } else {
            return false;
        }
    }

    //Crea una sesion nueva de estudio inteligentemente
    function onNewStudySession() {
        const options = {
            showHighlighted: true,
            showNormal: true,
            showMuted: false,
        };

        const terms = filterAndOrderElements();
        const termsIds = [];
        terms.forEach((term) => {
            termsIds.push(term.id);
        });

        const newValue = {
            terms: shuffleArray(termsIds),
            options: options,
            lastReviewed: lastReviewDate ? lastReviewDate : undefined,
        };

        onNewSessionCreate(language, newValue);
    }

    function filterAndOrderElements() {
        const clonedTerms = JSON.parse(JSON.stringify(terms));

        //filtrar elementos, sacando los elementos que ya estudie 'hoy', y esten muteados
        const filteredTerms = clonedTerms.filter((term) => {
            const hasBeenTwelve = calculateTwelve(pointsData?.[term.id]?.date);
            return termsData[term.id] !== "muted" && hasBeenTwelve;
        });

        if (clonedTerms.length <= MAX_SESSION_SIZE) {
            return filteredTerms;
        }

        if (!pointsData) {
            return filteredTerms.slice(0, MAX_SESSION_SIZE);
        }

        //ordenar elementos por fecha de estudio, dejando los elementos mas viejos primero (los que estudia hace mas tiempo)
        //ordenar elementos por puntaje, dejando los elementos con menor puntaje
        const orderedTerms = JSON.parse(JSON.stringify(filteredTerms)).sort(
            sortByDateAndPoints
        );

        //elegir maximo 30
        return orderedTerms.slice(0, MAX_SESSION_SIZE);
    }

    function sortByDateAndPoints(a, b) {
        //ASC is default
        //1 mantiene igual el orden
        //-1 los cambia de posicion

        //No hay informacion para ambos terminos, mantengo el orden
        if (!pointsData[a.id] && !pointsData[b.id]) {
            return 0;
        }

        const aDate = pointsData[a.id]?.date;
        const aPoints = pointsData[a.id]?.points;

        const bDate = pointsData[b.id]?.date;
        const bPoints = pointsData[b.id]?.points;

        //significa que nunca he estudiado el termino A
        //mantengo orden
        if (!pointsData[a.id]) {
            return -1;
        }

        //significa que nunca he estudiado el termino B
        //cambio el orden
        if (!pointsData[b.id]) {
            return 1;
        }

        const aDateObject = new Date(aDate);
        const bDateObject = new Date(bDate);

        if (aPoints < bPoints) {
            return -1;
        } else if (aPoints > bPoints) {
            return 1;
        }

        if (aDateObject < bDateObject) {
            return -1;
        } else if (aDateObject > bDateObject) {
            return 1;
        }

        return 0;
    }

    function onAllButMutedSessionClick() {
        const options = {
            showHighlighted: true,
            showNormal: true,
            showMuted: false,
        };
        const newValue = {
            terms: calculateIds(options, terms, termsData),
            options: options,
            lastReviewed: lastReviewDate ? lastReviewDate : undefined,
        };

        onNewSessionCreate(language, newValue);
    }

    function onOnlyStarredClick() {
        const options = {
            showHighlighted: true,
            showNormal: false,
            showMuted: false,
        };
        const newValue = {
            terms: calculateIds(options, terms, termsData),
            options: options,
            lastReviewed: lastReviewDate ? lastReviewDate : undefined,
        };

        onNewSessionCreate(language, newValue);
    }

    async function onNewSessionCreate(language, newValue) {
        try {
            await lectureSessionMutation.mutateAsync({
                lectureId: lectureId,
                attributeName: `${language}_session`,
                newValue: newValue,
            });
            changeToReviewScreen();
        } catch (error) {
            console.log("🚀 ~ onNewSessionCreate ~ error:", error);
            setCreateSessionError(true);
        }
    }

    function changeToReviewScreen() {
        window.scrollTo(0, 0);

        navigate(`${language}/study-session`);
    }

    useEffect(() => {
        setStarred(starredAmount(terms, termsData));
        setMuted(mutedAmount(terms, termsData));
    }, [termsData]);

    return (
        <div className="termListButtonContainer ">
            <InteractionBlocker
                error={createSessionError}
                errorMsg={
                    "Hubo un error, lo sentimos, intenta refrescar la pagina."
                }
                loading={
                    lectureSessionMutation.status === "loading" ||
                    lectureQuery.isRefetching
                }
                loadingMsg={
                    lectureQuery.isRefetching
                        ? "Obteniendo datos..."
                        : "Creando sesion..."
                }
            />
            <div className="termListButtons">
                <p className="info">
                    Ultima sesion: {timeDifference(lastReviewDate)}
                </p>
                <p className="timeInfo">
                    *terminos se refrescan despues de 12 horas
                </p>
                <button disabled={!hasSession} onClick={changeToReviewScreen}>
                    <p>Continuar repaso </p>
                    <p>{amountInfo}</p>
                </button>

                <button
                    disabled={amountReviewedToday === terms.length - muted}
                    onClick={onNewStudySession}
                >
                    <p>
                        Nuevo estudio <ImLab />
                    </p>
                    <p>{`(${amountReviewedToday} - ${
                        terms.length - muted
                    } estudiados*)`}</p>
                </button>

                <button disabled={starred === 0} onClick={onOnlyStarredClick}>
                    <p>
                        Solo <HiStar className="star-checked" />{" "}
                    </p>

                    <p>{`(${starred} terminos)`}</p>
                </button>

                <button onClick={onNewAllSessionClick}>
                    <p>Repasar todo</p>
                    <p>{`(${terms.length} terminos)`}</p>
                </button>
            </div>
            <div className="info"></div>
        </div>
    );
};

function starredAmount(array, data) {
    let amount = 0;

    if (data) {
        array.forEach((element) => {
            if (data[element.id]) {
                if (data[element.id] === "highlighted") {
                    amount++;
                }
            }
        });
    }

    return amount;
}

function mutedAmount(array, data) {
    let amount = 0;
    if (data) {
        array.some((element) => {
            if (data[element.id]) {
                if (data[element.id] === "muted") {
                    amount++;
                }
            }
        });
    }
    return amount;
}

function timeDifference(date) {
    if (date) {
        const lastReviewDate = new Date(date);
        const today = new Date();

        const diff = Math.abs(today.getTime() - lastReviewDate.getTime());

        return showDifference({
            chosenDiff: diff,
            lang: null,
        });
    } else {
        return "nunca.";
    }
}

function calculateIds(options, termsArray, data) {
    // console.log("🚀 ~ calculateIds ~ termsArray:", termsArray);
    let sessionTerms = [];
    const { showHighlighted, showNormal, showMuted } = options;

    if (showHighlighted && showNormal && showMuted) {
        termsArray.forEach((term) => {
            sessionTerms.push(term.id);
        });
    } else if (showHighlighted && showNormal) {
        termsArray.forEach((term) => {
            if (data[term.id]) {
                if (data[term.id] === "highlighted") {
                    sessionTerms.push(term.id);
                }
            } else {
                sessionTerms.push(term.id);
            }
        });
    } else if (showHighlighted) {
        termsArray.forEach((term) => {
            if (data[term.id]) {
                if (data[term.id] === "highlighted") {
                    sessionTerms.push(term.id);
                }
            }
        });
    }

    return shuffleArray(sessionTerms);
}

export default SessionControls;
