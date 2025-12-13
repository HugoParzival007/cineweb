import { useEffect, useState } from "react";
import { listarSalas, excluirSala } from "../../services/sala.service";
import type { Sala } from "../../models/Sala";
import { Link } from "react-router-dom";

export default function SalasList() {
  const [salas, setSalas] = useState<Sala[]>([]);

  async function carregar() {
    const resposta = await listarSalas();
    setSalas(resposta.data);
  }

  async function handleExcluir(id: string) {
    const ok = confirm("Tem certeza que deseja excluir esta sala?");
    if (!ok) return;

    await excluirSala(id);
    carregar();
  }

  useEffect(() => {
    carregar();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between">
        <h2>Salas</h2>

        <Link to="/salas/nova" className="btn btn-success">
          Nova Sala
        </Link>
      </div>

      <table className="table mt-3">
        <thead>
          <tr>
            <th>Número</th>
            <th>Capacidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {salas.map((s) => (
            <tr key={s.id}>
              <td>{s.numero}</td>
              <td>{s.capacidade}</td>
              <td>
                <Link
                  className="btn btn-primary btn-sm me-2"
                  to={`/salas/editar/${s.id}`}
                >
                  Editar
                </Link>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleExcluir(s.id)}
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
