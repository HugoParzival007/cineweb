import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import AppRouter from "./routers/AppRouter";

export default function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        <a className="navbar-brand" href="/">CineWeb</a>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link" href="/filmes">Filmes</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/salas">Salas</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/sessoes">Sessões</a>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container mt-4">
        <AppRouter />
      </div>
    </>
  );
}
