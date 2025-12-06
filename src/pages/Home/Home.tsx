import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="text-center mt-5">
      <h1 className="fw-bold">🎬 Bem-vindo ao CineWeb</h1>
      <p className="fs-4 text-secondary">
        Sistema de gerenciamento de cinema — filmes, salas e sessões.
      </p>

      <div className="d-flex justify-content-center gap-4 mt-4 flex-wrap">

        <Link to="/filmes" className="btn btn-dark btn-lg px-4 shadow">
          <i className="bi bi-film"></i> Gerenciar Filmes
        </Link>

        <Link to="/salas" className="btn btn-dark btn-lg px-4 shadow">
          <i className="bi bi-door-open"></i> Gerenciar Salas
        </Link>

        <Link to="/sessoes" className="btn btn-dark btn-lg px-4 shadow">
          <i className="bi bi-ticket"></i> Gerenciar Sessões
        </Link>

      </div>
    </div>
  );
}
