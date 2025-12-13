import { useEffect, useState } from "react";
import { listarFilmes, excluirFilme } from "../../services/filme.service";
import type { Filme } from "../../models/Filme";
import { Link } from "react-router-dom";

export default function FilmesList() {
  const [filmes, setFilmes] = useState<Filme[]>([]);

  async function carregar() {
    const resposta = await listarFilmes();
    setFilmes(resposta.data);
  }

  async function handleExcluir(id: string) {
    const ok = confirm("Tem certeza que deseja excluir este filme?");
    if (!ok) return;

    await excluirFilme(id);
    carregar();
  }

  useEffect(() => {
    carregar();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between">
        <h2>Filmes</h2>
        <Link to="/filmes/novo" className="btn btn-success">Novo Filme</Link>
      </div>

      <table className="table mt-3">
        <thead>
          <tr>
            <th>Título</th>
            <th>Gênero</th>
            <th>Duração</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filmes.map((f) => (
            <tr key={f.id}>
              <td>{f.titulo}</td>
              <td>{f.genero}</td>
              <td>{f.duracao} min</td>
              <td>
                <Link
                  className="btn btn-primary btn-sm me-2"
                  to={`/filmes/editar/${f.id}`}
                >
                  Editar
                </Link>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleExcluir(f.id)}
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
