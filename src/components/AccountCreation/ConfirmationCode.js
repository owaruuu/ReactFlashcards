import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { confirmUser } from "../../aws/aws";
import Spinner from "react-bootstrap/Spinner";

const ConfirmationCode = () => {
    const { user } = useContext(AppContext);
    const [formData, setFormData] = useState({
        email: "",
        code: "",
    });

    const handleChange = (event) => {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value,
            };
        });
    };

    const spinner = (
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    );

    return (
        <div className="confirmation">
            <h2>Check your email for a confirmation code.</h2>
            <form>
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={user.userName}
                    disabled
                ></input>
                <label>Confirmation Code</label>
                <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    // disabled={thinking}
                ></input>
                <button className="submitButton">Confirm</button>
            </form>
            {/* {message && <p>{message}</p>} */}
            {/* {thinking && spinner} */}
        </div>
    );
};

export default ConfirmationCode;
