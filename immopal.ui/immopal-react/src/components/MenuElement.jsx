import { NavLink } from "react-router-dom";

export default function MenuElement({title, toTarget, onClick}) {
    return (
        <li>
            <NavLink className="text-cyan-950 hover:text-cyan-600 active:text-cyan-600 font-bold text-lg mx-2" to={toTarget} onClick={onClick}>
                {title}
            </NavLink>
        </li>
    );
}
