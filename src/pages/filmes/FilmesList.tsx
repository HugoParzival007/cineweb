import { useEffect, useState } from "react";
import { listarFilmes, apagarFilme } from "../../services/filme.service";
import type { Filme } from "../../models/Filme";
import { useNavigate } from "react-router-dom";

export default function FilmesList() {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const navigate = useNavigate();

  async function carregarFilmes() {
    const resposta = await listarFilmes();
    setFilmes(resposta.data);
  }

  async function excluirFilme(id: number) {
    await apagarFilme(id);
    carregarFilmes();
  }

  useEffect(() => {
    carregarFilmes();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Filmes</h2>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/filmes/novo")}
        >
          + Novo Filme
        </button>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Título</th>
            <th>Classificação</th>
            <th>Gênero</th>
            <th>Duração</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {filmes.map((filme) => (
            <tr key={filme.id}>
              <td>{filme.titulo}</td>
              <td>{filme.classificacao}</td>
              <td>{filme.genero}</td>
              <td>{filme.duracao} min</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => excluirFilme(filme.id!)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
