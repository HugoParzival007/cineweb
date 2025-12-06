import { useEffect, useState } from "react";
import { listarSalas } from "../../services/sala.service";
import type { Sala } from "../../models/Sala";

export default function SalasList() {
  const [salas, setSalas] = useState<Sala[]>([]);

  async function carregar() {
    const r = await listarSalas();
    setSalas(r.data);
  }

  useEffect(() => {
    carregar();
  }, []);

  return (
    <div>
      <h2>Salas Cadastradas</h2>

      <table className="table table-striped mt-3">
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
