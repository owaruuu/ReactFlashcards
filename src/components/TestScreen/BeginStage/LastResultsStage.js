import classNames from "classnames";
import styles from "./LastResultStyle.module.css";
import { FaXmark } from "react-icons/fa6";
import { FaRegCircle } from "react-icons/fa6";

const LastResultsStage = (props) => {
    console.log(props.progress);
    const results = props.progress[props.lectureId].lastTest;
    const date = new Date(results.date);

    const dragComponents = results.drag.map((elem, index) => {
        return (
            <div className="testAnswerComponent">
                <p>
                    Question {index + 1}: {elem.question}
                </p>
                <p>
                    Your answer:{" "}
                    <span
                        className={classNames(
                            elem.correct ? styles.correct : styles.incorrect
                        )}
                    >
                        {elem.answer}
                    </span>{" "}
                    <span
                        className={classNames(
                            elem.correct ? styles.circle : styles.x
                        )}
                    >
                        {elem.correct ? <FaRegCircle /> : <FaXmark />}
                    </span>
                </p>
            </div>
        );
    });

    return (
        <div className="lastTestResume">
            <div className="panel">
                <p>Date: {date.toLocaleDateString()}</p>
                <p>Score: {results.score[props.version]}</p>
                <button className="backButton" onClick={props.back}>
                    Go Back
                </button>
            </div>

            {/* <div>{JSON.stringify(results)}</div> */}
            <p>Multiple Choice:</p>
            <p>Drag and Drop:</p>
            <div className="testResume">{dragComponents}</div>
        </div>
    );
};

export default LastResultsStage;
