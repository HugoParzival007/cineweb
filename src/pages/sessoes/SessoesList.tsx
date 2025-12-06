import { useEffect, useState } from "react";
import { listarSessoes, deletarSessao } from "../../services/sessao.service";
import { listarFilmes } from "../../services/filme.service";
import { listarSalas } from "../../services/sala.service";
import { Link } from "react-router-dom";

import type { Sessao } from "../../models/Sessao";
import type { Filme } from "../../models/Filme";
import type { Sala } from "../../models/Sala";

export default function SessoesList() {
  const [sessoes, setSessoes] = useState<Sessao[]>([]);
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [salas, setSalas] = useState<Sala[]>([]);

  async function carregar() {
    const [s, f, sa] = await Promise.all([
      listarSessoes(),
      listarFilmes(),
      listarSalas(),
    ]);

    setSessoes(s.data);
    setFilmes(f.data);
    setSalas(sa.data);
  }

  useEffect(() => {
    carregar();
  }, []);

  function nomeFilme(id: string) {
    return filmes.find((f) => f.id === id)?.titulo ?? "Desconhecido";
  }

  function numeroSala(id: string) {
    return salas.find((s) => s.id === id)?.numero ?? "N/A";
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between">
        <h2>Sessões</h2>
        <Link to="/sessoes/nova" className="btn btn-success">
          Nova Sessão
        </Link>
      </div>

      <table className="table mt-3">
        <thead>
          <tr>
            <th>Filme</th>
            <th>Sala</th>
            <th>Horário</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sessoes.map((s) => (
            <tr key={s.id}>
              <td>{nomeFilme(s.filmeId)}</td>
              <td>{numeroSala(s.salaId)}</td>
              <td>{new Date(s.horario).toLocaleString("pt-BR")}</td>
              <td>
                <Link
                  className="btn btn-primary btn-sm me-2"
                  to={`/sessoes/${s.id}/vender`}
                >
                  Vender
                </Link>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deletarSessao(s.id).then(carregar)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
