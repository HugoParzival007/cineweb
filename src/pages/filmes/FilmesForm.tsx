import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { criarFilme, obterFilme, atualizarFilme } from "../../services/filme.service";
import { z } from "zod";

const filmeSchema = z.object({
  titulo: z.string().min(1, "Título é obrigatório"),
  sinopse: z.string().min(10, "Sinopse deve ter no mínimo 10 caracteres"),
  classificacao: z.string().min(1, "Classificação é obrigatória"),
  duracao: z
    .number()
    .refine((v) => !isNaN(v) && v > 0, "Duração deve ser um número maior que 0"),
  genero: z.string().min(1, "Gênero é obrigatório"),
  dataInicio: z.string().min(1, "Data de início é obrigatória"),
  dataFim: z.string().min(1, "Data de fim é obrigatória"),
});

type ErrosForm = Record<string, string>;

export default function FilmesForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    titulo: "",
    sinopse: "",
    classificacao: "",
    duracao: "",
    genero: "",
    dataInicio: "",
    dataFim: "",
  });

  const [erros, setErros] = useState<ErrosForm>({});

  async function carregarFilme() {
    if (!id) return;
    const resp = await obterFilme(id);
    const f = resp.data;
    setForm({
      titulo: f.titulo,
      sinopse: f.sinopse,
      classificacao: f.classificacao,
      duracao: String(f.duracao),
      genero: f.genero,
      dataInicio: f.dataInicio,
      dataFim: f.dataFim,
    });
  }

  useEffect(() => {
    carregarFilme();
  }, [id]);

  function atualizar(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function salvar(e: React.FormEvent) {
    e.preventDefault();

    const validacao = filmeSchema.safeParse({
      ...form,
      duracao: Number(form.duracao),
    });

    if (!validacao.success) {
      const novosErros: ErrosForm = {};
      validacao.error.issues.forEach((issue) => {
        const campo = String(issue.path[0]);
        novosErros[campo] = issue.message;
      });
      setErros(novosErros);
      return;
    }

    if (id) {
      await atualizarFilme(id, validacao.data);
    } else {
      await criarFilme(validacao.data);
    }

    navigate("/filmes");
  }

  return (
    <div className="card p-4">
      <h2>{id ? "Editar Filme" : "Novo Filme"}</h2>

      <form onSubmit={salvar}>
        <div className="mb-3">
          <label className="form-label">Título</label>
          <input
            name="titulo"
            className={`form-control ${erros.titulo ? "is-invalid" : ""}`}
            value={form.titulo}
            onChange={atualizar}
          />
          {erros.titulo && (
            <div className="invalid-feedback">{erros.titulo}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Sinopse</label>
          <textarea
            name="sinopse"
            className={`form-control ${erros.sinopse ? "is-invalid" : ""}`}
            value={form.sinopse}
            onChange={atualizar}
            rows={3}
          />
          {erros.sinopse && (
            <div className="invalid-feedback">{erros.sinopse}</div>
          )}
        </div>

        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label">Classificação</label>
            <input
              name="classificacao"
              className={`form-control ${
                erros.classificacao ? "is-invalid" : ""
              }`}
              value={form.classificacao}
              onChange={atualizar}
            />
            {erros.classificacao && (
              <div className="invalid-feedback">{erros.classificacao}</div>
            )}
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Gênero</label>
            <input
              name="genero"
              className={`form-control ${erros.genero ? "is-invalid" : ""}`}
              value={form.genero}
              onChange={atualizar}
            />
            {erros.genero && (
              <div className="invalid-feedback">{erros.genero}</div>
            )}
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Duração (minutos)</label>
            <input
              type="number"
              name="duracao"
              className={`form-control ${erros.duracao ? "is-invalid" : ""}`}
              value={form.duracao}
              onChange={atualizar}
            />
            {erros.duracao && (
              <div className="invalid-feedback">{erros.duracao}</div>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Data de início</label>
            <input
              type="date"
              name="dataInicio"
              className={`form-control ${
                erros.dataInicio ? "is-invalid" : ""
              }`}
              value={form.dataInicio}
              onChange={atualizar}
            />
            {erros.dataInicio && (
              <div className="invalid-feedback">{erros.dataInicio}</div>
            )}
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Data de fim</label>
            <input
              type="date"
              name="dataFim"
              className={`form-control ${erros.dataFim ? "is-invalid" : ""}`}
              value={form.dataFim}
              onChange={atualizar}
            />
            {erros.dataFim && (
              <div className="invalid-feedback">{erros.dataFim}</div>
            )}
          </div>
        </div>

        <button className="btn btn-success">Salvar</button>
      </form>
    </div>
  );
}
