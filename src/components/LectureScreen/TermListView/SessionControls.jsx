import React, { useEffect, useState } from "react";
import InteractionBlocker from "../InteractionBlocker";
import { BiSolidHide } from "react-icons/bi";
import { HiStar } from "react-icons/hi2";
import { useCreateSessionMutation } from "../../../hooks/userDataQueryHook";
import {
    getLectureQueryString,
    showDifference,
    shuffleArray,
} from "../../../utils/utils";
import { useNavigate } from "react-router-dom";

const SessionControls = (props) => {
    // console.log("🚀 ~ SessionControls ~ props:", props);
    const { language, lectureId, terms, sessionData, termsData } = props;

    const navigate = useNavigate();

    const hasSession = sessionData?.terms?.length > 0;
    const lastReviewDate = sessionData ? sessionData.lastReviewed : undefined;

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
                loading={lectureSessionMutation.status === "loading"}
                loadingMsg={"Creando sesion..."}
            />
            <div className="termListButtons">
                <p className="info">
                    Ultima sesion: {timeDifference(lastReviewDate)}
                </p>
                <button disabled={!hasSession} onClick={changeToReviewScreen}>
                    <p>Continuar repaso </p>
                    <p>{amountInfo}</p>
                </button>

                <button onClick={onNewAllSessionClick}>
                    <p>Repasar todo</p>
                    <p>{`(${terms.length} terminos)`}</p>
                </button>

                <button
                    disabled={muted === 0}
                    onClick={onAllButMutedSessionClick}
                >
                    <p>
                        Todo menos{"  "}
                        <BiSolidHide className="mute-checked" />
                    </p>
                    <p>{`(${terms.length - muted} terminos)`}</p>
                </button>

                <button disabled={starred === 0} onClick={onOnlyStarredClick}>
                    <p>
                        Solo <HiStar className="star-checked" />{" "}
                    </p>

                    <p>{`(${starred} terminos)`}</p>
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

    //TODO shuffle array

    return shuffleArray(sessionTerms);
}

export default SessionControls;
