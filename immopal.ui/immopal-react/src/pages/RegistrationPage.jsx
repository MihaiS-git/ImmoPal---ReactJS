import PageContent from "../components/PageContent.jsx";
import RegistrationForm from "../components/auth/RegistrationForm.jsx";

export default function RegistrationPage() { 
    return (                    
        <PageContent className="flex flex-col items-center justify-center min-h-screen w-full my-24">
            <RegistrationForm/>
        </PageContent>
    );
}