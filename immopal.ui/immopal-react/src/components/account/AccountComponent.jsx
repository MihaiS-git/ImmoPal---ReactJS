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
    const [formState, setFormState] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        dateOfBirth: "",
        address: "",
    });

    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const { person, loading, error } = useSelector((state) => state.person);

    const [successMessage, setSuccessMessage] = useState("");

    const isFormTouched = person && (
        formState.firstName !== person.firstName ||
        formState.lastName !== person.lastName ||
        formState.phoneNumber !== person.phoneNumber ||
        formState.dateOfBirth !== person.dateOfBirth ||
        formState.address !== person.address
    );

    useEffect(() => {
        if (user?.personId) {
            dispatch(getPersonById(user.personId));
        }
    }, [dispatch, user.personId]);

    useEffect(() => {
        if (person) {
            setFormState({
                firstName: person.firstName || "",
                lastName: person.lastName || "",
                phoneNumber: person.phoneNumber || "",
                dateOfBirth: person.dateOfBirth || "",
                address: person.address || "",
            });
        }
    }, [person]);

    if (loading) {
        return <p>Loading person data...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    let formIsValid = true;

    function handleInputChange(field, value) {
        setFormState((prevState) => ({
            ...prevState,
            [field]: value,
        }));
        if (successMessage) {
            setSuccessMessage("");
        }
    }

    function handleSubmit(event) {
        event.preventDefault();

        const newErrors = {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            dateOfBirth: "",
            address: "",
        };

        if (formState.firstName.length < 2) {
            newErrors.firstName =
                "First name must be at least 2 characters long.";
            formIsValid = false;
        }

        if (formState.lastName.length < 2) {
            newErrors.lastName =
                "Last name must be at least 2 characters long.";
            formIsValid = false;
        }

        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(formState.phoneNumber)) {
            newErrors.phoneNumber = "Phone number must be 10 digits long.";
            formIsValid = false;
        }

        const dob = new Date(formState.dateOfBirth);

        const age = new Date().getFullYear() - dob.getFullYear();
        if (age < 18) {
            newErrors.dateOfBirth =
                "You must be at least 18 years old to register.";
            formIsValid = false;
        }

        if (!formState.address.trim()) {
            newErrors.address = "Please enter your address.";
            formIsValid = false;
        }

        setErrors(newErrors);

        if (formIsValid) {
            const updateRequest = {
                id: +person.id,
                ...formState,
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
            className="w-full sm:w-10/12 xl:w-8/12 2xl:w-6/12 flex flex-col justify-center align-middle bg-cyan-200 px-4 md:px-8 rounded-lg"
            onSubmit={handleSubmit}
        >
            {person && (
                <img
                    src={person.pictureUrl}
                    alt={person.lastName}
                    className="w-full object-cover rounded-t-lg mt-8"
                />
            )}

            <FormInputElement
                title="First Name"
                id="firstName"
                type="text"
                value={formState.firstName || ""}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
            />
            {errors.firstName && (
                <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}

            <FormInputElement
                title="Last Name"
                id="lastName"
                type="text"
                value={formState.lastName || ""}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
            />
            {errors.lastName && (
                <p className="text-red-500 text-sm">{errors.lastName}</p>
            )}

            <FormInputElement
                title="Phone"
                id="phoneNumber"
                type="text"
                value={formState.phoneNumber || ""}
                onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
            />
            {errors.phoneNumber && (
                <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
            )}

            <FormInputElement
                title="Date of birth"
                id="dateOfBirth"
                type="date"
                value={formState.dateOfBirth || ""}
                onChange={(e) => handleInputChange("dateOfBirth",e.target.value)}
            />
            {errors.dateOfBirth && (
                <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>
            )}

            <FormInputElement
                title="Address"
                id="address"
                type="text"
                value={formState.address || ""}
                onChange={(e) => handleInputChange("address",e.target.value)}
            />
            {errors.address && (
                <p className="text-red-500 text-sm">{errors.address}</p>
            )}

            <div className="w-full flex justify-center my-4">
                <button
                    type="submit"
                    className="bg-cyan-800 text-cyan-100 hover:bg-cyan-100 hover:text-cyan-800 disabled:bg-cyan-300 disabled:text-cyan-500 rounded-md p-1 w-1/3"
                    disabled={!isFormTouched || !formIsValid }
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
