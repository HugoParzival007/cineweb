import { useEffect, useState } from "react";
import { listarSalas } from "../../services/sala.service";
import type { Sala } from "../../models/Sala";
import { Link } from "react-router-dom";

export default function SalasList() {
  const [salas, setSalas] = useState<Sala[]>([]);

  async function carregar() {
    const resposta = await listarSalas();
    setSalas(resposta.data);
  }

  useEffect(() => {
    carregar();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between">
        <h2>Salas</h2>

        {/* Botão ADICIONADO */}
        <Link to="/salas/nova" className="btn btn-success">
          Nova Sala
        </Link>
      </div>

      <table className="table mt-3">
        <thead>
          <tr>
            <th>Número</th>
            <th>Capacidade</th>
          </tr>
        </thead>
        <tbody>
          {salas.map((s) => (
            <tr key={s.id}>
              <td>{s.numero}</td>
              <td>{s.capacidade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
