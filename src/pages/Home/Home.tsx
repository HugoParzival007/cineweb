import { useEffect, useState } from "react";
import { listarFilmes } from "../../services/filme.service";
import { listarSalas } from "../../services/sala.service";
import { listarSessoes } from "../../services/sessao.service";
import { Link } from "react-router-dom";

export default function Home() {
  const [filmes, setFilmes] = useState(0);
  const [salas, setSalas] = useState(0);
  const [sessoes, setSessoes] = useState(0);

  async function carregarDados() {
    const [f, s, se] = await Promise.all([
      listarFilmes(),
      listarSalas(),
      listarSessoes()
    ]);

    setFilmes(f.data.length);
    setSalas(s.data.length);
    setSessoes(se.data.length);
  }

  useEffect(() => {
    carregarDados();
  }, []);

  return (
    <div className="cw-dashboard">

      <h1 className="cw-title">🎬 CineWeb Dashboard</h1>
      <p className="cw-subtitle">Painel administrativo geral</p>

      <div className="cw-dashboard-cards">

        <div className="cw-card">
          <h2>{filmes}</h2>
          <p>Filmes cadastrados</p>
          <Link to="/filmes" className="cw-btn">Gerenciar Filmes</Link>
        </div>

        <div className="cw-card">
          <h2>{salas}</h2>
          <p>Salas cadastradas</p>
          <Link to="/salas" className="cw-btn">Gerenciar Salas</Link>
        </div>

        <div className="cw-card">
          <h2>{sessoes}</h2>
          <p>Sessões ativas</p>
          <Link to="/sessoes" className="cw-btn">Gerenciar Sessões</Link>
        </div>

      </div>

    </div>
  );
}
