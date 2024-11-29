import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

export default function AuctionRoomCard({ auctionRoom }) {
    const navigate = useNavigate();

    const formattedStartDate = format(new Date(auctionRoom.startDate), "yyyy-MM-dd HH:mm:ss");
    const formattedEndDate = format(new Date(auctionRoom.endDate), "yyyy-MM-dd HH:mm:ss");

    function formatPrice(price) {
        return new Intl.NumberFormat('en-US', {
            style: "currency",
            currency: "USD"
        }).format(price);
    }

    const formattedStartBid = formatPrice(auctionRoom.startBidAmount);

    function handleClick() {
        navigate(`/auctions/${auctionRoom?.id}`);
    }

    return (
        <div
            className="border border-cyam-200 rounded-lg shadow-[2px_2px_6px] shadow-cyan-950 h-full bg-cyan-900 hover:bg-cyan-700"
            onClick={handleClick}
        >
            <section className="flex flex-col justify-around align-middle mb-4">
                <div className="mx-auto text-cyan-200 text-base">
                    <img
                        src={auctionRoom.property.propertyImages[0].imageUrl}
                        alt="property image"
                        className="w-full h-full rounded-t-lg"
                    />
                </div>

                <div className="w-full text-cyan-200 ">
                    <h3 className="font-bold font-serif text-2xl mt-4">
                        {auctionRoom.property.transactionType}
                    </h3>
                    <div className="font-normal font-serif mx-4">
                        <p className="text-base">
                            <strong>Description: </strong>
                            {auctionRoom.property.propertyDetails.description}
                        </p>
                    </div>
                </div>
            </section>
            <hr className="border-cyan-200 mx-4 mb-4" />

            <div className="w-full text-cyan-200 text-base mb-4">
                <strong>Start: </strong> {formattedStartDate}<br/>
                <strong>End: </strong> {formattedEndDate}
            </div>
            <hr className="border-cyan-200 mx-4 mb-4" />

            <div className="w-full text-cyan-200 text-base  mb-4">
                <strong>Status: </strong> {auctionRoom.auctionStatus}
            </div>
            <hr className="border-cyan-200 mx-4 mb-4" />

            <div className="w-full text-cyan-200 text-base  mb-4">
                <strong>Starting bid: </strong> {formattedStartBid}
            </div>
        </div>
    );
}
