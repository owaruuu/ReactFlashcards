import TermItem from "./TermItem";

const TermList = (props) => {
    const termItems = props.lecture.termList.map((term) => {
        return (
            <TermItem
                key={term.id}
                term={term.term}
                extra={term.extra}
                answer={term.answer}
            ></TermItem>
        );
    });

    return <div className="termList">{termItems}</div>;
};

export default TermList;
