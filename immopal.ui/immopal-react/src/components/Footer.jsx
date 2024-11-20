import { Link } from "react-router-dom";

export default function Footer() { 
    return (
        <footer className='fixed bottom-0 left-0 w-full text-base text-cyan-950 text-center bg-cyan-200 p-4 font-extrabold'>
            <p>
                <Link to="https://mihais-git.github.io/">Mihai Suciu @ 2024</Link>
            </p>
        </footer>
    );
}