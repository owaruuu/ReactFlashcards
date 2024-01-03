const FeedbackText = (props) => {
    let divClassNames = "feedbackSection";

    if (props.show) {
        divClassNames += " show";
    }

    let textClassNames = "feedbackText";

    if (props.feedbackArea.feedback === "Correcto!") {
        textClassNames += " correct";
    } else {
        textClassNames += " incorrect";
    }

    return (
        <div className={divClassNames}>
            <span className={textClassNames}>
                {props.feedbackArea.feedback}
            </span>
            <button className="feedbackButton" onClick={props.nextButton}>
                {props.feedbackArea.nextButtonText}
            </button>
        </div>
    );
};

export default FeedbackText;
