import "./App.scss";
import { ToastContainer } from "react-toastify";
import Home from "./Components/Home/Home";
import Footer from "./Components/Footer/Footer";
import "react-toastify/dist/ReactToastify.css";
import FormComponent from "./Components/FormComponent/FormComponent";

function App() {
  return (
    <>
      <ToastContainer
        theme="dark"
        autoClose={2000}
        className={"toast-container"}
      />
      <div className="container">
        <Home />
        <Footer />
      </div>
    </>
  );
}

export default App;
