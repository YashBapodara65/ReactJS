import { BrowserRouter } from "react-router-dom"
import MainRoutes from "./routes/MainRoutes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
    <ToastContainer/>
    <BrowserRouter>
      <MainRoutes/>
    </BrowserRouter>
    </>
  )
}

export default App
