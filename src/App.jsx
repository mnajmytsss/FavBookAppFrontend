import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AvicenaDashboard from "./pages/AvicenaPage";
import DeffiDashboard from "./pages/DeffiPage";
import NajmyDashboard from "./pages/NajmyPage";
import HomePage from "./pages/HomePage";
import Error from "./pages/NotFoundPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />
    },
    {
      path: "/avicena",
      element: <AvicenaDashboard />
    },
    {
      path: "/deffi",
      element: <DeffiDashboard />
    },
    {
      path: "/najmy",
      element: <NajmyDashboard />
    },
    {
      path: "*",
      element: <Error />
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
