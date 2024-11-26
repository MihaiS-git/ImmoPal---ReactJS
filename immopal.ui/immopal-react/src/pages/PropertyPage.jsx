import PageContent from '../components/PageContent.jsx';
import PropertyDetails from '../components/agencies/properties/PropertyDetails.jsx'

export default function PropertyPage() { 
    return (
        <PageContent  className="flex flex-col items-center justify-center mx-auto my-20 px-6 py-8 w-11/12 bg-cyan-200 bg-opacity-50 rounded-xl">
            <PropertyDetails/>
        </PageContent>
    );
}