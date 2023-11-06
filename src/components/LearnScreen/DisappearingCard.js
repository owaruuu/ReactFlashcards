import { useEffect } from "react";

const DisappearingCard = (props) => {
    useEffect(() => {
        console.log(props);
        const timer = setTimeout(() => {
            props.killFunc(props.id);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    let classNames = "termCard";
    classNames += props.direction;

    return (
        <div className={classNames}>
            <div className="term">
                <span>
                    {props.terms[props.index].term}
                    {props.terms[props.index].extra && " - "}
                    {props.terms[props.index].extra}
                </span>
            </div>
            <hr></hr>
            <div className="answerSection">
                {props.showAnswer && (
                    <div>
                        <span>{props.terms[props.index].answer}</span>
                    </div>
                )}

                {!props.showAnswer && (
                    <div>
                        <span>Click to reveal answer</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DisappearingCard;
