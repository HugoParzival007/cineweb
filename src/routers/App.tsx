import { BrowserRouter } from "react-router-dom";
import AppRouter from "../routers/AppRouter";
import Navbar from "../components/Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="cw-page">
        <AppRouter />
      </div>
    </BrowserRouter>
  );
}
