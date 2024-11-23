import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAgecies } from "../../store/agencies-slice";
import AgencyCard from "./AgencyCard.jsx";

export default function AgenciesList({ className }) {
    const dispatch = useDispatch();
    const { agencies, loading, error } = useSelector((state) => state.agencies);

    useEffect(() => {
        dispatch(getAllAgecies());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="bg bg-cyan-400 rounded-lg p-2 text-red-700 text-center font-bold text-lg mb-4">
                <p>Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg bg-cyan-400 rounded-lg p-2 text-red-700 text-center font-bold text-lg mb-4">
                {error}
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
                    return <AgencyCard key={agency.id} agency={agency} />;
                })}
            </ul>
        </div>
    );
}
