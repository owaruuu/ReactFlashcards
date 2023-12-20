import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { stickerNames } from "../../utils/StickersUtils";

const stickersArray = Object.values(stickerNames).map((id) => id);
console.log("🚀 ~ file: UserPanelScreen.js:6 ~ stickersArray:", stickersArray);

const UserPanelScreen = () => {
    const { dispatch, appState } = useContext(AppContext);

    const handleBackButton = () => {
        dispatch({
            type: "CHANGE_SCREEN",
            payload: { currentScreen: appState.lastScreen },
        });
    };

    // const Stickers =

    const Stickers = stickersArray.map((sticker) => {
        return (
            <div className="sticker">
                <img src={`../img/${sticker}-outline.png`}></img>
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
                        Selecciona un sticker para saber mas.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserPanelScreen;
