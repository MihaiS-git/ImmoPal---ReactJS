import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import RootLayout from './components/Root.jsx';
import Home from "./pages/Home.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: 'home',
        element: <Home/>
      }
    ],
  }
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
