import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { getPersonById } from "../../store/person-slice.js";
import { stompClient } from "../../util/auction-websocket-client.js";
import { connectStomp } from "../../store/bids-slice.js";
import { sendBid } from "../../util/auction-websocket-client.js";
import { addBid } from "../../store/bids-slice.js";

import { setBids } from "../../store/bids-slice.js";
import { selectAuctionRoomById } from "../../store/auction-rooms-slice.js";

export default function AuctionRoom() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id: auctionId } = useParams();
    const token = useSelector((state) => state.auth?.token);

    const auctionRoom = useSelector((state) =>
        selectAuctionRoomById(state, auctionId)
    );

    const bids = useSelector((state) => state.bids.bids);

    const [bidAmount, setBidAmount] = useState(0);

    const currentUser = useSelector((state) => state.auth?.user);
    const currentPersonId = currentUser?.personId;
    const currentPerson = useSelector((state) => state.person?.person);

    useEffect(() => {
        if (auctionRoom?.bids) {
            dispatch(setBids(auctionRoom.bids));
        }
    }, [auctionRoom, dispatch]);

    useEffect(() => {
        if (currentPersonId && !currentPerson) {
            dispatch(getPersonById(currentPersonId));
        }
    }, [currentPersonId, currentPerson, dispatch]);

    useEffect(() => {
        dispatch(connectStomp());

        let subscription;

        const subscribeToBids = () => {
            if (stompClient.connected) {
                return stompClient.subscribe(
                    `/topic/auction/${auctionId}/bids`,
                    (message) => {
                        const bid = JSON.parse(message.body);
                        dispatch(addBid(bid));
                    }
                );
            } else {
                stompClient.onConnect = () => {
                    return stompClient.subscribe(
                        `/topic/auction/${auctionId}/bids`,
                        (message) => {
                            const bid = JSON.parse(message.body);
                            dispatch(addBid(bid));
                        }
                    );
                };
                stompClient.activate();
            }
        };

        subscription = subscribeToBids();

        return () => {
            if (subscription && stompClient.connected) {
                subscription.unsubscribe();
            } else {
                console.warn(
                    "STOMP client not connected; no unsubscribe performed."
                );
            }
        };
    }, [auctionId, dispatch]);

    function handlePlaceBid(event) {
        event.preventDefault();

        if (!auctionId || !token || !currentPerson) {
            console.error("Cannot place bid: Missing required data");
            return;
        }

        const amount = parseFloat(bidAmount);
        if (isNaN(amount) || amount <= 0) {
            alert("Please enter a valid bid amount greater than 0");
            return;
        }

        if (amount <= auctionRoom.maxBidAmount) {
            alert(
                "The bid amount must be greater than the maximum existent bid."
            );
            return;
        }

        if (amount <= auctionRoom.startBidAmount) {
            alert(
                "The bid amount must be greater than the fixed starting bid amount."
            );
            return;
        }        

        const bidRequest = {
            id: null,
            auctionRoomId: auctionId,
            type: "BID",
            sender: {
                id: null,
                personId: currentPerson.personId,
                firstName: currentPerson.firstName,
                lastName: currentPerson.lastName,
                phoneNumber: currentPerson.phoneNumber,
                dateOfBirth: currentPerson.dateOfBirth,
                address: currentPerson.address,
                pictureUrl: currentPerson.pictureUrl,
                userId: currentUser.id,
                email: currentUser.email,
                auctions: [],
            },
            amount,
            timestamp: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
        };

        if (stompClient.connected) {
            sendBid(auctionId, bidRequest, token);
            setBidAmount(0);
        } else {
            console.error("Cannot place bid: STOMP client is not connected.");
            stompClient.activate();
            stompClient.onConnect = () => {
                sendBid(auctionId, bidRequest, token);
                setBidAmount(0);
            };
        }
    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(price);
    };

    const handleGoToProperty = () => {
        navigate(`/properties/${auctionRoom.property?.id}`);
    };

    return (
        <div className="flex flex-col xl:flex-row align-middle justify-center">
            <div
                className="border border-cyan-200 rounded-lg shadow-[2px_2px_6px] shadow-cyan-950 w-96 h-10/12 bg-cyan-900 hover:bg-cyan-700 m-4"
                onClick={handleGoToProperty}
            >
                <div className=" text-cyan-200 text-base flex flex-col justify-around align-middle mb-4">
                    <img
                        src={auctionRoom.property?.propertyImages[0]?.imageUrl}
                        alt="property image"
                        className="w-full h-full rounded-t-lg"
                    />
                </div>
                <div className="w-full text-cyan-200 text-center">
                    <h3 className="font-bold font-serif text-2xl mt-4">
                        {auctionRoom.property?.transactionType || "N/A"}
                    </h3>
                    <div className="font-normal font-serif mx-4">
                        <p className="text-base">
                            <strong>Description: </strong>
                            {auctionRoom.property?.propertyDetails?.description}
                        </p>
                    </div>
                </div>
                <hr className="border-cyan-200 mx-4 mb-4" />
                <div className="w-full text-cyan-200 text-base text-center mb-4">
                    <strong>Start: </strong>{" "}
                    {format(
                        new Date(auctionRoom.startDate),
                        "yyyy-MM-dd HH:mm:ss"
                    )}
                    <br />
                    <strong>End: </strong>{" "}
                    {format(
                        new Date(auctionRoom.endDate),
                        "yyyy-MM-dd HH:mm:ss"
                    )}
                </div>
                <hr className="border-cyan-200 mx-4 mb-4" />

                <div className="w-full text-cyan-200 text-base text-center mb-4">
                    <strong>Status: </strong> {auctionRoom.auctionStatus}
                </div>
                <hr className="border-cyan-200 mx-4 mb-4" />
                {!bids ? (
                    <div className="w-full text-cyan-200 text-base text-center mb-4">
                        <strong>Start price: </strong>{" "}
                        {formatPrice(auctionRoom.startBidAmount)}
                    </div>
                ) : (
                    <div className="w-full text-cyan-200 text-base text-center mb-4">
                        <strong>Current value: </strong>{" "}
                        {formatPrice(auctionRoom.maxBidAmount)}
                    </div>
                )}
            </div>
            <div className="border border-cyan-200 rounded-lg shadow-[2px_2px_6px] shadow-cyan-950 w-96 h-full bg-cyan-900 text-cyan-200 m-4">
                <section>
                    <ul>
                        {bids &&
                            bids.length > 0 &&
                            bids.slice(-10).map((bid, index) => (
                                <li
                                    key={index}
                                    className="border border-cyan-200 p-2"
                                >
                                    <strong>Bid:</strong>{" "}
                                    {formatPrice(bid.amount)} -{" "}
                                    <strong>By:</strong>{" "}
                                    {bid.sender?.firstName || "Unknown"}{" "}
                                    {bid.sender?.lastName || ""}
                                    <br />
                                    <small>
                                        <strong>Time:</strong>{" "}
                                        {format(
                                            new Date(bid.timestamp),
                                            "yyyy-MM-dd/HH:mm:ss"
                                        ) || "Unknown"}
                                    </small>
                                </li>
                            ))}

                        {(!bids || bids.length <= 0) && (
                            <p className="p-10 text-center text-lg">
                                No bids yet. Maybe place the first bid...
                            </p>
                        )}
                    </ul>
                </section>
            </div>
            <div className="border border-cyan-200 rounded-lg shadow-[2px_2px_6px] shadow-cyan-950 w-96 h-full bg-cyan-900 m-4">
                {auctionRoom.auctionStatus === "ACTIVE" ? (
                    <Form onSubmit={handlePlaceBid} className="p-2">
                        <label htmlFor="bidAmount" className="text-cyan-200">
                            Enter your bid amount:
                        </label>
                        <input
                            id="bidAmount"
                            name="bidAmount"
                            type="number"
                            value={bidAmount}
                            onChange={(e) => setBidAmount(e.target.value)}
                            placeholder="e.g., 100"
                            min="1"
                            required
                            className="rounded-lg m-4 p-2"
                        />
                        <button
                            type="submit"
                            className="bg-cyan-950 text-cyan-200 hover:bg-cyan-200 hover:text-cyan-950 m-4 p-2 rounded-lg"
                        >
                            Place Bid
                        </button>
                    </Form>
                ) : (
                    <div className="text-cyan-200 p-4">
                        <p>
                            <strong>WINNER: </strong>
                            {auctionRoom.winner}
                        </p>
                        <p>
                            <strong>BID: </strong>
                            {auctionRoom.maxBidAmount}
                        </p>
                        <p>
                            <strong>DATE: </strong>
                            {format(
                                auctionRoom.lastModifiedDate,
                                "yyyy-MM-dd HH:mm:ss"
                            )}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
