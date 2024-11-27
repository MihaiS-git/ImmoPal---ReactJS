import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAgencies } from "../../store/agencies-slice.js";
import AgencyCard from "./AgencyCard.jsx";

export default function AgenciesList({ className }) {
    const dispatch = useDispatch();
    const agencies = useSelector((state) => state.agencies.agencies);
    console.log("Agencies in state:", agencies);
    
    const { loading, error } = useSelector((state) => state.agencies);

    useEffect(() => {
        dispatch(getAllAgencies());
    }, [dispatch]);
    console.log("Loading:", loading, "Error:", error);

    if (loading) {
        return (
            <div className="flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-cyan-400 border-dotted rounded-full animate-spin"></div>
                <p className="ml-4 text-lg text-cyan-900 font-bold">
                    Loading...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-cyan-400 border-dotted rounded-full animate-spin"></div>
                <p className="ml-4 text-lg text-cyan-900 font-bold">
                    {error} Please try again later.
                </p>
            </div>
        );
    }

    return (
        <div
            className={`${className} flex flex-col justify-around align-middle text-center mx-8 font-medium font-serif text-cyan-900 text-3xl`}
        >
            <div className="bg-cyan-200 rounded-3xl mb-10 w-64 sm:w-96 mx-auto">
                <h2>Agencies</h2>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {agencies.map((agency) => {
                    return (
                        <li key={agency.id} className="my-8">
                            <AgencyCard agency={agency} />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
