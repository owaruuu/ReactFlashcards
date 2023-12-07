import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import { TiArrowBack } from "react-icons/ti";

const BackButton = (props) => {
    const { dispatch } = useContext(AppContext);
    const handleClick = (stage) => {
        switch (stage) {
            case "begin":
            case "results":
                console.log("back button desde test screen");
                dispatch({
                    type: "CHANGE_SCREEN",
                    payload: {
                        currentScreen: "lecture",
                    },
                });
                break;
            case "last":
                props.callback();
                break;
        }
    };

    return (
        <button
            className="testBackButton"
            onClick={() => handleClick(props.stage)}
        >
            <TiArrowBack /> {props.text}
        </button>
    );
};

export default BackButton;
