import PageContent from '../components/PageContent.jsx';
import AuthForm from '../components/auth/AuthForm.jsx';

export default function AuthPage() { 
    return (
        <PageContent className="flex items-center justify-center h-screen w-full">
            <AuthForm/>
        </PageContent>
    );
}