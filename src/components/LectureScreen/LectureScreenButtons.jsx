import BackButton from "../BackButton";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const LectureScreenButtons = (props) => {
    const navigate = useNavigate();

    const reviewButton = (
        <button className="reviewButton" onClick={() => navigate("flashcards")}>
            Revisar
        </button>
    );

    const testButton = (
        <button
            className={props.loggedIn ? "learnButton" : "learnButton disabled"}
            disabled={!props.loggedIn}
            onClick={() => navigate("test")}
        >
            <HiClipboardDocumentList className="testIcon" /> <span>Prueba</span>
        </button>
    );

    return (
        <div className="lectureScreenButtons">
            <div className="learningButtons">
                {!props.isKanjiView && reviewButton}
                {props.hasTest && testButton}
                <TbSwitch3 />
            </div>

            <BackButton
                className="backButton"
                dir={props.isKanjiView ? "/lectures/kanji" : "/lectures"}
                content={"Volver"}
            />
        </div>
    );
};

export default LectureScreenButtons;
