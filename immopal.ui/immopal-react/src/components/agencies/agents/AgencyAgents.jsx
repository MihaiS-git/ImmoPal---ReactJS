import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import AgentCard from "./AgentCard";

import { getAllAgencyAgents } from "../../../store/agents-slice.js";
import { selectAllAgencies } from "../../../store/agencies-slice.js";

export default function AgencyAgents({ className }) {
    const { id: agencyId } = useParams();
    const dispatch = useDispatch();
    const agencies = useSelector(selectAllAgencies);
    const agents = useSelector((state) => state.agents.agents);
    const loading = useSelector((state) => state.agents.loading);
    const agency = agencies.find((agency) => agency.id === +agencyId);

    useEffect(() => {
        if (agency?.agents?.length) {
            dispatch(getAllAgencyAgents(agency.agents));
        }
    }, [dispatch, agency]);

    if (loading) return <div>Loading...</div>;
    if (!agency) return <div>No agency found.</div>;
    if (!agents) return <div>No agents found.</div>;

    return (
        <div
            className={`${className} flex flex-col justify-around align-middle text-center mx-8 font-medium font-serif text-cyan-900 text-3xl`}
        >
            <div className="bg-cyan-200 rounded-3xl mb-10 w-64 sm:w-96 mx-auto">
                <h2>Agents</h2>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {agents.map((agent) => {
                    return (
                        <li key={agent.id} className="my-8">
                            <AgentCard agent={agent} />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
