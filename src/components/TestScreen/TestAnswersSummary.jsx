import classNames from "classnames";
import styles from "./TestAnswerSummaryStyle.module.css";
import { FaXmark } from "react-icons/fa6";
import { FaRegCircle } from "react-icons/fa6";
import { TbPointFilled } from "react-icons/tb";

const TestAnswersSummary = (props) => {
    // console.log("🚀 ~ TestAnswersSummary ~ props:", props);
    const multipleChoiceComponents = props.results.multiple.map(
        (elem, index) => {
            return (
                <div key={index} className="testAnswerComponent">
                    <p>Pregunta {index + 1}:</p>
                    <div>
                        <p className="staticText">
                            <TbPointFilled />
                            Elegir la traduccion para:
                        </p>
                        <p>「{elem.prompt}」</p>
                    </div>

                    <div>
                        <p className="staticText">
                            <TbPointFilled />
                            Respuesta correcta:
                        </p>
                        <p>{elem.expected}</p>
                    </div>

                    <div>
                        <p className="staticText">
                            <TbPointFilled />
                            Tu respuesta:{" "}
                        </p>
                        <p>
                            <span
                                className={classNames(
                                    elem.correct
                                        ? styles.correct
                                        : styles.incorrect
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
                </div>
            );
        }
    );

    const dragComponents = props.results.drag.map((elem, index) => {
        return (
            <div key={index} className="testAnswerComponent">
                <p>Pregunta {index + 1}:</p>

                <div>
                    <p className="staticText">
                        <TbPointFilled />
                        Traducir:{" "}
                    </p>
                    <p>"{elem.prompt}"</p>
                </div>

                <div>
                    <p className="staticText">
                        <TbPointFilled />
                        Respuesta correcta:{" "}
                    </p>
                    <p>{elem.expected}</p>
                </div>
                <div>
                    <p className="staticText">
                        <TbPointFilled />
                        Tu respuesta:{" "}
                    </p>
                    <p>
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
            </div>
        );
    });
    console.log("🚀 ~ dragComponents ~ dragComponents:", dragComponents);

    return (
        <div className="testResume">
            <h1>Seleccion multiple:</h1>
            {multipleChoiceComponents}

            {dragComponents.length > 0 && (
                <>
                    <hr></hr>
                    <h1>Ordenar la frase:</h1>
                    {dragComponents}
                </>
            )}
        </div>
    );
};

export default TestAnswersSummary;
