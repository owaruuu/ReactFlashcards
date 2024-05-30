import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import {
    aunthenticateUser,
    connectCognito,
    getUserProgress,
} from "../../aws/aws";
import Spinner from "react-bootstrap/Spinner";

function LoginForm() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const { dispatch } = useContext(AppContext);
    const [message, setMessage] = useState("");
    const [thinking, setThinking] = useState(false);
    const [login, setLogin] = useState(false);

    function handleChange(event) {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value,
            };
        });
    }

    useEffect(() => {
        if (login) {
            const delay = setTimeout(() => {
                dispatch({
                    type: "CHANGE_SCREEN",
                    payload: { currentScreen: "main" },
                });
                dispatch({
                    type: "SET_LOG_STATUS",
                    payload: true,
                });
            }, 2000);

            return () => clearTimeout(delay);
        }
    }, [login]);

    async function handleLogin(event) {
        event.preventDefault();
        setMessage("");
        setThinking(true);

        const { email, password } = formData;

        //error handling for postman
        if (!email || !password) {
            setThinking(false);
            return setMessage("email or password required");
        }

        try {
            //verifico mis credenciales
            await aunthenticateUser(email, password);

            //obtengo informacion del idToken
            const response = await connectCognito();
            // console.log(
            //     "🚀 ~ file: LoginForm.js:59 ~ handleLogin ~ response:",
            //     response
            // );

            //si la respuesta es -1 significa que hubo un problema con el server de cognito
            if (response.value === -1) {
                dispatch({ type: "SET_COGNITO_ERROR", payload: true });
                return;
            }

            setMessage("Succesful Login");

            //empieza el timer para cambiar de pantalla
            setLogin(true);

            //si llego aca significa que tengo el payload

            dispatch({
                type: "SET_USER",
                payload: {
                    userName: response.value.email,
                },
            });

            const sub = response.value.sub;

            const progress = await getUserProgress(sub);

            if (progress) {
                dispatch({
                    type: "SET_USER",
                    payload: {
                        currentProgress: JSON.parse(progress),
                    },
                });
                dispatch({ type: "SET_SAVE_ERROR", payload: false });
                dispatch({ type: "SET_SAVE_INFO_MSG", payload: "" });
            } else {
                dispatch({ type: "SET_DB_ERROR", payload: true });
                dispatch({
                    type: "SET_LOGIN_CONTROL_MSG",
                    payload: "Database server error try refreshing the page.",
                });
            }

            // setThinking(false);
        } catch (error) {
            // console.log("🚀 ~ handleLogin ~ error:", error);
            setThinking(false);
            if (error.code === "ERR_NETWORK") {
                return setMessage("Server Offline, try again later");
            }

            if (error.response.data === "Incorrect username or password.") {
                return setMessage("Email o contraseña incorrectos");
            }
            return setMessage(error.response.data);
        }
    }

    const spinner = (
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    );

    return (
        <div className="form">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={thinking}
                ></input>
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    disabled={thinking}
                ></input>
                <button className="submitButton" disabled={thinking}>
                    Login
                </button>
            </form>
            {message && <p>{message}</p>}
            {thinking && spinner}
        </div>
    );
}

export default LoginForm;
