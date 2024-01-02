import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { getArray, getDescription } from "../../utils/StickersUtils";

const stickersArray = getArray();
const gold = <span className="goldAccent">:</span>;

const UserPanelScreen = () => {
    const { dispatch, appState, user } = useContext(AppContext);
    const [currentSticker, setCurrentSticker] = useState(-1);
    const [selectedSticker, setSelectedSticker] = useState(-1);

    const handleBackButton = () => {
        dispatch({
            type: "CHANGE_SCREEN",
            payload: { currentScreen: appState.lastScreen },
        });
    };

    const handleStickerClick = (id) => {
        setSelectedSticker(id);
        const hasSticker = user.currentProgress.stickers?.[id];

        if (hasSticker) {
            setCurrentSticker(id);
        } else {
            setCurrentSticker(999);
        }
    };

    const Stickers = stickersArray.map((sticker) => {
        const hasSticker = user.currentProgress.stickers?.[sticker.id];

        const stickerSuffix = hasSticker ? "-with-shadow.png" : "-outline.png";

        return (
            <div
                key={sticker.id}
                className={
                    selectedSticker === sticker.id
                        ? "sticker selected"
                        : "sticker"
                }
                onClick={() => handleStickerClick(sticker.id)}
            >
                <img
                    src={`../img/${sticker.name}${stickerSuffix}`}
                    alt={`Sticker de ${sticker.name}`}
                ></img>
            </div>
        );
    });

    return (
        <div className="userPanel">
            <h3>Panel de usuario</h3>
            <button onClick={handleBackButton}>Volver</button>
            <div className="userPanelContent">
                <div className="stickersDiv">
                    <p>Stickers</p>
                    <div className="allStickers">{Stickers}</div>
                </div>
                <div className="infoDiv">
                    <p>Informacion</p>
                    <div className="infoText">
                        {currentSticker === -1 ? (
                            "Selecciona un sticker para saber mas."
                        ) : (
                            <>
                                <span className="title">
                                    {getDescription(currentSticker).title}
                                </span>
                                {gold} {getDescription(currentSticker).content}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserPanelScreen;
