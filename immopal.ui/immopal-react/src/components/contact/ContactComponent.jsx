import MapComponent from "./MapComponent";

export default function ContactComponent({ className }) { 
    return (
        <div
            className={`${className} flex flex-col justify-around align-middle text-center mt-2 font-medium font-serif text-cyan-900 text-3xl`}
        >
            <div className="bg-cyan-200 rounded-3xl mb-10 w-64 sm:w-96 mx-auto">
                <h2>Contact</h2>
            </div>
            <MapComponent />
            <div className="my-8 py-4 px-2 bg-cyan-200 rounded-xl w-64 sm:w-96 mx-auto">
                <p className="text-lg">
                    <strong>Adress: </strong>CJ, RO
                </p>
                <p className="text-lg">
                    <strong>Phone: </strong>1234567890
                </p>
                <p className="text-lg">
                    <strong>Email: </strong>office@immopal.com
                </p>
            </div>
        </div>
    );
}