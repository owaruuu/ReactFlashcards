import TermItem from "./TermItem";
import KanjiItem from "./KanjiItem";
import BackToTopButton from "../Buttons/BackToTopButton";
import InteractionBlocker from "./InteractionBlocker";
import { shuffleArray } from "../../utils/utils";
import { HiStar } from "react-icons/hi2";
import { BiSolidHide } from "react-icons/bi";
import { useState, useEffect } from "react";
import { showDifference } from "../../utils/utils";

const TermList = (props) => {
    const [starred, setStarred] = useState(() =>
        starredAmount(props.termList, props.queryData)
    );
    const [muted, setMuted] = useState(
        mutedAmount(props.termList, props.queryData)
    );
    const hasSession = props.sessionData?.terms?.length > 0;
    const lastReviewDate = props.sessionData
        ? props.sessionData.lastReviewed
        : undefined;

    let termList = props.termList;
    if (props.queryData) {
        termList = reorderList(termList, props.queryData);
    }
    // console.log("🚀 ~ TermList ~ props.isKanjiView:", props.isKanjiView);

    const termItems = props.isKanjiView
        ? termList.map((term) => {
              return (
                  <KanjiItem
                      key={term.id}
                      globalQuery={props.globalQuery}
                      queryStatus={props.queryStatus}
                      queryIsRefetching={props.queryIsRefetching}
                      hasQueryData={props.queryData ? true : false}
                      termData={props.queryData?.[term.id]}
                      id={term.id}
                      term={term.term}
                      extra={term.extra}
                      answer={term.answer}
                      flipped={props.flipped}
                      onIconClick={props.onIconClick}
                      showControls={props.showControls}
                      loggedIn={props.loggedIn}
                  ></KanjiItem>
              );
          })
        : termList.map((term) => {
              return (
                  <TermItem
                      key={term.id}
                      globalQuery={props.globalQuery}
                      queryStatus={props.queryStatus}
                      queryIsRefetching={props.queryIsRefetching}
                      hasQueryData={props.queryData ? true : false}
                      termData={props.queryData?.[term.id]}
                      id={term.id}
                      term={term.term}
                      extra={term.extra}
                      answer={term.answer}
                      flipped={props.flipped}
                      onIconClick={props.onIconClick}
                      showControls={props.showControls}
                      loggedIn={props.loggedIn}
                  ></TermItem>
              );
          });

    //FUNCTIONS
    function onNewAllSessionClick() {
        let language;
        if (props.isKanjiView) {
            language = props.flipped ? "write" : "recognize";
        } else {
            language = props.flipped ? "spanish" : "japanese";
        }
        const options = {
            showHighlighted: true,
            showNormal: true,
            showMuted: true,
        };
        const newValue = {
            terms: calculateIds(options, termList, props.queryData),
            options: options,
            lastReviewed: lastReviewDate ? lastReviewDate : undefined,
        };

        props.onReviewClick(language, newValue);
    }

    function onAllButMutedSessionClick() {
        let language;
        if (props.isKanjiView) {
            language = props.flipped ? "write" : "recognize";
        } else {
            language = props.flipped ? "spanish" : "japanese";
        }
        const options = {
            showHighlighted: true,
            showNormal: true,
            showMuted: false,
        };
        const newValue = {
            terms: calculateIds(options, termList, props.queryData),
            options: options,
            lastReviewed: lastReviewDate ? lastReviewDate : undefined,
        };

        props.onReviewClick(language, newValue);
    }

    function onOnlyStarredClick() {
        let language;
        if (props.isKanjiView) {
            language = props.flipped ? "write" : "recognize";
        } else {
            language = props.flipped ? "spanish" : "japanese";
        }
        const options = {
            showHighlighted: true,
            showNormal: false,
            showMuted: false,
        };
        const newValue = {
            terms: calculateIds(options, termList, props.queryData),
            options: options,
            lastReviewed: lastReviewDate ? lastReviewDate : undefined,
        };

        props.onReviewClick(language, newValue);
    }

    const amountInfo = hasSession
        ? props.sessionData.terms.length > 1
            ? `(${props.sessionData.terms.length} terminos)`
            : "(1 termino)"
        : "";
    // props.sessionData ? props.sessionData.terms ?
    // props.sessionData.terms.length !== 0 ?
    // props.sessionData.terms.length > 1
    //         ? `(${props.sessionData.terms.length} terminos)`
    //         : "(1 termino)"
    //     : ""
    //     : "";

    useEffect(() => {
        setStarred(starredAmount(props.termList, props.queryData));
        setMuted(mutedAmount(props.termList, props.queryData));
    }, [props.queryData]);

    let language;
    if (props.isKanjiView) {
        language = props.flipped ? "write" : "recognize";
    } else {
        language = props.flipped ? "spanish" : "japanese";
    }

    return (
        <div className="termTab">
            {props.showControls && (
                <div className="termListButtonContainer ">
                    <InteractionBlocker
                        error={props.createSessionError}
                        errorMsg={
                            "Hubo un error, lo sentimos, intenta refrescar la pagina."
                        }
                        loading={props.sessionMutationStatus === "loading"}
                        loadingMsg={"Creando sesion..."}
                    />
                    <div className="termListButtons">
                        <p className="info">
                            Ultima sesion: {timeDifference(lastReviewDate)}
                        </p>
                        <button
                            disabled={!hasSession}
                            onClick={() => props.onContinueClick(language)}
                        >
                            <p>Continuar repaso </p>
                            <p>{amountInfo}</p>
                        </button>

                        <button onClick={onNewAllSessionClick}>
                            <p>Repasar todo</p>
                            <p>{`(${termList.length} terminos)`}</p>
                        </button>

                        <button
                            disabled={muted === 0}
                            onClick={onAllButMutedSessionClick}
                        >
                            <p>
                                Todo menos{"  "}
                                <BiSolidHide className="mute-checked" />
                            </p>
                            <p>{`(${
                                props.termList.length - muted
                            } terminos)`}</p>
                        </button>

                        <button
                            disabled={starred === 0}
                            onClick={onOnlyStarredClick}
                        >
                            <p>
                                Solo <HiStar className="star-checked" />{" "}
                            </p>

                            <p>{`(${starred} terminos)`}</p>
                        </button>
                    </div>
                    <div className="info"></div>
                </div>
            )}
            <div className="termList">{termItems}</div>
            <div className="backToTopDiv">
                <BackToTopButton />
            </div>
        </div>
    );
};

//FUNCTIONS
function reorderList(originalList, data) {
    let reorderedList = [];
    let index = 0;
    let mutedAmount = 0;

    originalList.forEach((term) => {
        if (data[term.id]) {
            if (data[term.id] === "highlighted") {
                reorderedList.splice(index, 0, term);
                index += 1;
            } else if (data[term.id] === "muted") {
                reorderedList.push(term);
                mutedAmount += 1;
            }
        } else {
            reorderedList.splice(
                reorderedList.length - 1 - (mutedAmount - 1),
                0,
                term
            );
        }
    });

    return reorderedList;
}

function calculateIds(options, termsArray, data) {
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

export default TermList;
