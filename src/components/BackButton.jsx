import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const BackButton = (props) => {
    const { dispatch } = useContext(AppContext);
    const navigate = useNavigate();

    return (
        <button
            className="backButton"
            onClick={
                () => navigate(props.dir)
                // dispatch({
                //     type: "CHANGE_SCREEN",
                //     payload: {
                //         ...props.options,
                //     },
                // })
            }
        >
            Volver
        </button>
    );
};

export default BackButton;
