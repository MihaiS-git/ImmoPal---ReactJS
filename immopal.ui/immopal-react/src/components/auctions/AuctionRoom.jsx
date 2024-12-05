import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, useParams } from "react-router-dom";
import { format } from "date-fns";
import { getPersonById } from "../../store/person-slice.js";
import { stompClient } from "../../util/auction-websocket-client.js";
import { connectStomp } from "../../store/bids-slice.js";
import { sendBid } from "../../util/auction-websocket-client.js";
import { addBid } from "../../store/bids-slice.js";

import { setBids } from "../../store/bids-slice.js";
import { selectAuctionRoomById } from "../../store/auction-rooms-slice.js";

export default function AuctionRoom() {
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
        if (currentPersonId) {
            dispatch(getPersonById(currentPersonId));
        }
    }, [currentPersonId, dispatch]);

    useEffect(() => {
        console.log("AuctionRoom component mounted");
        dispatch(connectStomp());

        const subscribeToBids = () => {
            if (stompClient.connected) {
                console.log("WebSocket connected, subscribing...");
                return stompClient.subscribe(
                    `/topic/auction/${auctionId}/bids`,
                    (message) => {
                        console.log("Received: ", message.body);
                        const bid = JSON.parse(message.body);
                        dispatch(addBid(bid));
                    }
                );
            } else {
                console.log("Waiting for WebSocket connection...");
                stompClient.onConnect = () => {
                    console.log("WebSocket connected, subscribing...");
                    return stompClient.subscribe(
                        `/topic/auction/${auctionId}/bids`,
                        (message) => {
                            console.log("Received: ", message.body);
                            const bid = JSON.parse(message.body);
                            dispatch(addBid(bid));
                        }
                    );
                };
            }
        };

        const subscription = subscribeToBids();

        return () => {
            if (stompClient && stompClient.connected) {
                subscription.unsubscribe();
                console.log("Unsubscribed from room:", auctionId);
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

    return (
        <div className="flex flex-col xl:flex-row align-middle justify-center">
            <div className="border border-cyan-200 rounded-lg shadow-[2px_2px_6px] shadow-cyan-950 w-96 h-full bg-cyan-900 m-4">
                <section className="flex flex-col justify-around align-middle mb-4">
                    <div className="text-cyan-200 text-base">
                        <img
                            src={
                                auctionRoom.property.propertyImages[0].imageUrl
                            }
                            alt="property image"
                            className="w-full h-full rounded-t-lg"
                        />
                    </div>
                    <div className="w-full text-cyan-200 text-center">
                        <h3 className="font-bold font-serif text-2xl mt-4">
                            {auctionRoom.property.transactionType}
                        </h3>
                        <div className="font-normal font-serif mx-4">
                            <p className="text-base">
                                <strong>Description: </strong>
                                {
                                    auctionRoom.property.propertyDetails
                                        .description
                                }
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
                </section>
            </div>
            <div className="border border-cyan-200 rounded-lg shadow-[2px_2px_6px] shadow-cyan-950 w-96 h-full bg-cyan-900 text-cyan-200 m-4 p-4">
                <section>
                    <ul>
                        {bids &&
                            bids.length > 0 &&
                            bids.slice(-10).map((bid, index) => (
                                <li key={index}>
                                    <p>#{index + 1}</p>
                                    <strong>Bid:</strong> {bid.amount} -{" "}
                                    <strong>By:</strong>{" "}
                                    {bid.sender?.firstName || "Unknown"}{" "}
                                    {bid.sender?.lastName || ""}
                                    <br />
                                    <small>
                                        <strong>Time:</strong>{" "}
                                        {bid.timestamp || "Unknown"}
                                    </small>
                                </li>
                            ))}

                        {(!bids || bids.length <= 0) && <p>No bids yet...</p>}
                    </ul>
                </section>
            </div>
            <div className="border border-cyan-200 rounded-lg shadow-[2px_2px_6px] shadow-cyan-950 w-96 h-full bg-cyan-900 m-4">
                <Form onSubmit={handlePlaceBid} className="p-2">
                    <label htmlFor="bidAmount" className="text-cyan-200">
                        Enter your bid amount:
                    </label>
                    <input
                        id="bidAmount"
                        name="bidAmount"
                        type="number"
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
            </div>
        </div>
    );
}
