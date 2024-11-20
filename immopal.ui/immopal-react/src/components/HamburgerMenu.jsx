import { useDispatch, useSelector } from "react-redux";
import MenuElement from "./MenuElement.jsx";
import { logout } from "../store/auth-slice.js";
import { useNavigate } from "react-router-dom";

export default function HamburgerMenu({ openState, handleClose }) {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleLogout() {
        dispatch(logout());
        handleClose();
        navigate("/auth");
    }

    return (
        <>
            <div
                className={`fixed top-16 left-1/2 transform -translate-x-1/2 w-4/5 p-6 bg-cyan-200 rounded-lg shadow-lg text-white z-50 
                    ${openState ? "block" : "hidden"}`}
            >
                <ul className="flex flex-col items-center space-y-6 text-lg mx-auto">
                    <MenuElement title="Agencies" />
                    <MenuElement title="Properties" />
                    <MenuElement title="Agencies" />
                    <MenuElement title="Chat" />
                    <MenuElement title="Account" />
                    <MenuElement title="Contact" />
                    {!isAuthenticated ? (
                        <MenuElement title="Sign In" />
                    ) : (
                        <MenuElement title="Logout" onClick={handleLogout} />
                    )}
                </ul>
                <div className="flex justify-end align-bottom">
                    <button
                        
                        className="bg-cyan-200 text-cyan-950 hover:bg-cyan-950 hover:text-cyan-200 font-extrabold p-2 rounded-md border border-cyan-950"
                        onClick={handleClose}
                    >
                        X
                    </button>
                </div>
            </div>
        </>
    );
}