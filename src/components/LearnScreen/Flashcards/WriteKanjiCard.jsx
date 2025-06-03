import React, { forwardRef, useEffect, useRef, useState } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { CgUndo } from "react-icons/cg";
import { Button, Spinner } from "react-bootstrap";
import { MdOutlineClear } from "react-icons/md";
import SquareIconButton from "../../Buttons/SquareIconButton";
import DashCross from "../../Misc/DashCross";
import DayKanji from "../../temp svg/DayKanji";
import { getKanjiSvgName } from "../../../utils/utils";
import { useGetKanjiSvgDataQuery } from "../../../hooks/kanjiSvgDataQueryHook";
import parse from "html-react-parser";

const WriteKanjiCard = forwardRef((props, ref) => {
    const {
        termId,
        termsDict,
        state,
        showAnswer,
        answerFunction,
        handleUndo,
        handleReset,
        pointsInfo,
    } = props;

    const [strokeColor, setStrokeColor] = useState("#ffffff");

    let classNames =
        state === "highlighted"
            ? "termCard gold"
            : state === "muted"
            ? "termCard muted"
            : "termCard";

    const term = termsDict[termId];

    const tempKanjiName = term ? getKanjiSvgName(term.kanji) : "";

    const getKanjiSvgNameQuery = useGetKanjiSvgDataQuery(
        term?.kanji,
        tempKanjiName,
        term ? true : false
    );

    // useEffect(() => {
    //     console.log("buscando kanji, termId cambio...");
    // }, [termId]);

    const points = pointsInfo?.[termId];

    return (
        <div className={classNames}>
            <div className="term write">
                {points && <div className="points">{points.points}</div>}
                {term?.meaning ? term.meaning : "Cargando..."}
            </div>
            <div className="divider"></div>
            <div className="kanjiSection">
                <div className="canvasSection">
                    <div className="kanjiBackground">
                        <DashCross />
                        <div className="canvas">
                            <ReactSketchCanvas
                                height="160px"
                                width="160px"
                                canvasColor="transparent"
                                strokeColor={strokeColor}
                                ref={ref}
                                strokeWidth={7}
                            />
                        </div>
                    </div>
                </div>
                <div className="canvasControls">
                    <SquareIconButton
                        icon={<CgUndo />}
                        onClick={handleUndo}
                    ></SquareIconButton>
                    <SquareIconButton
                        icon={<MdOutlineClear />}
                        onClick={handleReset}
                    ></SquareIconButton>
                </div>
                <div className="kanjiBackground">
                    <DashCross />
                    {!showAnswer ? (
                        <button
                            className="showKanjiButton"
                            onClick={answerFunction}
                        >
                            Mostrar Kanji
                        </button>
                    ) : (
                        <div className="character">
                            {getKanjiSvgNameQuery.status === "success" &&
                                parse(extractSvgTag(getKanjiSvgNameQuery.data))}
                            {/* {term?.kanji ? term.kanji : <Spinner />} */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});

function extractSvgTag(svgString) {
    const svgStart = svgString.indexOf("<svg");
    const svgEnd = svgString.indexOf("</svg>") + 6;
    return svgString.substring(svgStart, svgEnd);
}

export default WriteKanjiCard;
