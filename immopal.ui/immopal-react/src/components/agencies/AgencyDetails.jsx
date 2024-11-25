import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { selectAgencyById } from "../../store/agencies-slice";

export default function AgencyDetails({ className }) {
    const { id } = useParams();

    const agency = useSelector((state) => selectAgencyById(state, Number(id)));

    return (
        <div
            className={`${className} flex flex-col justify-around align-middle text-center text-cyan-950`}
        >
            <section className="flex flex-col md:flex-row justify-around align-middle text-center mb-4">
                <div className="me-4">
                    <img
                        src={agency.logoUrl}
                        alt={agency.name}
                        className="w-full md:w-96 rounded-lg mb-4"
                    />
                </div>
                <div className="w-full md:w-96">
                    <h1 className="font-bold font-serif text-xl md:text-2xl lg:text-3xl">
                        {agency.name}
                    </h1>
                    <hr className="border-cyan-950 mx-4 mb-4" />
                    <p className="font-normal font-serif mx-4 md:text-lg">
                        {agency.description} Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. Tempora aut maxime,
                        praesentium distinctio unde nobis adipisci non commodi
                        consequuntur beatae reiciendis laudantium dicta, sequi
                        dolorum ullam, obcaecati culpa libero blanditiis!
                    </p>
                    <hr className="border-cyan-950 mx-4 mb-4" />
                    <p>
                        <strong>Phone:</strong>{agency.phone}
                    </p>
                    <p>
                        <strong>E-mail:</strong>{agency.email}
                    </p>
                    <p>
                        <strong>Address: </strong>{agency.address.city}, {agency.address.country}
                    </p>
                </div>
            </section>
            <section>
                <div className="flex justify-around">
                    <NavLink
                        className="border border-cyan-950 text-cyan-950 hover:bg-cyan-900 hover:text-cyan-200 md:text-lg rounded-lg p-2"
                        to={`/agencies/${agency.id}/agents`}
                    >
                        Agents
                    </NavLink>
                    <NavLink
                        className="border border-cyan-950 text-cyan-950 hover:bg-cyan-900 hover:text-cyan-200 md:text-lg rounded-lg p-2"
                        to="/home"
                    >
                        Properties
                    </NavLink>
                </div>
            </section>
        </div>
    );
}
