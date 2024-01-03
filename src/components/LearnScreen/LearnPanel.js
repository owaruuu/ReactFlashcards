import OptionsButton from "./OptionsButton";
import BackButton from "../BackButton";

const LearnPanel = (props) => {
    return (
        <div className="learnScreenPanel">
            <OptionsButton showFunc={props.showFunc} />
            <p>
                {props.index + 1}/{props.terms.length}
            </p>
            <BackButton options={{ currentScreen: "lecture" }} />
        </div>
    );
};

export default LearnPanel;
