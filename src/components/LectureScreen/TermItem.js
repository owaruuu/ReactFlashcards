import { HiOutlineStar } from "react-icons/hi2";
import { HiStar } from "react-icons/hi2";
import { BiSolidHide } from "react-icons/bi";
import TermOptionButton from "./TermOptionButton";

const TermItem = (props) => {
    const term = () => {
        if (props.extra) {
            return (
                <div>
                    {props.term} ({props.extra})
                </div>
            );
        } else {
            return <div>{props.term}</div>;
        }
    };

    if (props.flipped) {
        return (
            <div className="termItem">
                <div className="termData">
                    <div className="answer">{props.answer}</div>
                    <div className="verticalRule"></div>
                    <div className="term" style={{ textAlign: "end" }}>
                        {term()}
                    </div>
                </div>
                <div className="termOptions">
                    <TermOptionButton star />
                    <TermOptionButton />
                </div>
            </div>
        );
    }

    return (
        <div className="termItem">
            <div className="termData">
                <div className="term">{term()}</div>
                <div className="verticalRule"></div>
                <div className="answer" style={{ textAlign: "end" }}>
                    {props.answer}
                </div>
            </div>
            <div className="termOptions">
                <TermOptionButton star />
                <TermOptionButton />
            </div>
        </div>
    );
};

export default TermItem;
