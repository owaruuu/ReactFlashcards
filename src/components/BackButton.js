import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const BackButton = (props) => {
    const { dispatch } = useContext(AppContext);

    return (
        <button
            className="backButton"
            onClick={() =>
                dispatch({
                    type: "CHANGE_SCREEN",
                    payload: {
                        ...props.options,
                    },
                })
            }
        >
            go back
        </button>
    );
};

export default BackButton;
