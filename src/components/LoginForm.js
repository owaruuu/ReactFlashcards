import { useState } from "react";
import axios from "axios";

function LoginForm() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errorMsg, setErrorMsg] = useState("");

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
        setErrorMsg("");
        const { email, password } = formData;
        console.log(
            "🚀 ~ file: LoginForm.js:21 ~ handleLogin ~ email, password:",
            email,
            password
        );

        try {
            const response = await axios.post("http://localhost:3003/login", {
                email,
                password,
            });
            console.log(
                "🚀 ~ file: LoginForm.js:24 ~ handleLogin ~ response:",
                response
            );
        } catch (error) {
            setErrorMsg(error.response.data);
            console.log(
                "🚀 ~ file: LoginForm.js:38 ~ handleLogin ~ error:",
                error
            );
        }
    }

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
                ></input>
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                ></input>
                <button>Login</button>
            </form>
            {errorMsg && <p>{errorMsg}</p>}
        </div>
    );
}

export { LoginForm };
