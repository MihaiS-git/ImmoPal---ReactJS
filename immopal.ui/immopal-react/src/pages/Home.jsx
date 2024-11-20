import PageContent from "../components/PageContent";

export default function Home() {
    return (
        <PageContent className="flex items-center justify-center h-screen w-full">
            <h3 className="text-5xl text-cyan-950 bg-cyan-200 rounded-3xl p-4 font-extrabold opacity-80">
                Welcome to ImmoPal!
            </h3>
        </PageContent>
    );
}
