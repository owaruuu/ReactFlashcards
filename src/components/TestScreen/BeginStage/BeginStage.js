import BackButton from "../Util/BackButton";

const BeginStage = (props) => {
    const mondaiQuantity =
        props.test.mondaiOptions.easy +
        props.test.mondaiOptions.mid +
        props.test.mondaiOptions.hard;

    const dragQuantity = props.test.dragOptions.quantity;

    return (
        <div className="beginTestScreen">
            <div className="info">
                <p>Tiempo estimado: 10 min.</p>
                <p>{mondaiQuantity} preguntas de opcion multiple</p>
                <p>{dragQuantity} preguntas de ordenar</p>
                {/* <p>5 preguntas de particulas</p> */}
            </div>

            <div className="savedResultsButtons">
                <button
                    className={props.hasLast ? "" : "deactivated"}
                    disabled={!props.hasLast}
                    onClick={props.clickLast}
                >
                    Ultimo intento
                </button>
                <button
                    className={props.hasHighScore ? "" : "deactivated"}
                    disabled={!props.hasHighScore}
                    onClick={props.clickHigh}
                >
                    Mejor Puntacion
                </button>
            </div>

            <button className="beginTestButton" onClick={props.clickStart}>
                Comenzar
            </button>

            <BackButton
                text={"Volver a la Leccion"}
                stage={"begin"}
            ></BackButton>
        </div>
    );
};

export default BeginStage;
