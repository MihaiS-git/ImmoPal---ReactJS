import PageContent from '../components/PageContent.jsx';
import ContactComponent from '../components/contact/ContactComponent.jsx';

export default function ContactPage() {
    return (
        <PageContent className="flex flex-col items-center justify-center mx-auto my-20 px-6 py-8 w-11/12 sm:w-9/12 md:w-7/12 lg:w-6/12 xl:w-5/12 bg-cyan-200 bg-opacity-50 rounded-xl">
            <ContactComponent  className="object-center"/>
        </PageContent>
    );
}