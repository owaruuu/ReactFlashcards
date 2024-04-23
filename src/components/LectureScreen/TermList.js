import TermItem from "./TermItem";

const TermList = (props) => {
    let termList = props.termList;
    if (props.query.data.data) {
        termList = reorderList(termList, props.query.data.data);
    }

    const termItems = termList.map((term) => {
        return (
            <TermItem
                key={term.id}
                query={props.query}
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

    return <div className="termList">{termItems}</div>;
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
