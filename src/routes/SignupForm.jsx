import React from "react";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import Spinner from "react-bootstrap/Spinner";
import { registerUser } from "../aws/aws";
import { useNavigate } from "react-router-dom";
import { loginFormSchema, signupFormSchema } from "../schemas/schemas";
import FormInfo from "../components/Forms/FormInfo";

const SignupForm = () => {
    const navigate = useNavigate();
    const { dispatch } = useContext(AppContext);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        repeatPassword: "",
    });

    const [messages, setMessages] = useState([]);
    const [thinking, setThinking] = useState(false);
    const [registered, setRegistered] = useState(false);

    useEffect(() => {
        if (registered) {
            const delay = setTimeout(() => {
                navigate("/register/confirmation");
            }, 2000);

            return () => clearTimeout(delay);
        }
    }, [registered]);

    const handleChange = (event) => {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value,
            };
        });
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        setMessages([]);
        setThinking(true);

        const { email, password, repeatPassword } = formData;

        //validate data
        const { success, error: schemaError } = signupFormSchema.safeParse({
            email,
            password,
            confirmPassword: repeatPassword,
        });

        if (!success) {
            setThinking(false);
            setMessages(schemaError.issues);
            return;
        }

        const { response, error: registerError } = await registerUser(
            email,
            password
        );

        if (registerError.code === "ERR_NETWORK") {
            setMessages([{ message: "Error with server, try again later." }]);
            setThinking(false);
            return;
        }

        if (registerError.code === "ERR_BAD_RESPONSE") {
            setMessages([{ message: response.data }]);
            setThinking(false);
            return;
        }

        dispatch({ type: "SET_USER", payload: { userName: email } });
        setMessages([{ message: response.data }]);
        setRegistered(true);
    };

    const handleCodeHelp = () => {
        // dispatch({
        //     type: "CHANGE_SCREEN",
        //     payload: { currentScreen: "codeHelp" },
        // });
        navigate("/register/confirmation");
    };

    const passwordInfo =
        "Password must be at least 8 characters long. Must contain at least: 1 number, 1 special character, 1 uppercase letter, 1 lowercase letter.";

    const spinner = (
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    );

    return (
        <>
            <div className="form">
                <h2>Register</h2>
                <form onSubmit={handleRegister}>
                    <label>Email</label>
                    <input
                        // type="email"
                        name="email"
                        onChange={handleChange}
                        value={formData.email}
                        // required
                        disabled={thinking}
                    ></input>
                    <div className="passwordInfo">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            value={formData.password}
                            // required
                            disabled={thinking}
                        ></input>
                        <p className="passwordInfoDesktop">{passwordInfo}</p>
                    </div>

                    <label>Repeat Password</label>
                    <input
                        type="password"
                        name="repeatPassword"
                        onChange={handleChange}
                        value={formData.repeatPassword}
                        // required
                        disabled={thinking}
                    ></input>
                    <p className="passwordInfoMobile">{passwordInfo}</p>
                    <button className="submitButton" disabled={thinking}>
                        Register
                    </button>
                </form>
                <div className="messagesDiv">
                    {/* {message && message} */}
                    {messages && <FormInfo data={messages}></FormInfo>}
                    {thinking && spinner}
                </div>
            </div>
            <div className="registerHelp">
                <p className="helpMessage">
                    Need help ? contact me at owaruuu@gmail.com
                </p>
                <button
                    className="needConfirmationButton"
                    onClick={handleCodeHelp}
                >
                    Enter a confirmation code.
                </button>
            </div>
        </>
    );
};

export default SignupForm;
