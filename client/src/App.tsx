import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomepageRoutes from "./HomepageRoutes";


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

  return (
    <RouterProvider router={router} />
  );
}

export default App;