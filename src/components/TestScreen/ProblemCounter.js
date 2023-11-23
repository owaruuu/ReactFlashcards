const ProblemCounter = (props) => {
    const setCounter = () => {
        switch (props.stage) {
            default:
                return (
                    <div className={props.className}>
                        {props.problem.current + 1}/{props.problem.max}
                    </div>
                );
            // case "dragDrop":
            //     return (
            //         <div className={props.className}>
            //             {props.problem.current + 1}/{props.problem.max}
            //         </div>
            //     );
        }
    };

    const counter = setCounter();
    return counter;
};

export default ProblemCounter;
