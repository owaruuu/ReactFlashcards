import { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { aunthenticateUser, connectCognito } from "../aws/aws";
import Spinner from "react-bootstrap/Spinner";

function LoginForm() {
    const [formData, setFormData] = useState({
        email: "owaruuu@gmail.com",
        password: "pas$W0rd",
    });

    const { dispatch } = useContext(AppContext);
    const [message, setMessage] = useState("");
    const [thinking, setThinking] = useState(false);
    const [login, setLogin] = useState(false);
    console.log("🚀 ~ file: LoginForm.js:15 ~ LoginForm ~ login:", login);

    useEffect(() => {
        if (login) {
            const delay = setTimeout(() => {
                dispatch({
                    type: "CHANGE_SCREEN",
                    payload: { newScreen: "main", newLecture: null },
                });
                dispatch({
                    type: "SET_LOG_STATUS",
                    payload: true,
                });
            }, 2000);

            return () => clearTimeout(delay);
        }
    }, [login]);

    function handleChange(event) {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value,
            };
        });
    }

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

            //si la respuesta es -1 significa que hubo un problema con el server de cognito
            if (response.value === -1) {
                dispatch({ type: "SET_COGNITO_ERROR", payload: true });
                return;
            }

            setMessage("Succesful Login");

            //empieza el timer para cambiar de pantalla
            setLogin(true);

            //si llego aca significa que tengo el payload
            //TODO obtener progress de DB

            dispatch({
                type: "SET_USER",
                payload: {
                    userName: response.value.email,
                    currentProgress: null,
                },
            });

            // setThinking(false);
        } catch (error) {
            setThinking(false);
            if (error.code === "ERR_NETWORK") {
                return setMessage("Server Offline, try again later");
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
                <button disabled={thinking}>Login</button>
            </form>
            {message && <p>{message}</p>}
            {thinking && spinner}
        </div>
    );
}

export default LoginForm;
