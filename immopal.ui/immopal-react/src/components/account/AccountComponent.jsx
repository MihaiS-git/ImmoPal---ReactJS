import { Form } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPersonById, updatePerson } from "../../store/person-slice.js";
import FormInputElement from "../auth/FormInputElement.jsx";

export default function AccountComponent() {
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        dateOfBirth: "",
        address: "",
    });

    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const { person, loading, error } = useSelector((state) => state.person);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState();
    const [address, setAddress] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        if (user?.personId) {
            dispatch(getPersonById(user.personId));
        }
    }, [dispatch, user.personId]);

    useEffect(() => {
        if (person) {
            setFirstName(person.firstName || "");
            setLastName(person.lastName || "");
            setPhoneNumber(person.phoneNumber || "");
            setDateOfBirth(person.dateOfBirth || "");
            setAddress(person.address || "");
        }
    }, [person]);

    if (loading) {
        return <p>Loading person data...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    let formIsValid = true;

    function handleSubmit(event) {
        event.preventDefault();

        const newErrors = {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            dateOfBirth: "",
            address: "",
        };

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
            const updateRequest = {
                id: +person.id,
                firstName,
                lastName,
                phoneNumber,
                dateOfBirth,
                address,
                pictureUrl: person.pictureUrl,
                userId: +person.userId,
                propertyIds: person.propertyIds,
                appointmentIds: person.appointmentIds,
                bidIds: person.bidIds,
            };

            dispatch(updatePerson({ id: person.id, updateRequest }))
                .unwrap()
                .then(() => {
                    setSuccessMessage("Account updated successfully!");
                })
                .catch((error) => {
                    console.error(error);
                    alert("Update failed. Please try again");
                });
        }
    }

    return (
        <Form
            className="w-11/12 sm:w-8/12 md:w-1/2 lg:w-5/12 xl:w-3/12 2xl:w-3/12 flex flex-col justify-center align-middle bg-cyan-200 px-4 md:px-8 rounded-lg"
            onSubmit={handleSubmit}
        >
            <img
                src={person.pictureUrl}
                alt={person.lastName}
                className="w-full object-cover rounded-t-lg mt-8"
            />

            <FormInputElement
                title="First Name"
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            {errors.firstName && (
                <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}

            <FormInputElement
                title="Last Name"
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
            {errors.lastName && (
                <p className="text-red-500 text-sm">{errors.lastName}</p>
            )}

            <FormInputElement
                title="Phone"
                id="phoneNumber"
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
            {errors.phoneNumber && (
                <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
            )}

            <FormInputElement
                title="Date of birth"
                id="dateOfBirth"
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
            />
            {errors.dateOfBirth && (
                <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>
            )}

            <FormInputElement
                title="Address"
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
            {errors.address && (
                <p className="text-red-500 text-sm">{errors.address}</p>
            )}

            <div className="w-full flex justify-center my-4">
                <button
                    type="submit"
                    className="bg-cyan-800 text-cyan-100 hover:bg-cyan-100 hover:text-cyan-800 rounded-md p-1 w-1/3"
                    disabled={!formIsValid}
                >
                    Save
                </button>
            </div>
            {successMessage && (
                <p className="text-green-600 text-lg text-center m-4">
                    {successMessage}
                </p>
            )}
        </Form>
    );
}
