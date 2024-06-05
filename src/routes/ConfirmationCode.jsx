import React from "react";
import { useNavigate } from "react-router-dom";
import { confirmUser } from "../aws/aws";
import { Spinner } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import FormInfo from "../components/Forms/FormInfo";
import { confirmationCodeSchema } from "../schemas/schemas";

const ConfirmationCode = (props) => {
    const navigate = useNavigate();
    const { dispatch, user } = useContext(AppContext);
    const [formData, setFormData] = useState({
        email: user.userName,
        code: "",
    });
    const [message, setMessages] = useState([]);
    const [thinking, setThinking] = useState(false);
    const [confirmed, setConfirmed] = useState(false);

    useEffect(() => {
        if (confirmed) {
            const delay = setTimeout(() => {
                navigate("/login");
            }, 2000);

            return () => clearTimeout(delay);
        }
    }, [confirmed]);

    const handleChange = (event) => {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value,
            };
        });
    };

    const handleConfirmation = async (event) => {
        event.preventDefault();
        setMessages([]);
        setThinking(true);

        const { email, code } = formData;

        const { success, error } = confirmationCodeSchema.safeParse({
            email,
            code,
        });

        if (!success) {
            setThinking(false);
            return setMessages(error.issues);
        }

        try {
            const response = await confirmUser(email, code);

            setMessages([
                { message: response.data + ". Ya puedes iniciar sesion." },
            ]);
            setConfirmed(true);
        } catch (error) {
            if (error.code === "ERR_NETWORK") {
                setThinking(false);
                return setMessages([
                    { message: "Network error. Please try again." },
                ]);
            }

            //reset server error state just in case
            dispatch({ type: "SET_SERVER_ERROR", payload: false });

            //cualquier otro error que retorne cognito
            if (error.code === "ERR_BAD_RESPONSE") {
                setThinking(false);
                return setMessages([{ message: error.response.data }]);
            }

            //dejo esto aqui por si hay otro errores raros que no encontre
            setThinking(false);
            alert("Hubo error con la peticion");
        }
    };

    const spinner = (
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    );

    return (
        <div className="confirmation">
            <h2>
                {user.userName.length > 0
                    ? "Revisa tu correo para conocer tu codigo."
                    : "Ingresa el correo con el cual creaste tu cuenta y tu codigo."}
            </h2>
            <form onSubmit={handleConfirmation}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    disabled={props.blocked ? true : thinking}
                ></input>
                <label htmlFor="code">Confirmation Code</label>
                <input
                    type="text"
                    id="code"
                    name="code"
                    required
                    value={formData.code}
                    onChange={handleChange}
                    disabled={thinking}
                ></input>
                <button className="submitButton" disabled={thinking}>
                    Confirm
                </button>
            </form>
            <div className="messagesDiv">
                {message && <FormInfo data={message}></FormInfo>}
            </div>
            {thinking && spinner}
        </div>
    );
};

export default ConfirmationCode;
