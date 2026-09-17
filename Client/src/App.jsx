// Client / src / App.jsx
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import AdminLoginPage from "./pages/Admin/AdminLoginPage";

const App = () => {
  return (
    <>
      <ToastContainer autoClose={3000} newestOnTop={true} limit={3} />

      <Routes>
        <Route path="/admin/login" element={<AdminLoginPage />} />
      </Routes>
    </>
  );
};

export default App;
