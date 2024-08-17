import "./App.scss";

//Router
import { BrowserRouter, Routes, Route } from "react-router-dom";

//components
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

//pages
import FormPage from "./pages/FormPage/FormPage";
import ListResumes from "./pages//ListResumes/ListResumes";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import NotFound from "./pages/NotFound/NotFound";

//toastify notifications
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer autoClose={5000} />
        <div className="app-container">
          <Header />
          <Routes>
            <Route path="/" element={<FormPage />} />
            <Route path="/resumes" element={<ListResumes />} />
            <Route path="/*" element={<NotFound />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registrar" element={<RegisterPage />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
