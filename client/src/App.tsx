import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomepageRoutes from "./HomepageRoutes";
import AuthenticationModal from "./shared/modals/authentication/";
import { AuthModalContextProvider, useAuthModal } from "./shared/contexts/AuthModalContext";

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
  const { authModalState,closeAuthModal } = useAuthModal();

  return (
    <>
      <RouterProvider router={router} />
      {authModalState && <AuthenticationModal closeAuthModal={closeAuthModal}/>}
    </>
  );
}

export default App;
