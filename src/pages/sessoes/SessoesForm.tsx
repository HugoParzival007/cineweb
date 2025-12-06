import { useEffect, useState } from "react";
import { listarFilmes } from "../../services/filme.service";
import { listarSalas } from "../../services/sala.service";
import { criarSessao } from "../../services/sessao.service";
import type { Filme } from "../../models/Filme";
import type { Sala } from "../../models/Sala";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

// VALIDAÇÃO ZOD
const sessaoSchema = z.object({
  filmeId: z.number().positive("Selecione um filme"),
  salaId: z.number().positive("Selecione uma sala"),
  horario: z.string().refine(
    (data) => new Date(data) > new Date(),
    "A sessão não pode ser no passado"
  ),
});

export default function SessoesForm() {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [salas, setSalas] = useState<Sala[]>([]);
  const [form, setForm] = useState({
    filmeId: "",
    salaId: "",
    horario: "",
  });

  const [erros, setErros] = useState<{ [k: string]: string }>({});
  const navigate = useNavigate();

  // CARREGAR FILMES E SALAS
  async function carregarDados() {
    const f = await listarFilmes();
    const s = await listarSalas();

    setFilmes(f.data);
    setSalas(s.data);
  }

  useEffect(() => {
    carregarDados();
  }, []);

  function atualizar(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function salvar(e: any) {
    e.preventDefault();

    const validacao = sessaoSchema.safeParse({
      filmeId: Number(form.filmeId),
      salaId: Number(form.salaId),
      horario: form.horario,
    });

    if (!validacao.success) {
      const errosZod: any = {};
      validacao.error.issues.forEach((err) => {
        errosZod[err.path[0]] = err.message;
      });
      setErros(errosZod);
      return;
    }

    await criarSessao(validacao.data);
    navigate("/sessoes");
  }

  return (
    <div className="card p-4">
      <h2>Agendar Sessão</h2>

      <form onSubmit={salvar}>
        {/* FILME */}
        <div className="mb-3">
          <label className="form-label">Filme</label>
          <select
            className="form-select"
            name="filmeId"
            onChange={atualizar}
            defaultValue=""
          >
            <option value="">Selecione um filme</option>
            {filmes.map((f) => (
              <option key={f.id} value={f.id}>
                {f.titulo}
              </option>
            ))}
          </select>
          {erros.filmeId && <p className="text-danger">{erros.filmeId}</p>}
        </div>

        {/* SALA */}
        <div className="mb-3">
          <label className="form-label">Sala</label>
          <select
            className="form-select"
            name="salaId"
            onChange={atualizar}
            defaultValue=""
          >
            <option value="">Selecione a sala</option>
            {salas.map((s) => (
              <option key={s.id} value={s.id}>
                Sala {s.numero} (capacidade {s.capacidade})
              </option>
            ))}
          </select>
          {erros.salaId && <p className="text-danger">{erros.salaId}</p>}
        </div>

        {/* DATA E HORÁRIO */}
        <div className="mb-3">
          <label className="form-label">Data e Horário</label>
          <input
            type="datetime-local"
            name="horario"
            className="form-control"
            onChange={atualizar}
          />
          {erros.horario && <p className="text-danger">{erros.horario}</p>}
        </div>

        <button className="btn btn-success">Salvar Sessão</button>
      </form>
    </div>
  );
}
