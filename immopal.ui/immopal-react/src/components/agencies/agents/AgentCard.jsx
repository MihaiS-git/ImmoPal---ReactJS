import { NavLink } from "react-router-dom";

export default function AgentCard({ agent }) {
    return (
        <div className="border border-cyam-200 rounded-lg shadow-[2px_2px_6px] shadow-cyan-950 h-full text-clip bg-cyan-900">
            <img
                src={agent.pictureUrl}
                alt={`${agent.firstName} ${agent.lastName}`}
                className="w-full object-cover rounded-t-lg"
            />
            <h3 className="font-semibold m-2 text-cyan-400 text-sm md:text-md lg:text-lg">
                {agent.firstName} {agent.lastName}
            </h3>
            <hr className="border border-cyan-200 mx-4" />
            <p className="text-base text-cyan-400 my-2 mx-4 sm:text-sm">
                <strong>Phone: </strong>
                {agent.phoneNumber}
            </p>
            <div className="m-4">
                <NavLink
                    className="border border-cyan-400 text-cyan-400 hover:bg-cyan-200 hover:text-cyan-950 md:text-lg rounded-lg p-2"
                    to="/home"
                >
                    Properties
                </NavLink>
            </div>
        </div>
    );
}
