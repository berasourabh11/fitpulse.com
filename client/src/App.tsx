import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomepageRoutes from "./HomepageRoutes";
import AuthenticationModal from "./shared/modals/authentication/";
import { AuthModalContextProvider, useAuthModal } from "./shared/contexts/AuthModalContext";
import { useEffect } from "react";
import { checkLogin } from "./shared/api/authentication/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomepageRoutes />,
  },
  {
    path: "/book-a-class",
    element: <h1>Book A Class</h1>,
  },
]);

function App() {
  // Call the useAuthModal function to get the values
  const { authModalState, closeAuthModal, set_user_details, unset_user_details } = useAuthModal();

  async function checkAuth() {
    const { statusCode, data } = await checkLogin();
    if (statusCode === 200) {
      set_user_details(data);
    } else {
      unset_user_details();
    }
  }

  useEffect(() => {
    async function fetchData() {
      await checkAuth();
      // Now you can see the updated userDetails here
    }

    fetchData();
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      {authModalState && <AuthenticationModal closeAuthModal={closeAuthModal} />}
    </>
  );
}

export default App;
