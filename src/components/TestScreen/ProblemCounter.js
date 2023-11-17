const ProblemCounter = (props) => {
    const setCounter = () => {
        switch (props.stage) {
            case "mondai":
                return (
                    <div>
                        {props.problem.current + 1}/{props.problem.max}
                    </div>
                );
        }
    };

    const counter = setCounter();
    return counter;
};

export default ProblemCounter;
