// Client / src / App.jsx
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer autoClose={3000} newestOnTop={true} limit={3} />
    </>
  );
};

export default App;
