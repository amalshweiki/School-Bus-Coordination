import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SharedLayOut from "./components/layout/SharedLayout";
import About from "./pages/About";
import SchoolsPage from "./pages/SchoolsPage";
import BusesPage from "./pages/BusesPage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Auth from "./pages/Auth";
import { AuthProvider } from "./context/AuthContext";
import { SchoolProvider } from "./context/SchoolContext";
import { BusProvider } from "./context/BusContext";
function App() {
  const Router = createBrowserRouter([
    {
      path: "/",
      element: <SharedLayOut />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "about",
          element: <About />,
        },

        {
          path: "schools",
          element: <SchoolsPage />,
        },

        {
          path: "buses",
          element: <BusesPage />,
        },
        {
          path: "auth",
          element: <Auth />,
        },
      ],
    },
  ]);
  return (
    <>
      <SchoolProvider>
        <BusProvider>
          <AuthProvider>
            <ToastContainer />
            <RouterProvider router={Router} />
          </AuthProvider>
        </BusProvider>
      </SchoolProvider>
    </>
  );
}

export default App;
