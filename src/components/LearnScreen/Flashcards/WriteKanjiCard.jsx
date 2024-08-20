import React, { useRef, useState } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { CgUndo } from "react-icons/cg";
import { Button, Spinner } from "react-bootstrap";
import { MdOutlineClear } from "react-icons/md";
import SquareIconButton from "../../Buttons/SquareIconButton";
import DashCross from "../../Misc/DashCross";
import DayKanji from "../../temp svg/DayKanji";

const WriteKanjiCard = (props) => {
    const { termId, termsDict, state, showAnswer, answerFunction } = props;
    console.log("🚀 ~ WriteKanjiCard ~ props:", props);

    const [strokeColor, setStrokeColor] = useState("#a855f7");
    const canvasRef = useRef(null);
    console.log("🚀 ~ WriteKanjiCard ~ canvasRef:", canvasRef.current);

    let classNames =
        state === "highlighted"
            ? "termCard gold"
            : state === "muted"
            ? "termCard muted"
            : "termCard";

    const term = termsDict[termId];
    console.log("🚀 ~ WriteKanjiCard ~ term:", term);

    function handleUndoClick() {
        canvasRef.current?.undo();
    }

    const handleResetClick = () => {
        canvasRef.current?.resetCanvas();
    };

    return (
        <div className={classNames}>
            <div className="term write">
                {term?.meaning ? term.meaning : "Cargando..."}
            </div>
            <div className="divider"></div>
            <div className="kanjiSection">
                <div className="canvasSection">
                    <div className="kanjiBackground">
                        <DashCross />
                        <div className="canvas">
                            <ReactSketchCanvas
                                // width="100%"
                                // height="100%"
                                height="160px"
                                width="160px"
                                canvasColor="transparent"
                                strokeColor={strokeColor}
                                ref={canvasRef}
                                strokeWidth={8}
                            />
                        </div>
                    </div>
                </div>
                <div className="canvasControls">
                    <SquareIconButton
                        icon={<CgUndo />}
                        onClick={handleUndoClick}
                    ></SquareIconButton>
                    <SquareIconButton
                        icon={<MdOutlineClear />}
                        onClick={handleResetClick}
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
                            <DayKanji />
                            {/* {term?.kanji ? term.kanji : <Spinner />} */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WriteKanjiCard;
