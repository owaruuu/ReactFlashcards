const ProblemCounter = (props) => {
    const setCounter = () => {
        switch (props.stage) {
            case "mondai":
            case "dragDrop":
            case "manga":
                return (
                    <div className={props.className}>
                        <p>
                            {props.problem.current + 1}/{props.problem.max}
                        </p>
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
