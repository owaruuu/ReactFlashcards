import { backToTop } from "../../utils/utils";
const BackToTopButton = () => {
    return (
        <button onClick={backToTop} className="backToTopButton">
            back to top
        </button>
    );
};

export default BackToTopButton;
