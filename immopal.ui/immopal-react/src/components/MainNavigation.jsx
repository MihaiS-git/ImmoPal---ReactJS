import { useDispatch, useSelector } from "react-redux";
import MenuElement from "./MenuElement.jsx";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/auth-slice.js";

export default function MainNavigation() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    function handleLogout() {
        dispatch(logout());
        navigate("/auth");
    }

    return (
        <nav className="hidden lg:hidden xl:block">
            <ul className="flex justify-around align-middle py-8 px-8">
                <MenuElement title="Agencies" />
                <MenuElement title="Properties" />
                <MenuElement title="Agencies" />
                <MenuElement title="Chat" />
                <MenuElement title="Account" />
                <MenuElement title="Contact" />
                {!isAuthenticated ? (
                    <MenuElement title="Sign In" toTarget={"/auth"} />
                ) : (
                    <button className="text-cyan-950 hover:text-cyan-600 active:text-cyan-600 font-bold text-lg mx-2" onClick={handleLogout}>Logout</button>
                )}
            </ul>
        </nav>
    );
}
