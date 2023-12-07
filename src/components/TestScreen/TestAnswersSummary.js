import classNames from "classnames";
import styles from "./TestAnswerSummaryStyle.module.css";
import { FaXmark } from "react-icons/fa6";
import { FaRegCircle } from "react-icons/fa6";

const TestAnswersSummary = (props) => {
    const multipleChoiceComponents = props.results.multiple.map(
        (elem, index) => {
            return (
                <div className="testAnswerComponent">
                    <p>Pregunta {index + 1}:</p>
                    <p>Elegir la traduccion para: "{elem.prompt}"</p>
                    <p>Respuesta correcta: {elem.expected}</p>
                    <p>
                        Tu respuesta:{" "}
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
        }
    );

    const dragComponents = props.results.drag.map((elem, index) => {
        return (
            <div className="testAnswerComponent">
                <p>Pregunta {index + 1}:</p>
                <p>Traducir: "{elem.prompt}"</p>
                <p>Respuesta correcta: {elem.expected}</p>
                <p>
                    Tu respuesta:{" "}
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
        <div className="testResume">
            <h1>Seleccion multiple:</h1>
            {multipleChoiceComponents}
            <hr></hr>
            <h1>Ordenar la frase:</h1>
            {dragComponents}
        </div>
    );
};

export default TestAnswersSummary;
