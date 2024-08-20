import React, { useRef, useState } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { CgUndo } from "react-icons/cg";
import { Button } from "react-bootstrap";
import { MdOutlineClear } from "react-icons/md";
import SquareIconButton from "../../Buttons/SquareIconButton";

const WriteKanjiCard = (props) => {
    const { termId, termsDict, state, showAnswer } = props;
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

    function handleClearClick() {
        canvasRef.current?.clearCanvas();
    }

    return (
        <div className={classNames}>
            <div className="term write">{term.meaning}</div>
            <div className="divider"></div>
            <div className="canvasSection">
                <div className="canvas">
                    <ReactSketchCanvas
                        width="100%"
                        height="100%"
                        canvasColor="transparent"
                        strokeColor={strokeColor}
                        ref={canvasRef}
                        strokeWidth={10}
                    />
                </div>
                <div className="canvasControls">
                    <SquareIconButton
                        icon={<CgUndo />}
                        onClick={handleUndoClick}
                    ></SquareIconButton>
                    <SquareIconButton
                        icon={<MdOutlineClear />}
                        onClick={handleClearClick}
                    ></SquareIconButton>
                </div>
            </div>
        </div>
    );
};

export default WriteKanjiCard;
