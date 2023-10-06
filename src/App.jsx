import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AvicenaDashboard from "./pages/avicenaPage";
import DeffiDashboard from "./pages/deffiPage";
import NajmyDashboard from "./pages/najmyPage";
import HomePage from "./pages/homePage";
import Error from "./pages/notFoundPage";

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
