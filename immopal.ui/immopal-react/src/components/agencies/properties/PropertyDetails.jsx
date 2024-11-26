import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import MapComponent from "../../contact/MapComponent.jsx";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation, Pagination } from 'swiper/modules';

export default function PropertyDetails({ className }) {
    const { id } = useParams();
    const properties = useSelector(
        (state) => state.propertiesByAgency.properties
    );
    const property = properties.find((property) => property.id === +id);

    return (
        <div
            className={`${className} flex flex-col justify-around align-middle text-center text-cyan-950`}
        >
            <section className="flex flex-col md:flex-row justify-around align-middle text-center mb-4">
                <div className="mx-auto md:me-4">
{/*                     <img
                        src={property.propertyImages[0]}
                        alt="Property Image"
                        className="w-80 h-80 sm:w-96 sm:h-96 md:w-96 md:h-96 lg:w-[400px] lg:h-[400px] xl:w-[500px] xl:h-[500px] rounded-lg mb-4 object-contain"
                    /> */}
                    <Swiper
                        modules={[Navigation, Pagination]}
                        navigation
                        pagination={{ clickable: true }}
                        className="w-80 h-80 sm:w-96 sm:h-96 md:w-96 md:h-96 lg:w-[400px] lg:h-[400px] xl:w-[500px] xl:h-[500px] rounded-lg"
                    >
                        {property.propertyImages.map((image, index) => (
                            <SwiperSlide key={index}>
                                <img
                                    src={image}
                                    alt={`Property Image ${index + 1}`}
                                    className="w-full h-auto object-contain rounded-lg"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className="mx-auto md:me-4">
                    <MapComponent
                        lat={property.address.latitude}
                        long={property.address.longitude}
                    />
                </div>
                <div className="w-full md:w-96">
                    <h3 className="font-bold font-serif text-xl md:text-2xl lg:text-3xl mt-4">
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
                        <p className="flex flex-col justify-center align-middle">
                            <strong>Address: </strong>
                            {property.address.streetNo},{" "}
                            {property.address.street},{" "}
                            {property.address.neighborhood},{" "}
                            {property.address.city}, {property.address.state},{" "}
                            {property.address.country}, <br></br>
                        </p>
                    </div>

                    <hr className="border-cyan-950 mx-4 mb-4" />
                    <div className="font-normal font-serif mx-4 mb-4 md:text-base">
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
                                YES
                            </p>
                        )}
                        {property.propertyDetails.terrace && (
                            <p>
                                <strong>Terrace: </strong>
                                YES
                            </p>
                        )}
                        {property.propertyDetails.swimmingPool && (
                            <p>
                                <strong>Swimming Pool: </strong>
                                YES
                            </p>
                        )}
                        <p>
                            <strong>Energetic Certificate: </strong>
                            {property.propertyDetails.energeticCertificate}
                        </p>
                    </div>
                    <NavLink
                        className="border border-cyan-950 text-cyan-950 hover:bg-cyan-900 hover:text-cyan-200 md:text-lg rounded-lg m-4 p-2"
                        to={`/home`}
                    >
                        To Auction
                    </NavLink>
                </div>
            </section>
        </div>
    );
}
