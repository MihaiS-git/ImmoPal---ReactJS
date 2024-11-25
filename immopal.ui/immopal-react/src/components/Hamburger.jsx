import { useState } from "react";
import HamburgerMenu from "./HamburgerMenu.jsx";

export default function Hamburger() {
    const [isOpen, setIsOpen] = useState(false);

    function toggleHamburger() {
        setIsOpen(!isOpen);
    }

    function closeMenu() {
        setIsOpen(false);
    }

    return (
        <>
            {!isOpen && (
                <div
                    className="p-2 w-8 h-8 mt-4 me-4 space-y-1 sm:px-2 sm:py-3 sm:w-12 sm:h-12 sm:mt-4 sm:me-4 sm:space-y-2 bg-cyan-950 rounded shadow xl:hidden"
                    onClick={toggleHamburger}
                >
                    <span className="block w-4 sm:w-8 h-0.5 bg-cyan-200 animate-pulse"></span>
                    <span className="block w-4 sm:w-8 h-0.5 bg-cyan-200 animate-pulse"></span>
                    <span className="block w-4 sm:w-8 h-0.5 bg-cyan-200 animate-pulse"></span>
                </div>
            )}
            {isOpen && (
                <HamburgerMenu openState={isOpen} handleClose={closeMenu} />
            )}
        </>
    );
}
