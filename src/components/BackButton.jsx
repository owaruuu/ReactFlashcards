import { useNavigate } from "react-router-dom";

const BackButton = (props) => {
    const navigate = useNavigate();

    return (
        <button className="backButton" onClick={() => navigate(props.dir)}>
            Volver
        </button>
    );
};

export default BackButton;
