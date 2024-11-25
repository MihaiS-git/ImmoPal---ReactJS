import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import RootLayout from './components/Root.jsx';
import HomePage from "./pages/Home.jsx";
import AuthPage from "./pages/Auth.jsx";
import RegistrationPage from "./pages/RegistrationPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import AgenciesPage from "./pages/AgenciesPage.jsx";
import AgencyPage from "./pages/AgencyPage.jsx";
import AgencyAgentsPage from "./pages/AgencyAgentsPage.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: 'home',
        element: <HomePage/>
      },
      {
        path: 'auth',
        element: <AuthPage/>
      },
      {
        path: 'register',
        element: <RegistrationPage/>
      },
      {
        path: 'contact',
        element: <ContactPage/>
      },
      {
        path: 'agencies',
        element: <AgenciesPage/>
      },
      {
        path: 'agencies/:id',
        element: <AgencyPage/>
      },
      {
        path: 'agencies/:id/agents',
        element: <AgencyAgentsPage/>
      },
    ],
  }
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
