import { useNavigate } from "react-router-dom";

const BackButton = (props) => {
    const navigate = useNavigate();

    return (
        <button className={props.className} onClick={() => navigate(props.dir)}>
            {props.content}
        </button>
    );
};

export default BackButton;
