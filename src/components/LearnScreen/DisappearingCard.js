import { useEffect } from "react";

const DisappearingCard = (props) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            props.killFunc();
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    let classNames = "termCard";
    classNames += props.direction;

    const termComp = <span>{props.term}</span>;

    const answerComp = (
        <div>
            <span>{props.answer}</span>
        </div>
    );

    let termContent, answerContent;

    const fillContent = () => {
        if (props.flipped) {
            termContent = answerComp;
            answerContent = termComp;
        } else {
            termContent = termComp;
            answerContent = answerComp;
        }
    };

    fillContent();

    const card = (
        <div className={classNames}>
            <div className="term">{termContent}</div>
            <div className="divider"></div>
            <div className="answerSection">
                {props.showAnswer && answerContent}

                {!props.showAnswer && (
                    <div>
                        <span>Haz click para ver la respuesta</span>
                    </div>
                )}
            </div>
        </div>
    );

    return card;
};

export default DisappearingCard;
