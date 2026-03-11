import AppRouter from "./router/AppRouter";
import {ToastContainer, Bounce} from 'react-toastify'
import axios from 'axios'
function App() {

  axios.defaults.baseURL = "http://localhost:8000"
  return (
    <div>
      <AppRouter />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </div>
  );
}

export default App;
