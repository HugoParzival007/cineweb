import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="cw-navbar">
      <div className="cw-navbar-content">
        <Link to="/" className="cw-logo">
          🎬 CineWeb
        </Link>

        <div className="cw-menu">
          <Link
            to="/filmes"
            className={location.pathname.startsWith("/filmes") ? "active" : ""}
          >
            Filmes
          </Link>

          <Link
            to="/salas"
            className={location.pathname.startsWith("/salas") ? "active" : ""}
          >
            Salas
          </Link>

          <Link
            to="/sessoes"
            className={location.pathname.startsWith("/sessoes") ? "active" : ""}
          >
            Sessões
          </Link>
        </div>
      </div>
    </nav>
  );
}
