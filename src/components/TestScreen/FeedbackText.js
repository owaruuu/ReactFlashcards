const FeedbackText = (props) => {
    let divClassNames = "feedbackSection";

    if (props.show) {
        divClassNames += " show";
    }

    let textClassNames = "feedbackText";

    if (props.content === "Correct!") {
        textClassNames += " correct";
    } else {
        textClassNames += " incorrect";
    }

    return (
        <div className={divClassNames}>
            <span className={textClassNames}>{props.content}</span>
            <button className="feedbackButton" onClick={props.nextButton}>
                Next
            </button>
        </div>
    );
};

export default FeedbackText;
