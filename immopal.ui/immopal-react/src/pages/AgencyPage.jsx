import PageContent from "../components/PageContent";
import AgencyDetails from "../components/agencies/AgencyDetails";

export default function AgencyPage() { 
    return (
        <PageContent className="flex flex-col items-center justify-center mx-auto my-24 px-6 py-8 w-11/12 xl:w-6/12 bg-cyan-200 bg-opacity-50 rounded-xl">
            <AgencyDetails/>
        </PageContent>
    );
}