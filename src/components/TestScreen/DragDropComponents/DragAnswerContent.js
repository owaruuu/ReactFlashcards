import classNames from "classnames";
import styles from "./styles/DragAnswer.module.css";
import { FaXmark } from "react-icons/fa6";

const DragAnswerContent = (props) => {
    const content = (
        <span
            className={classNames(
                styles.dragAnswer,
                props.changed && styles.blinkAnimation
            )}
        >
            {props.phrase}
        </span>
    );
    return (
        <>
            {props.phrase !== "" ? content : "..."}{" "}
            {props.incorrect && <FaXmark />}{" "}
        </>
    );
};

export default DragAnswerContent;
