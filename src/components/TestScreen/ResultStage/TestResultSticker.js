import { Tooltip } from "react-tooltip";
import { getName } from "../../../utils/StickersUtils";
import { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { FaCircleInfo } from "react-icons/fa6";

const TestResultSticker = (props) => {
    /* 
    props
        show -1: show medal outline
        show 0: show medal with fall animation
        show 1: show medal with idle animation
    */
    const [loadedSticker, setLoadedSticker] = useState(false);
    const spinner = (
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    );
    const stickerName = getName(props.lectureId);
    const tooltipMessage = `${stickerName}, Sticker para la prueba de ${props.lectureName}`;

    const loaded = () => {
        setLoadedSticker(true);
    };

    const getSticker = () => {
        if (props.show === -1) {
            return (
                <>
                    <div
                        className="stickerTooltip"
                        data-tooltip-id="sticker-info-tooltip"
                        data-tooltip-content="
                 Saca un puntaje perfecto para obtener este sticker."
                        data-tooltip-place="top"
                    >
                        <img
                            className="showOutline"
                            src={`../img/${stickerName}-outline.png`}
                            onLoad={loaded}
                            alt="sticker outline"
                        />
                    </div>
                </>
            );
        } else if (props.show === 0) {
            return (
                <>
                    <div
                        className="stickerTooltip win"
                        data-tooltip-id="sticker-info-tooltip"
                        data-tooltip-content={tooltipMessage}
                        data-tooltip-place="top"
                    >
                        {!loadedSticker && (
                            <div className="spinnerContainer">{spinner}</div>
                        )}
                        <img
                            className="showOutline"
                            src={`../img/${stickerName}-outline.png`}
                            onLoad={loaded}
                            alt="sticker outline"
                        />
                        <img
                            className="winSticker"
                            src={`../img/${stickerName}-sticker.png`}
                            onLoad={loaded}
                            alt={`sticker de ${stickerName}`}
                        />
                    </div>
                    <Tooltip
                        id="sticker-info-tooltip"
                        //isOpen={true}
                    />
                </>
            );
        } else if (props.show === 1) {
            return (
                <>
                    <div
                        className="stickerTooltip"
                        data-tooltip-id="sticker-info-tooltip"
                        data-tooltip-content={tooltipMessage}
                        data-tooltip-place="top"
                    >
                        {!loadedSticker && (
                            <div className="spinnerContainer">{spinner}</div>
                        )}
                        <img
                            className="showSticker"
                            src={`../img/${stickerName}-with-shadow.png`}
                            onLoad={loaded}
                            alt={`sticker de ${stickerName}`}
                        />
                    </div>
                    <Tooltip
                        id="sticker-info-tooltip"
                        //isOpen={true}
                    />
                </>
            );
        }
    };

    const stickerInfoTooltip = getSticker();

    return (
        <div className="stickerDiv">
            <p>
                Sticker<span className="goldAccent">:</span>
            </p>
            {stickerInfoTooltip}
            {props.show === 0 ? <p>Obtuviste un nuevo sticker!</p> : ""}
            {props.show === 1 ? (
                <p>
                    <FaCircleInfo />
                    Ingresa a tu perfil para saber mas sobre este Sticker.
                </p>
            ) : (
                ""
            )}
            {props.show === -1 ? (
                <p>
                    <FaCircleInfo /> Obten un puntaje perfecto para ganar este
                    sticker.
                </p>
            ) : (
                ""
            )}
        </div>
    );
};

export default TestResultSticker;
