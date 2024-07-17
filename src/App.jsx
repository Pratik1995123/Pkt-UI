import "./App.scss";
import { ToastContainer } from "react-toastify";
import Home from "./Components/Home/Home";
import Footer from "./Components/Footer/Footer";
import "react-toastify/dist/ReactToastify.css";
import FormComponent from "./Components/FormComponent/FormComponent";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/form",
    element: <FormComponent />,
  },
  {
    // for other show Home component
    path: "*",
    element: <Home />,
  }
]);

function App() {
  return (
    <>
      <ToastContainer
        theme="dark"
        autoClose={2000}
        className={"toast-container"}
      />
      <div className="container">
        <RouterProvider router={router} />
        <Footer />
      </div>
    </>
  );
}

export default App;
