import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

export default function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm px-4">
        <Link className="navbar-brand fw-bold fs-3 d-flex align-items-center" to="/">
          🎬 <span className="ms-2">CineWeb</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link className="nav-link fs-5" to="/filmes">
                <i className="bi bi-film"></i> Filmes
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link fs-5" to="/salas">
                <i className="bi bi-door-open"></i> Salas
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link fs-5" to="/sessoes">
                <i className="bi bi-ticket-perforated"></i> Sessões
              </Link>
            </li>

          </ul>
        </div>
      </nav>

      <div className="container mt-4">
        {/* Aqui o conteúdo das rotas será mostrado */}
      </div>
    </>
  );
}
