import React from "react";

const SessionButtons = (props) => {
    return (
        <div className="termListButtonContainer ">
            <InteractionBlocker
                error={props.createSessionError}
                errorMsg={
                    "Hubo un error, lo sentimos, intenta refrescar la pagina."
                }
                loading={props.sessionMutationStatus === "loading"}
                loadingMsg={"Creando sesion..."}
            />
            <div className="termListButtons">
                <p className="info">
                    Ultima sesion: {timeDifference(lastReviewDate)}
                </p>
                <button
                    disabled={!hasSession}
                    onClick={() => props.onContinueClick(language)}
                >
                    <p>Continuar repaso </p>
                    <p>{amountInfo}</p>
                </button>

                <button onClick={onNewAllSessionClick}>
                    <p>Repasar todo</p>
                    <p>{`(${termList.length} terminos)`}</p>
                </button>

                <button
                    disabled={muted === 0}
                    onClick={onAllButMutedSessionClick}
                >
                    <p>
                        Todo menos{"  "}
                        <BiSolidHide className="mute-checked" />
                    </p>
                    <p>{`(${props.termList.length - muted} terminos)`}</p>
                </button>

                <button disabled={starred === 0} onClick={onOnlyStarredClick}>
                    <p>
                        Solo <HiStar className="star-checked" />{" "}
                    </p>

                    <p>{`(${starred} terminos)`}</p>
                </button>
            </div>
            <div className="info"></div>
        </div>
    );
};

export default SessionButtons;
