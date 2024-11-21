export default function FormInputElement({ title, id, type, value, onChange }) {
    return (
        <p className="flex flex-col justify-start align-middle w-full p-2">
            <label
                htmlFor={id}
                className="w-full text-base text-cyan-950 font-bold py-1"
            >
                {title}
            </label>
            <input
                type={type}
                id={id}
                value={value}
                onChange={(e) => onChange(e)}
                className="w-full p-1 text-base rounded-md focus:bg-cyan-100"
                required
            />
        </p>
    );
}
