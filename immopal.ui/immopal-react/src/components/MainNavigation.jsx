import { useSelector } from "react-redux";
import MenuElement from "./MenuElement.jsx";

export default function MainNavigation() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

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
                    <MenuElement title="Sign In" />
                ) : (
                    <MenuElement title="Logout" />
                )}
            </ul>
        </nav>
    );
}
