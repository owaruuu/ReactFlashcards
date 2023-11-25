const ProblemCounter = (props) => {
    const setCounter = () => {
        switch (props.stage) {
            default:
                return (
                    <div className={props.className}>
                        {props.problem.current + 1}/{props.problem.max}
                    </div>
                );
            case "results":
                return null;
        }
    };

    const counter = setCounter();
    return counter;
};

export default ProblemCounter;
