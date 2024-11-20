import { Link } from "react-router-dom";
import MainNavigation from "./MainNavigation";
import Hamburger from "./Hamburger.jsx";

export default function Header() {
    return (
        <header className="fixed top-0 left-0 w-full bg-cyan-200 z-10 flex justify-between align-middle">
            <Link to="/home">
                <h1 className="w-full py-6 px-8 font-bold text-cyan-950 hover:text-cyan-600 text-2xl sm:text-3xl lg:text-4xl">
                    ImmoPal
                </h1>
            </Link>
            <MainNavigation />
            <Hamburger />
        </header>
    );
}
