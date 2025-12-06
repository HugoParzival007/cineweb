import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { listarFilmes } from "../../services/filme.service";
import { listarSalas } from "../../services/sala.service";

import {
  criarSessao,
  obterSessao,
  atualizarSessao,
} from "../../services/sessao.service";

import type { Filme } from "../../models/Filme";
import type { Sala } from "../../models/Sala";

import { z } from "zod";

const sessaoSchema = z.object({
  filmeId: z.string().min(1, "Escolha um filme"),
  salaId: z.string().min(1, "Escolha uma sala"),
  horario: z.string().min(1, "Informe o horário"),
});

type ErrosForm = Record<string, string>;

export default function SessoesForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [salas, setSalas] = useState<Sala[]>([]);

  const [filmeId, setFilmeId] = useState("");
  const [salaId, setSalaId] = useState("");
  const [horario, setHorario] = useState("");

  const [erros, setErros] = useState<ErrosForm>({});

  async function carregar() {
    const [fRes, sRes] = await Promise.all([listarFilmes(), listarSalas()]);
    setFilmes(fRes.data);
    setSalas(sRes.data);

    if (id) {
      const resposta = await obterSessao(id);
      const s = resposta.data;

      setFilmeId(s.filmeId);
      setSalaId(s.salaId);
      setHorario(s.horario);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  async function salvar(e: React.FormEvent) {
    e.preventDefault();

    const valid = sessaoSchema.safeParse({
      filmeId,
      salaId,
      horario,
    });

    if (!valid.success) {
      const novo: ErrosForm = {};
      valid.error.issues.forEach((i) => (novo[i.path[0] as string] = i.message));
      setErros(novo);
      return;
    }

    if (id) {
      await atualizarSessao(id, valid.data);
    } else {
      await criarSessao(valid.data);
    }

    navigate("/sessoes");
  }

  return (
    <div className="card p-4">
      <h2>{id ? "Editar Sessão" : "Nova Sessão"}</h2>

      <form onSubmit={salvar}>
        <div className="mb-3">
          <label className="form-label">Filme</label>
          <select
            className="form-select"
            value={filmeId}
            onChange={(e) => setFilmeId(e.target.value)}
          >
            <option value="">Selecione...</option>
            {filmes.map((f) => (
              <option key={f.id} value={f.id}>
                {f.titulo}
              </option>
            ))}
          </select>
          {erros.filmeId && <div className="text-danger">{erros.filmeId}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Sala</label>
          <select
            className="form-select"
            value={salaId}
            onChange={(e) => setSalaId(e.target.value)}
          >
            <option value="">Selecione...</option>
            {salas.map((s) => (
              <option key={s.id} value={s.id}>
                Sala {s.numero} — Capacidade {s.capacidade}
              </option>
            ))}
          </select>
          {erros.salaId && <div className="text-danger">{erros.salaId}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Horário</label>
          <input
            type="datetime-local"
            className="form-control"
            value={horario}
            onChange={(e) => setHorario(e.target.value)}
          />
          {erros.horario && <div className="text-danger">{erros.horario}</div>}
        </div>

        <button className="btn btn-success">Salvar</button>
      </form>
    </div>
  );
}
