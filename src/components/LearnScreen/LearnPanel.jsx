import OptionsButton from "../OptionsButton";
import BackButton from "../BackButton";
import { useParams } from "react-router-dom";

const LearnPanel = (props) => {
    const { lectureId } = useParams();
    return (
        <div className="learnScreenPanel">
            <div className="panel">
                <OptionsButton showFunc={props.showFunc} />
                <p>
                    {props.index + 1}/{props.terms.length}
                </p>
                <BackButton
                    className="backButton"
                    dir={`/lectures/${lectureId}`}
                    content={"Volver"}
                />
            </div>
            <div className="info">
                <p>
                    {props.flip
                        ? "Recordando significados en Japones"
                        : "Recordando significados en Español"}
                </p>
            </div>
        </div>
    );
};

export default LearnPanel;
