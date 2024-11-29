import { useState } from "react";
import { Form, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { format } from "date-fns";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import MapComponent from "../contact/MapComponent.jsx";
import { selectAuctionRoomById } from "../../store/auction-rooms-slice.js";

export default function AuctionRoom({ className }) {
    const [bid, setBid] = useState(0);
    const { id } = useParams();
    const auctionRoom = useSelector((state) =>
        selectAuctionRoomById(state, id)
    );

    const formattedStartDate = format(
        new Date(auctionRoom.startDate),
        "yyyy-MM-dd HH:mm:ss"
    );
    const formattedEndDate = format(
        new Date(auctionRoom.endDate),
        "yyyy-MM-dd HH:mm:ss"
    );

    function formatPrice(price) {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(price);
    }

    function handlePlaceBid(event) {
        event.preventDefault();
    }

    return (
        <div
            className={`${className} flex flex-col justify-around align-middle text-center text-cyan-950`}
        >
            <section className="flex flex-col 2xl:flex-row justify-around align-middle text-center mb-4">
                <div className="mx-auto md:me-4 mb-4">
                    <Swiper
                        modules={[Navigation, Pagination]}
                        navigation
                        pagination={{ clickable: true }}
                        className="w-80 h-80 sm:w-96 sm:h-96 md:w-96 md:h-96 lg:w-[400px] lg:h-[400px] xl:w-[500px] xl:h-[500px] rounded-lg"
                    >
                        {auctionRoom.property.propertyImages.map(
                            (image, index) => (
                                <SwiperSlide key={index}>
                                    <img
                                        src={image.imageUrl}
                                        alt={`Property Image ${index + 1}`}
                                        className="w-full h-auto object-contain rounded-lg"
                                    />
                                </SwiperSlide>
                            )
                        )}
                    </Swiper>
                </div>
                <div className="mx-auto md:me-4">
                    <MapComponent
                        lat={auctionRoom.property.address.latitude}
                        long={auctionRoom.property.address.longitude}
                    />
                </div>
                <div className="w-full">
                    <h3 className="font-bold font-serif text-xl md:text-2xl lg:text-3xl mt-4">
                        {auctionRoom.property.transactionType}
                    </h3>

                    <hr className="border-cyan-950 mx-4 mb-4" />
                    <div className="font-normal font-serif mx-4 md:text-lg">
                        <p>
                            <h3>
                                <strong>Description</strong>
                            </h3>
                            {auctionRoom.property.propertyDetails.description}
                        </p>
                    </div>

                    <hr className="border-cyan-950 mx-4 mb-4" />
                    <div className="font-normal font-serif mx-4 md:text-lg">
                        <h3><strong>Address</strong></h3>
                        <p className="flex flex-col justify-center align-middle">
                            {auctionRoom.property.address.streetNo},{" "}
                            {auctionRoom.property.address.street},{" "}
                            {auctionRoom.property.address.neighborhood},{" "}
                            {auctionRoom.property.address.city},{" "}
                            {auctionRoom.property.address.state},{" "}
                            {auctionRoom.property.address.country}, <br></br>
                        </p>
                    </div>

                    <hr className="border-cyan-950 mx-4 mb-4" />
                    <div className="font-normal font-serif mx-4 mb-4 md:text-base">
                        <h3>
                            <strong>Details</strong>
                        </h3>
                        <p>
                            <strong>Carpet Area: </strong>
                            {auctionRoom.property.propertyDetails.carpetArea}
                        </p>
                        <p>
                            <strong>Built Up Area: </strong>
                            {auctionRoom.property.propertyDetails.builtUpArea}
                        </p>
                        <p>
                            <strong>Comfort Type: </strong>
                            {auctionRoom.property.propertyDetails.comfortType}
                        </p>
                        <p>
                            <strong>Floor: </strong>
                            {auctionRoom.property.propertyDetails.floor}
                        </p>
                        <p>
                            <strong>Structure Type: </strong>
                            {auctionRoom.property.propertyDetails.structureType}
                        </p>
                        <p>
                            <strong>Year of construction: </strong>
                            {
                                auctionRoom.property.propertyDetails
                                    .yearOfConstruction
                            }
                        </p>
                        <p>
                            <strong>Bath No: </strong>
                            {auctionRoom.property.propertyDetails.bathNo}
                        </p>
                        <p>
                            <strong>Kitchen No: </strong>
                            {auctionRoom.property.propertyDetails.kitchenNo}
                        </p>
                        <p>
                            <strong>Bedroom No: </strong>
                            {auctionRoom.property.propertyDetails.bedroomNo}
                        </p>
                        {auctionRoom.property.propertyDetails.parkingNo && (
                            <p>
                                <strong>Parking No: </strong>
                                {auctionRoom.property.propertyDetails.parkingNo}
                            </p>
                        )}
                        {auctionRoom.property.propertyDetails.balcony && (
                            <p>
                                <strong>Balcony: </strong>
                                YES
                            </p>
                        )}
                        {auctionRoom.property.propertyDetails.terrace && (
                            <p>
                                <strong>Terrace: </strong>
                                YES
                            </p>
                        )}
                        {auctionRoom.property.propertyDetails.swimmingPool && (
                            <p>
                                <strong>Swimming Pool: </strong>
                                YES
                            </p>
                        )}
                        <p>
                            <strong>Energetic Certificate: </strong>
                            {
                                auctionRoom.property.propertyDetails
                                    .energeticCertificate
                            }
                        </p>
                    </div>
                </div>
            </section>

            <hr className="border-cyan-950 mx-4 mb-4" />

            <section>
                <div className="mb-4">
                    <strong>Agent: </strong> {auctionRoom.agent.firstName}{" "}
                    {auctionRoom.agent.lastName} <br />
                    <strong>Phone: </strong> {auctionRoom.agent.phoneNumber}
                </div>
            </section>
            <hr className="border-cyan-950 mx-4 mb-4" />

            <section>
                <div className="mb-4">
                    <strong>Agency: {auctionRoom.agency.name}</strong>
                </div>
            </section>
            <hr className="border-cyan-950 mx-4 mb-4" />

            <section>
                <div className="mb-4">
                    <strong>Start: </strong> {formattedStartDate}
                    <br />
                    <strong>End: </strong> {formattedEndDate}
                </div>
            </section>
            <hr className="border-cyan-950 mx-4 mb-4" />

            <section>
                <div className="mb-4">
                    <strong>Status: </strong> {auctionRoom.auctionStatus}
                </div>
            </section>
            <hr className="border-cyan-950 mx-4 mb-4" />

            <section>
                <div className="mb-4">
                    <strong>Starting bid: </strong>{" "}
                    {formatPrice(auctionRoom.startBidAmount)}
                </div>
            </section>
            <hr className="border-cyan-950 mx-4 mb-4" />

            {!auctionRoom.winner && (
                <section className="w-96 mx-auto">
                    <Form
                        className="w-full flex flex-col justify-center align-middle bg-cyan-300 p-4 md:px-8 mb-4 rounded-lg"
                        onSubmit={handlePlaceBid}
                    >
                        <label htmlFor="bid"></label>
                        <input
                            id="bid"
                            name="bid"
                            type="number"
                            onChange={(e) => setBid(e.target.value)}
                            className="mx-auto my-2 p-2 text-lg text-right rounded-lg"
                        />

                        <button
                            type="submit"
                            className="bg-cyan-950 hover:bg-cyan-700 text-cyan-200 text-lg m-2 p-4 rounded-lg"
                        >
                            Place your bid
                        </button>
                    </Form>
                </section>
            )}

            <hr className="border-cyan-950 mx-4 mb-4" />
            {auctionRoom.winner && (
                <div>
                    <strong>WINNER: </strong> {auctionRoom.winner.firstName}{" "}
                    {auctionRoom.winner.lastName} <strong>BID: </strong>
                    {auctionRoom.winningBid} <strong>DATE: </strong>
                    {auctionRoom.lastModifiedDate}{" "}
                </div>
            )}
        </div>
    );
}
