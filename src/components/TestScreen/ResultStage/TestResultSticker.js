import { Tooltip } from "react-tooltip";
import missingSticker from "../../../img/missing-sticker.png";

const TestResultSticker = () => {
    const stickerInfoTooltip = (
        <>
            <div
                className="stickerTooltip"
                data-tooltip-id="sticker-info-tooltip"
                data-tooltip-content="
                 Saca un puntaje perfecto para obtener un sticker."
                data-tooltip-place="top"
            >
                <img src={missingSticker} />
            </div>
            <Tooltip
                id="sticker-info-tooltip"
                //isOpen={true}
            />
        </>
    );
    return (
        <div className="stickerDiv">
            <p>
                Sticker<span className="goldAccent">:</span>
            </p>
            {stickerInfoTooltip}
        </div>
    );
};

export default TestResultSticker;
