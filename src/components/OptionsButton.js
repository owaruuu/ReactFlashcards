const OptionsButton = (props) => {
    return (
        <button
            className="optionsButton"
            onClick={props.showFunc}
            disabled={props.disabled}
        >
            Opciones
        </button>
    );
};

export default OptionsButton;
