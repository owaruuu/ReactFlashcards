import classNames from "classnames";
import styles from "./DragAnswerButton.module.css";

const DragAnswerButton = (props) => {
    return (
        <button
            className={classNames(
                "dragAnswerButton",
                styles.base,
                props.confirm && styles.confirm
            )}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.confirm ? "Estas seguro ?" : "Responder"}
        </button>
    );
};

export default DragAnswerButton;
