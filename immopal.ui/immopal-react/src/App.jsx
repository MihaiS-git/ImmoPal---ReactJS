import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import RootLayout from './components/Root.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: []
  }
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
