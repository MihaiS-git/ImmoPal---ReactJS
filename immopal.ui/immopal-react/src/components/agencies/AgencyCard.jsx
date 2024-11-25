import { useNavigate } from "react-router-dom";

export default function AgencyCard({ agency }) {
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/agencies/${agency.id}`);
    }

    return (
        <div
            className="border border-cyam-200 rounded-lg shadow-[2px_2px_6px] shadow-cyan-950 h-full text-clip bg-cyan-900"
            onClick={handleClick}
        >
            <img
                src={agency.logoUrl}
                alt={agency.name}
                className="w-full object-cover rounded-t-lg"
            />
            <h3 className="font-semibold m-2 text-cyan-400 text-sm md:text-md lg:text-lg">
                {agency.name}
            </h3>
            <hr className="border border-cyan-200 mx-4"/>
            <p className="text-base text-cyan-400 my-2 mx-4 sm:text-sm">
                {agency.description}
            </p>
        </div>
    );
}
