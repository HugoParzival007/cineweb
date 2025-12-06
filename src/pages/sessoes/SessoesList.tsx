import { useEffect, useState } from "react";
import { listarSessoes } from "../../services/sessao.service";
import { listarFilmes } from "../../services/filme.service";
import { listarSalas } from "../../services/sala.service";
import type { Sessao } from "../../models/Sessao";
import type { Filme } from "../../models/Filme";
import type { Sala } from "../../models/Sala";
import { useNavigate } from "react-router-dom";

export default function SessoesList() {
  const [sessoes, setSessoes] = useState<Sessao[]>([]);
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [salas, setSalas] = useState<Sala[]>([]);
  const navigate = useNavigate();

  async function carregar() {
    const s = await listarSessoes();
    const f = await listarFilmes();
    const sl = await listarSalas();

    setSessoes(s.data);
    setFilmes(f.data);
    setSalas(sl.data);
  }

  function getFilme(id: number) {
    return filmes.find((f) => f.id === id)?.titulo || "Desconhecido";
  }

  function getSala(id: number) {
    return salas.find((s) => s.id === id)?.numero || "??";
  }

  useEffect(() => {
    carregar();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <h2>Sessões Agendadas</h2>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/sessoes/nova")}
        >
          + Nova Sessão
        </button>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Filme</th>
            <th>Sala</th>
            <th>Horário</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {sessoes.map((s) => (
            <tr key={s.id}>
              <td>{getFilme(s.filmeId)}</td>
              <td>Sala {getSala(s.salaId)}</td>
              <td>{new Date(s.horario).toLocaleString()}</td>
              <td>
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => navigate(`/sessoes/${s.id}/vender`)}
                >
                  <i className="bi bi-ticket-perforated"></i> Vender
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
