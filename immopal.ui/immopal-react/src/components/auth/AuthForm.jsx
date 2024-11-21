import { Form, useNavigate } from "react-router-dom";
import FormInputElement from "./FormInputElement";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { login } from "../../store/auth-slice.js";

export default function AuthForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        dispatch(login({ email, password }))
            .unwrap()
            .then(() => navigate("/home"))
            .catch((err) => {
                console.log("Error from login thunk:", err);
                setError(err || "Failed to login. Please try again later.");
            });
    }

    return (
        <Form
            className="w-11/12 sm:w-8/12 md:w-1/2 lg:w-5/12 xl:w-3/12 2xl:w-3/12 flex flex-col justify-center align-middle bg-cyan-200 px-4 md:px-8 rounded-lg"
            onSubmit={handleSubmit}
        >
            <h3 className="text-2xl md:text-3xl text-cyan-950 font-bold my-4 px-2 text-center">
                Login Form
            </h3>

            {error && (
                <p className="text-red-700 text-lg text-center p-4">{error}</p>
            )}

            <FormInputElement
                title="E-mail"
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
            />
            <FormInputElement
                title="Password"
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
            />
            <div className="w-full flex justify-center my-4">
                <button
                    type="submit"
                    className="bg-cyan-800 text-cyan-100 hover:bg-cyan-100 hover:text-cyan-800 rounded-md p-1 w-1/3"
                >
                    Login
                </button>
            </div>
        </Form>
    );
}
