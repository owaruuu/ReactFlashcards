import BackButton from "../Util/BackButton";

const BeginStage = (props) => {
    return (
        <div className="beginTestScreen">
            <div className="info">
                <p>Tiempo estimado: 10 min.</p>
                <p>5 preguntas de opcion multiple</p>
                <p>5 preguntas de traduccion</p>
                <p>5 preguntas de particulas</p>
            </div>

            <div className="savedResultsButtons">
                <button onClick={props.clickLast}>Ultimo intento</button>
                <button>Mejor Puntacion</button>
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
