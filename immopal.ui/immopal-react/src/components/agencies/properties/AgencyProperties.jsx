import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import PropertyCard from "./PropertyCard.jsx";

import { selectAllAgencies } from "../../../store/agencies-slice";
import { getPropertiesByAgency } from "../../../store/agency-properties-slice.js";

export default function AgencyProperties({ className }) {
    const { id: agencyId } = useParams();
    const dispatch = useDispatch();
    const agencies = useSelector(selectAllAgencies);
    const agency = agencies.find((agency) => agency.id === +agencyId);
    const properties = useSelector((state) => state.propertiesByAgency.properties);
    const loading = useSelector((state) => state.propertiesByAgency.loading);

    useEffect(() => {
        if (agency.properties?.length) {
            dispatch(getPropertiesByAgency(agency.properties));
        }
    }, [dispatch, agency]);

    if (loading) return <div>Loading...</div>;
    if (!agency) return <div>No agency found.</div>;
    if (!properties) return <div>No properties found.</div>;

    return (
        <div
            className={`${className} flex flex-col justify-around align-middle text-center mx-8 font-medium font-serif text-cyan-900 text-3xl`}
        >
            <div className="bg-cyan-200 rounded-3xl mb-10 w-64 sm:w-96 mx-auto">
                <h2>Properties</h2>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {properties.map((property) => {
                    return (
                        <li key={property.id} className="my-8">
                            <PropertyCard property={property} />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
