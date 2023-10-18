import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/homePage";
import Error from "./pages/notFoundPage";
import RegisterForm from "./pages/register";
import LoginForm from "./pages/login";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RegisterForm />
    },
    {
      path: "/login",
      element: <LoginForm />
    },
    {
      path: "/homepage",
      element: <HomePage />
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
