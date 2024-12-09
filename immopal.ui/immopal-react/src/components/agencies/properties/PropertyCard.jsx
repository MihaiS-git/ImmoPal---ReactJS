import { useNavigate } from "react-router-dom";

export default function PropertyCard({ property }) { 
    const navigate = useNavigate();

    function formatPrice(price) {
        return new Intl.NumberFormat('en-US', {
            style: "currency",
            currency: "USD"
        }).format(price);
    }

    function handleClick() { 
        navigate(`/properties/${property.id}`);
    }

    return (
        <div
            className="border border-cyam-200 rounded-lg shadow-[2px_2px_6px] shadow-cyan-950 h-full text-clip bg-cyan-900"
            onClick={handleClick}
        >
            <img
                src={property.propertyImages[0]}
                alt="Property Image"
                className="w-full object-cover rounded-t-lg"
            />
            <h3 className="font-semibold m-2 text-cyan-400 text-sm md:text-md lg:text-lg">
                {property.transactionType}
            </h3>
            <hr className="border border-cyan-200 mx-4" />
            <p className="text-base text-cyan-400 my-2 mx-4 sm:text-sm">
                {property.propertyDetails.description}
            </p>
            <hr className="border border-cyan-200 mx-4" />
            <p className="text-base text-cyan-400 my-2 mx-4 sm:text-sm">
                <strong>Starting Price: </strong>{formatPrice(property.price)}
            </p>
        </div>
    );
}