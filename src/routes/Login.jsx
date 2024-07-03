import React from "react";
import { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { authenticateUser, connectCognito, getUserProgress } from "../aws/aws";
import { useNavigate } from "react-router-dom";
import { loginFormSchema } from "../schemas/schemas";
import { useQueryClient } from "react-query";
import "../components/Forms/Styles/Forms.css";
import Spinner from "react-bootstrap/Spinner";
import FormInfo from "../components/Forms/FormInfo";

import { useRevalidator } from "react-router-dom";

import { trySetUser } from "../hooks/tempUtil";

const Login = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const revalidator = useRevalidator();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { dispatch } = useContext(AppContext);
    const [messages, setMessages] = useState([]);
    const [thinking, setThinking] = useState(false);
    const [login, setLogin] = useState(false);

    //handle form change
    function handleChange(event) {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value,
            };
        });
    }

    //TODO rework
    useEffect(() => {
        if (login) {
            const delay = setTimeout(() => {
                // console.log("login in after timeout");
                queryClient.resetQueries();
                revalidator.revalidate(); //force retry loaders
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
        setMessages([]);
        setThinking(true);

        const { email, password } = formData;

        const { success, error } = loginFormSchema.safeParse({
            email,
            password,
        });

        if (!success) {
            setThinking(false);
            return setMessages(error.issues);
        }

        try {
            // console.log("trying to login");
            //verifico mis credenciales
            //post /login
            await authenticateUser(email, password);

            //obtengo informacion del idToken
            const response = await connectCognito();

            const result = trySetUser(response, dispatch);
            //esto cambia el estado de loggedIn lo que provoca un redirect
            //lo que quiero es que antes de hacer el cambio de estado, hacer redirect ?

            //si hubo un error con cognito
            if (result === false) {
                return;
            }

            setMessages([{ message: "Succesful Login" }]);

            //empieza el timer para cambiar de pantalla
            setLogin(true);

            const progress = await getUserProgress();

            if (progress) {
                dispatch({
                    type: "SET_USER",
                    payload: {
                        currentProgress: JSON.parse(progress),
                    },
                });
                dispatch({ type: "SET_SAVE_ERROR", payload: false });
                // dispatch({ type: "SET_SAVE_INFO_MSG", payload: "" });
            } else {
                dispatch({ type: "SET_DB_ERROR", payload: true });
                dispatch({
                    type: "SET_LOGIN_CONTROL_MSG",
                    payload: "Database server error try refreshing the page.",
                });
            }
        } catch (error) {
            console.log("🚀 ~ handleLogin ~ error:", error);
            setThinking(false);
            if (error.code === "ERR_NETWORK") {
                return setMessages([
                    { message: "Server Offline, try again later" },
                ]);
            }

            if (error.response.data === "Incorrect username or password.") {
                return setMessages([
                    { message: "Email o contraseña incorrectos" },
                ]);
            }

            return setMessages([{ message: error.response.data }]);
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
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={thinking}
                ></input>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    disabled={thinking}
                ></input>
                <button className="submitButton" disabled={thinking}>
                    Login
                </button>
            </form>
            <div className="messagesDiv">
                {messages && <FormInfo data={messages}></FormInfo>}
                {thinking && spinner}
            </div>
        </div>
    );
};

export default Login;
