import { Form, useNavigate } from "react-router-dom";
import { useState } from "react";
import FormInputElement from "./FormInputElement";
import { useDispatch } from "react-redux";
import { register } from "../../store/auth-slice";

export default function RegistrationForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState();
    const [address, setAddress] = useState("");
    const [pictureUrl, setPictureUrl] = useState("user/user_icon.png");

    const [errors, setErrors] = useState({
        email: "",
        password: "",
        cpassword: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        dateOfBirth: "",
        address: "",
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    let formIsValid = true;

    function handleSubmit(event) {
        event.preventDefault();

        const newErrors = {
            email: "",
            password: "",
            cpassword: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            dateOfBirth: "",
            address: "",
        };

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            newErrors.email = "Please enter a valid email address.";
            formIsValid = false;
        }

        if (password.length < 8) {
            newErrors.password = "Password must be at least 8 characters long.";
            formIsValid = false;
        }

        if (password !== cpassword) {
            newErrors.cpassword = "Passwords do not match.";
            formIsValid = false;
        }

        if (firstName.length < 2) {
            newErrors.firstName =
                "First name must be at least 2 characters long.";
            formIsValid = false;
        }

        if (lastName.length < 2) {
            newErrors.lastName =
                "Last name must be at least 2 characters long.";
            formIsValid = false;
        }

        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phoneNumber)) {
            newErrors.phoneNumber = "Phone number must be 10 digits long.";
            formIsValid = false;
        }

        const dob = new Date(dateOfBirth);
        const age = new Date().getFullYear() - dob.getFullYear();
        if (age < 18) {
            newErrors.dateOfBirth =
                "You must be at least 18 years old to register.";
            formIsValid = false;
        }

        if (!address.trim()) {
            newErrors.address = "Please enter your address.";
            formIsValid = false;
        }

        setErrors(newErrors);

        if (formIsValid) {
            const registerRequest = {
                email,
                password,
                role: "CUSTOMER",
                firstName,
                lastName,
                phoneNumber,
                dateOfBirth,
                address,
                pictureUrl,
            };

            dispatch(register(registerRequest))
                .unwrap()
                .then(() => {
                    setEmail("");
                    setPassword("");
                    setCPassword("");
                    setFirstName("");
                    setLastName("");
                    setPhoneNumber("");
                    setDateOfBirth("");
                    setAddress("");
                    setPictureUrl("user/user_icon.png");

                    navigate("/auth");
                })
                .catch((error) => {
                    console.error(error);
                    alert("Registration failed. Please try again");
                });
        }
    }

    return (
        <Form
            className="w-11/12 sm:w-8/12 md:w-1/2 lg:w-5/12 xl:w-3/12 2xl:w-3/12 flex flex-col justify-center align-middle bg-cyan-200 px-4 md:px-8 rounded-lg"
            onSubmit={handleSubmit}
        >
            <h3 className="text-2xl md:text-3xl text-cyan-950 font-bold my-4 px-2 text-center">
                Registration Form
            </h3>
            <FormInputElement
                title="Email"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

            <FormInputElement
                title="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

            <FormInputElement
                title="Confirm Password"
                type="password"
                id="cpassword"
                value={cpassword}
                onChange={(e) => setCPassword(e.target.value)}
            />
            {errors.cpassword && <p className="text-red-500 text-sm">{errors.cpassword}</p>}
            
            <FormInputElement
                title="First Name"
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}

            <FormInputElement
                title="Last Name"
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}

            <FormInputElement
                title="Phone"
                id="phoneNumber"
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}

            <FormInputElement
                title="Date of birth"
                id="dateOfBirth"
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
            />
            {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>}

            <FormInputElement
                title="Address"
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}

            <FormInputElement
                title="PictureUrl"
                id="pictureUrl"
                type="text"
                value={pictureUrl}
                onChange={(e) => setPictureUrl(e.target.value)}
                required={false}
            />
            {errors.pictureUrl && <p className="text-red-500 text-sm">{errors.pictureUrl}</p>}
            
            <div className="w-full flex justify-center my-4">
                <button
                    type="submit"
                    className="bg-cyan-800 text-cyan-100 hover:bg-cyan-100 hover:text-cyan-800 rounded-md p-1 w-1/3"
                    disabled={!formIsValid}
                >
                    Sign Up
                </button>
            </div>
        </Form>
    );
}
