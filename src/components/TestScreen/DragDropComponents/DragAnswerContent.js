import classNames from "classnames";
import styles from "./styles/DragAnswer.module.css";

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
    return <>{props.phrase !== "" ? content : "..."}</>;
};

export default DragAnswerContent;
