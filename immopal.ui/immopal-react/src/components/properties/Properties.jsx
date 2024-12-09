import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProperties } from "../../store/properties-slice.js";

import PropertyCard from "../agencies/properties/PropertyCard.jsx";

export default function Properties({ className }) {
    const dispatch = useDispatch();
    
    const loading = useSelector((state) => state.properties.loading);
    const properties = useSelector((state) => state.properties.properties);
    
    useEffect(() => {
        dispatch(getAllProperties());
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;
    if (!properties || properties.length === 0) return <div>No properties found.</div>;

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
