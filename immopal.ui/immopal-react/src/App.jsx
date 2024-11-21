import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import RootLayout from './components/Root.jsx';
import HomePage from "./pages/Home.jsx";
import AuthPage from "./pages/Auth.jsx";

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
      }
    ],
  }
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
