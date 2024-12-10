// import { useState, useContext, useEffect } from "react";
// import { AppContext } from "../../context/AppContext";
// import { registerUser } from "../../aws/aws";
// import Spinner from "react-bootstrap/Spinner";

// function RegisterForm(props) {
//     const [formData, setFormData] = useState({
//         email: "",
//         password: "",
//         repeatPassword: "",
//     });

//     const { dispatch } = useContext(AppContext);
//     const [message, setMessage] = useState("");
//     const [thinking, setThinking] = useState(false);
//     const [registered, setRegistered] = useState(false);

//     useEffect(() => {
//         if (registered) {
//             const delay = setTimeout(() => {
//                 // dispatch({
//                 //     type: "CHANGE_SCREEN",
//                 //     payload: { currentScreen: "confirmation" },
//                 // });
//             }, 2000);

//             return () => clearTimeout(delay);
//         }
//     }, [registered]);

//     const handleChange = (event) => {
//         setFormData((prevFormData) => {
//             return {
//                 ...prevFormData,
//                 [event.target.name]: event.target.value,
//             };
//         });
//     };

//     const handleRegister = async (event) => {
//         event.preventDefault();
//         setMessage("");
//         setThinking(true);

//         const { email, password, repeatPassword } = formData;

//         //check for passwords

//         if (password !== repeatPassword) {
//             setThinking(false);
//             setMessage("Passwords do not match");
//             return;
//         }

//         const response = await registerUser(email, password);

//         if (response.code === "ERR_NETWORK") {
//             setMessage("Error with server, try again later.");
//             setThinking(false);
//             return;
//         }

//         if (response.code === "ERR_BAD_RESPONSE") {
//             setMessage(response.response.data);
//             setThinking(false);
//             return;
//         }

//         dispatch({ type: "SET_USER", payload: { userName: email } });
//         setMessage(response.data);
//         setRegistered(true);
//     };

//     const handleCodeHelp = () => {
//         // dispatch({
//         //     type: "CHANGE_SCREEN",
//         //     payload: { currentScreen: "codeHelp" },
//         // });
//     };

//     const passwordInfo =
//         "Password must be at least 8 characters long. Must contain at least: 1 number, 1 special character, 1 uppercase letter, 1 lowercase letter.";

//     const spinner = (
//         <Spinner animation="border" role="status">
//             <span className="visually-hidden">Loading...</span>
//         </Spinner>
//     );

//     return (
//         <>
//             <div className="form">
//                 <h2>Register</h2>
//                 <form onSubmit={handleRegister}>
//                     <label>Email</label>
//                     <input
//                         type="email"
//                         name="email"
//                         onChange={handleChange}
//                         value={formData.email}
//                         required
//                         disabled={thinking}
//                     ></input>
//                     <div className="passwordInfo">
//                         <label>Password</label>
//                         <input
//                             type="password"
//                             name="password"
//                             onChange={handleChange}
//                             value={formData.password}
//                             required
//                             disabled={thinking}
//                         ></input>
//                         <p className="passwordInfoDesktop">{passwordInfo}</p>
//                     </div>

//                     <label>Repeat Password</label>
//                     <input
//                         type="password"
//                         name="repeatPassword"
//                         onChange={handleChange}
//                         value={formData.repeatPassword}
//                         required
//                         disabled={thinking}
//                     ></input>
//                     <p className="passwordInfoMobile">{passwordInfo}</p>
//                     <button className="submitButton" disabled={thinking}>
//                         Register
//                     </button>
//                 </form>
//                 {message && <p>{message}</p>}
//                 {thinking && spinner}
//             </div>
//             <div className="registerHelp">
//                 <p className="helpMessage">
//                     Need help ? contact me at owaruuu@gmail.com
//                 </p>
//                 <button
//                     className="needConfirmationButton"
//                     onClick={handleCodeHelp}
//                 >
//                     Enter a confirmation code.
//                 </button>
//             </div>
//         </>
//     );
// }

// export default RegisterForm;
