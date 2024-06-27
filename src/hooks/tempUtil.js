import { useContext } from "react";
import { AppContext } from "../context/AppContext";
export function trySetUser(tokenPayload, dispatch) {
    // console.log("🚀 ~ trySetUser ~ tokenPayload:", tokenPayload);
    // const { dispatch } = useContext(AppContext);
    if (tokenPayload.value === 0) {
        return false;
    }
    if (tokenPayload.value === -1) {
        // dispatch({ type: "SET_COGNITO_ERROR", payload: true });
        dispatch({ type: "SET_SERVER_ERROR", payload: true });
        dispatch({
            type: "SET_LOGIN_CONTROL_MSG",
            payload: "Server error, try refreshing the page.",
        });
        return false;
    }

    dispatch({
        type: "SET_USER",
        payload: {
            userName: tokenPayload.value.email,
        },
    });

    // dispatch({ type: "SET_LOG_STATUS", payload: true });
    return true;
}
