import { backToTop } from "../../utils/utils";
const BackToTopButton = () => {
    return (
        <button onClick={backToTop} className="backToTopButton">
            volver arriba
        </button>
    );
};

export default BackToTopButton;
