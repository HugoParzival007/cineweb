import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { criarFilme } from "../../services/filme.service";
import { z } from "zod";

// VALIDAÇÃO ZOD
const filmeSchema = z.object({
  titulo: z.string().min(1, "Título é obrigatório"),
  sinopse: z.string().min(10, "Sinopse deve ter no mínimo 10 caracteres"),
  classificacao: z.string().min(1, "Informe a classificação"),
  duracao: z.number().positive("Duração deve ser maior que 0"),
  genero: z.string().min(1, "Informe o gênero"),
  dataInicio: z.string().min(1, "Data inicial obrigatória"),
  dataFim: z.string().min(1, "Data final obrigatória"),
});

export default function FilmesForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    titulo: "",
    sinopse: "",
    classificacao: "",
    duracao: 0,
    genero: "",
    dataInicio: "",
    dataFim: "",
  });

  const [erros, setErros] = useState<{ [k: string]: string }>({});

  function atualizarCampo(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function salvar(e: any) {
    e.preventDefault();

    const validacao = filmeSchema.safeParse({
      ...form,
      duracao: Number(form.duracao),
    });

    if (!validacao.success) {
      const errosZod: any = {};
      validacao.error.issues.forEach((err) => {
        errosZod[err.path[0]] = err.message;
      });
      setErros(errosZod);
      return;
    }

    await criarFilme(validacao.data);
    navigate("/filmes");
  }

  return (
    <div className="card p-4">
      <h2>Novo Filme</h2>

      <form onSubmit={salvar}>
        <div className="mb-3">
          <label className="form-label">Título</label>
          <input
            type="text"
            name="titulo"
            className="form-control"
            onChange={atualizarCampo}
          />
          {erros.titulo && <p className="text-danger">{erros.titulo}</p>}
        </div>

        <div className="mb-3">
          <label className="form-label">Sinopse</label>
          <textarea
            name="sinopse"
            className="form-control"
            onChange={atualizarCampo}
          ></textarea>
          {erros.sinopse && <p className="text-danger">{erros.sinopse}</p>}
        </div>

        <div className="row">
          <div className="col-4 mb-3">
            <label className="form-label">Classificação</label>
            <input
              name="classificacao"
              type="text"
              className="form-control"
              onChange={atualizarCampo}
            />
          </div>

          <div className="col-4 mb-3">
            <label className="form-label">Gênero</label>
            <input
              name="genero"
              type="text"
              className="form-control"
              onChange={atualizarCampo}
            />
          </div>

          <div className="col-4 mb-3">
            <label className="form-label">Duração (min)</label>
            <input
              name="duracao"
              type="number"
              className="form-control"
              onChange={atualizarCampo}
            />
            {erros.duracao && <p className="text-danger">{erros.duracao}</p>}
          </div>
        </div>

        <div className="row">
          <div className="col-6 mb-3">
            <label className="form-label">Data Início</label>
            <input
              name="dataInicio"
              type="date"
              className="form-control"
              onChange={atualizarCampo}
            />
          </div>

          <div className="col-6 mb-3">
            <label className="form-label">Data Fim</label>
            <input
              name="dataFim"
              type="date"
              className="form-control"
              onChange={atualizarCampo}
            />
          </div>
        </div>

        <button className="btn btn-success">Salvar</button>
      </form>
    </div>
  );
}
