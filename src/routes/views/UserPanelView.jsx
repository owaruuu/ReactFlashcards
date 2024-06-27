import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { getArray, getDescription } from "../../utils/StickersUtils";
import { logoutUser } from "../../aws/aws";
import { useNavigate, useRevalidator } from "react-router-dom";
import PromptModal from "../../components/Modals/PromptModal";
import { useQueryClient } from "react-query";

const stickersArray = getArray();
const gold = <span className="goldAccent">:</span>;

const UserPanelView = () => {
    //HOOKS
    const navigate = useNavigate();
    const revalidator = useRevalidator();
    const queryClient = useQueryClient();
    const { dispatch, user, freeLectures } = useContext(AppContext);
    const [showModal, setShowModal] = useState(false);
    const [currentSticker, setCurrentSticker] = useState(-1);
    const [selectedSticker, setSelectedSticker] = useState(-1);

    //VARS
    const Stickers = stickersArray.map((sticker) => {
        const hasSticker = user.currentProgress?.stickers?.[sticker.id];

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

    //FUNCTIONS
    function handleLogoutClick(state) {
        // if (state) {
        //     setButton("logout");
        // }

        setShowModal(state);
    }

    async function logout() {
        console.warn("loggin out");
        try {
            await logoutUser();
        } catch (error) {
            console.log(
                "🚀 ~ file: LoginControls.js:23 ~ logout ~ error:",
                error
            );
            alert("Logout failed, server is probably down, try again later.");
        }

        navigate("/lectures");
        dispatch({ type: "SET_LOG_STATUS", payload: false });
        dispatch({
            type: "SET_USER",
            payload: { currentProgress: null, userName: "" },
        });
        dispatch({ type: "SET_IS_TAKING_TEST", payload: false });
        dispatch({ type: "SET_LECTURES", payload: freeLectures });
        dispatch({ type: "SET_LECTURES_FLAG", payload: false });
        queryClient.resetQueries();
        // revalidator.revalidate();
    }

    function handleStickerClick(id) {
        setSelectedSticker(id);
        const hasSticker = user.currentProgress?.stickers?.[id];

        if (hasSticker) {
            setCurrentSticker(id);
        } else {
            setCurrentSticker(999);
        }
    }

    //COMPONENTS
    const proceedButton = <button onClick={logout}>Cerrar sesion.</button>;
    const cancelButton = (
        <button
            onClick={() => {
                setShowModal(false);
            }}
        >
            Cancelar
        </button>
    );

    return (
        <div className="userPanel">
            <PromptModal
                title="Cerrar Sesion"
                message="Estas seguro ?"
                proceedButton={proceedButton}
                cancelButton={cancelButton}
                visible={showModal}
                onHide={() => setShowModal(false)}
            />
            <button
                className="logoutButton"
                onClick={() => handleLogoutClick(true)}
            >
                logout
            </button>
            <h3>Panel de usuario</h3>
            {/* <button onClick={handleBackButton}>Volver</button> */}
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

export default UserPanelView;
