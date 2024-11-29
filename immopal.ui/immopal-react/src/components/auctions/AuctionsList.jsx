import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAuctionRooms } from "../../store/auction-rooms-slice.js";
import AuctionRoomCard from "./AuctionRoomCard.jsx";

export default function AuctionsList({ className }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllAuctionRooms());
    }, [dispatch]);

    const { auctionRooms, loading, error } = useSelector(
        (state) => state.auctionRooms
    );

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
                <h2>Auctions</h2>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {auctionRooms &&
                    (auctionRooms || []).map((auction) => {
                        return (
                            <li key={auction.id} className="my-8">
                                <AuctionRoomCard auctionRoom={auction} />
                            </li>
                        );
                    })}
            </ul>
            {!auctionRooms && (
                <p>No auction room found. Please try again later.</p>
            )}
        </div>
    );
}
