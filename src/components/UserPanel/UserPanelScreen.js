import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { getArray, getDescription } from "../../utils/StickersUtils";
import { tests } from "../../data/tests";

const stickersArray = getArray();
console.log("🚀 ~ file: UserPanelScreen.js:6 ~ stickersArray:", stickersArray);

const gold = <span className="goldAccent">:</span>;

const UserPanelScreen = () => {
    const { dispatch, appState, user } = useContext(AppContext);
    const [currentSticker, setCurrentSticker] = useState(-1);

    const handleBackButton = () => {
        dispatch({
            type: "CHANGE_SCREEN",
            payload: { currentScreen: appState.lastScreen },
        });
    };

    const handleStickerClick = (id) => {
        setCurrentSticker(id);
    };

    const Stickers = stickersArray.map((sticker) => {
        //por cada sticker revisar el currentPRogress para ver si tengo esa sticker

        const hasSticker = user.currentProgress.stickers[sticker.id];

        const stickerSuffix = hasSticker ? "-with-shadow.png" : "-outline.png";

        return (
            <div
                className={
                    currentSticker === sticker.id
                        ? "sticker selected"
                        : "sticker"
                }
                onClick={() => handleStickerClick(sticker.id)}
            >
                <img src={`../img/${sticker.name}${stickerSuffix}`}></img>
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
