import { useState } from "react";
import axios from "axios";

function RegisterForm(props) {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        repeatPassword: "",
    });

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
        console.log("register");

        //hacer check de ambos passwords

        console.log(
            "🚀 ~ file: RegisterForm.js:28 ~ handleRegister ~ formData:",
            formData
        );
        const { email, password } = formData;
        //mandar request, el mismo command deberia revisar si la cuenta ya existe
        // const response = await axios.get(
        //     "https://pokeapi.co/api/v2/pokemon/ditto"
        // );

        const response = await axios.post("http://localhost:3003/register", {
            email,
            password,
        });

        console.log(response);
    };

    return (
        <div className="form">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
                    required
                ></input>
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={formData.password}
                    required
                ></input>
                <label>Repeat Password</label>
                <input
                    type="password"
                    name="repeatPassword"
                    onChange={handleChange}
                    value={formData.repeatPassword}
                    required
                ></input>
                <button>Register</button>
            </form>
        </div>
    );
}

export { RegisterForm };
