import TestAnswersSummary from "../TestAnswersSummary";
import BackButton from "../Util/BackButton";

const LastResultsStage = (props) => {
    const results = props.progress[props.lectureId].lastTest;
    // console.log("🚀 ~ LastResultsStage ~ results:", results);
    const date = new Date(results.date);

    return (
        <div className="lastTestResume">
            <div className="panel">
                <p>Fecha: {date.toLocaleDateString()}</p>
                <p>Puntaje: {results.score[props.version]}</p>
                <BackButton
                    text={"volver"}
                    stage={"last"}
                    callback={props.back}
                ></BackButton>
            </div>

            {/* <div>{JSON.stringify(results)}</div> */}
            <TestAnswersSummary results={results}></TestAnswersSummary>
        </div>
    );
};

export default LastResultsStage;
