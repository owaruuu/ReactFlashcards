const ProblemCounter = (props) => {
    const setCounter = () => {
        switch (props.stage) {
            case "mondai":
            case "dragDrop":
            case "manga":
                return (
                    <div className={props.className}>
                        {props.problem.current + 1}/{props.problem.max}
                    </div>
                );
            default:
                return null;
        }
    };

    const counter = setCounter();
    return counter;
};

export default ProblemCounter;
