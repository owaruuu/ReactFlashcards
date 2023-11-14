import TermList from "./TermList";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import LectureScreenButtons from "./LectureScreenButtons";
import { lectures } from "../../data/lectures";
import svg from "../../svg/cherry-blossom-petal.svg";

const LectureScreen = () => {
    const { appState } = useContext(AppContext);

    const lectureId = appState.currentLecture;
    const lecture = lectures.find((lecture) => {
        return lecture.lectureId === lectureId;
    });

    return (
        <div className="lectureScreen">
            <h2 id="title" className="lectureTitle" string={lecture.name}>
                {lecture.name}
            </h2>
            <LectureScreenButtons />
            <div
                className="upperDivider"
                style={{
                    marginBottom: "25px",
                }}
            >
                <img
                    className="upperLogo"
                    src={svg}
                    style={{
                        width: "68px",
                        top: "-26px",
                        marginLeft: "calc(50% - 34px)",
                    }}
                ></img>
            </div>
            <div className="termListDiv">
                <TermList lecture={lecture}></TermList>
            </div>
        </div>
    );
};

export default LectureScreen;
