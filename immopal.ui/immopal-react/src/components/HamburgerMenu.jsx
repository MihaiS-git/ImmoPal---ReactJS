import { useDispatch, useSelector } from "react-redux";
import MenuElement from "./MenuElement.jsx";
import { logout } from "../store/auth-slice.js";
import { useNavigate, NavLink } from "react-router-dom";

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
                    <MenuElement
                        title="Agencies"
                        toTarget="/agencies"
                        onClick={handleClose}
                    />
                    <MenuElement title="Properties" />
                    {isAuthenticated && <MenuElement title="Auctions" />}
                    {isAuthenticated && <MenuElement title="Chat" />}
                    {isAuthenticated && <MenuElement title="Account" />}
                    <MenuElement
                        title="Contact"
                        toTarget="/contact"
                        onClick={handleClose}
                    />
                    {!isAuthenticated ? (
                        <NavLink
                            className="text-cyan-950 hover:text-cyan-600 active:text-cyan-600 font-bold text-lg mx-2"
                            to="/auth"
                            onClick={handleClose}
                        >
                            Sign In
                        </NavLink>
                    ) : (
                        <NavLink
                            className="text-cyan-950 hover:text-cyan-600 active:text-cyan-600 font-bold text-lg mx-2"
                            to="/auth"
                            onClick={handleLogout}
                        >
                            Logout
                        </NavLink>
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
