import TermItem from "./TermItem";
import BackToTopButton from "../Buttons/BackToTopButton";
import { HiStar } from "react-icons/hi2";
import { BiSolidHide } from "react-icons/bi";

const TermList = (props) => {
    let termList = props.termList;
    if (props.queryData) {
        termList = reorderList(termList, props.queryData);
    }

    const termItems = termList.map((term) => {
        return (
            <TermItem
                key={term.id}
                queryStatus={props.queryStatus}
                queryData={props.queryData}
                id={term.id}
                term={term.term}
                extra={term.extra}
                answer={term.answer}
                flipped={props.flipped}
                onIconClick={props.onIconClick}
                showControls={props.showControls}
            ></TermItem>
        );
    });

    return (
        <div className="termTab">
            <div className="termListButtonContainer">
                <button disabled>Continuar repaso</button>
                <button>Repasar todo</button>
                <button disabled>
                    Repasar todo menos <BiSolidHide className="mute-checked" />{" "}
                </button>
                <button disabled>
                    Repasar solo <HiStar className="star-checked" />{" "}
                </button>
            </div>
            <div className="termList">{termItems}</div>
            <BackToTopButton />
        </div>
    );
};

function reorderList(originalList, data) {
    let reorderedList = [];
    let index = 0;
    let mutedAmount = 0;

    originalList.forEach((term) => {
        if (data[term.id]) {
            if (data[term.id] === "highlighted") {
                reorderedList.splice(index, 0, term);
                index += 1;
            } else if (data[term.id] === "muted") {
                reorderedList.push(term);
                mutedAmount += 1;
            }
        } else {
            reorderedList.splice(
                reorderedList.length - 1 - (mutedAmount - 1),
                0,
                term
            );
        }
    });

    return reorderedList;
}

export default TermList;
