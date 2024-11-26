import { NavLink } from "react-router-dom";

export default function PropertyDetails({ className, property }) {
    return (
        <div
            className={`${className} flex flex-col justify-around align-middle text-center text-cyan-950`}
        >
            <section className="flex flex-col md:flex-row justify-around align-middle text-center mb-4">
                <div className="me-4">
                    <img
                        src={property.propertyImages[0]}
                        alt="Property Image"
                        className="w-full md:w-96 rounded-lg mb-4"
                    />
                </div>
                <div className="w-full md:w-96">
                    <h3 className="font-bold font-serif text-xl md:text-2xl lg:text-3xl">
                        {property.transactionType}
                    </h3>

                    <hr className="border-cyan-950 mx-4 mb-4" />
                    <div className="font-normal font-serif mx-4 md:text-lg">
                        <p>
                            <strong>Description: </strong>
                            {property.propertyDetails.description}
                        </p>
                    </div>

                    <hr className="border-cyan-950 mx-4 mb-4" />
                    <div className="font-normal font-serif mx-4 md:text-lg">
                        <p>
                            <strong>Address: </strong>
                            {property.address.streetNo},
                            {property.address.street},
                            {property.address.neighborhood}
                            {property.address.city}, {property.address.state},
                            {property.address.country}
                            Lat: {property.address.latitude}, Long:
                            {property.address.longitude}
                        </p>
                    </div>

                    <hr className="border-cyan-950 mx-4 mb-4" />
                    <div className="font-normal font-serif mx-4 md:text-lg">
                        <p>
                            <strong>Carpet Area: </strong>
                            {property.propertyDetails.carpetArea}
                        </p>
                        <p>
                            <strong>Built Up Area: </strong>
                            {property.propertyDetails.builtUpArea}
                        </p>
                        <p>
                            <strong>Comfort Type: </strong>
                            {property.propertyDetails.comfortType}
                        </p>
                        <p>
                            <strong>Floor: </strong>
                            {property.propertyDetails.floor}
                        </p>
                        <p>
                            <strong>Structure Type: </strong>
                            {property.propertyDetails.structureType}
                        </p>
                        <p>
                            <strong>Year of construction: </strong>
                            {property.propertyDetails.yearOfConstruction}
                        </p>
                        <p>
                            <strong>Bath No: </strong>
                            {property.propertyDetails.bathNo}
                        </p>
                        <p>
                            <strong>Kitchen No: </strong>
                            {property.propertyDetails.kitchenNo}
                        </p>
                        <p>
                            <strong>Bedroom No: </strong>
                            {property.propertyDetails.bedroomNo}
                        </p>
                        {property.propertyDetails.parkingNo && (
                            <p>
                                <strong>Parking No: </strong>
                                {property.propertyDetails.parkingNo}
                            </p>
                        )}
                        {property.propertyDetails.balcony && (
                            <p>
                                <strong>Balcony: </strong>
                                {property.propertyDetails.balcony}
                            </p>
                        )}
                        {property.propertyDetails.terrace && (
                            <p>
                                <strong>Terrace: </strong>
                                {property.propertyDetails.terrace}
                            </p>
                        )}
                        {property.propertyDetails.swimmingPool && (
                            <p>
                                <strong>Swimming Pool: </strong>
                                {property.propertyDetails.swimmingPool}
                            </p>
                        )}
                        <p>
                            <strong>Energetic Certificate: </strong>
                            {property.propertyDetails.energeticCertificate}
                        </p>
                    </div>
                    <NavLink
                        className="border border-cyan-950 text-cyan-950 hover:bg-cyan-900 hover:text-cyan-200 md:text-lg rounded-lg p-2"
                        to={`/home`}
                    >
                        To Auction
                    </NavLink>
                </div>
            </section>
        </div>
    );
}
