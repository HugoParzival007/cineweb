import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { criarSala, obterSala, atualizarSala } from "../../services/sala.service";
import { z } from "zod";

const salaSchema = z.object({
  numero: z
    .number()
    .refine((v) => !isNaN(v) && v > 0, "Número deve ser um número maior que 0"),

  capacidade: z
    .number()
    .refine((v) => !isNaN(v) && v > 0, "Capacidade deve ser um número maior que 0"),
});

type ErrosForm = Record<string, string>;

export default function SalasForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    numero: "",
    capacidade: "",
  });

  const [erros, setErros] = useState<ErrosForm>({});

  async function carregarSala() {
    if (!id) return;
    const resp = await obterSala(id);
    const s = resp.data;
    setForm({
      numero: String(s.numero),
      capacidade: String(s.capacidade),
    });
  }

  useEffect(() => {
    carregarSala();
  }, [id]);

  function atualizar(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function salvar(e: React.FormEvent) {
    e.preventDefault();

    const validacao = salaSchema.safeParse({
      numero: Number(form.numero),
      capacidade: Number(form.capacidade),
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
      await atualizarSala(id, validacao.data);
    } else {
      await criarSala(validacao.data);
    }

    navigate("/salas");
  }

  return (
    <div className="card p-4">
      <h2>{id ? "Editar Sala" : "Cadastrar Sala"}</h2>

      <form onSubmit={salvar}>
        <div className="mb-3">
          <label className="form-label">Número da Sala</label>
          <input
            type="number"
            name="numero"
            className={`form-control ${erros.numero ? "is-invalid" : ""}`}
            value={form.numero}
            onChange={atualizar}
          />
          {erros.numero && (
            <div className="invalid-feedback">{erros.numero}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Capacidade Máxima</label>
          <input
            type="number"
            name="capacidade"
            className={`form-control ${
              erros.capacidade ? "is-invalid" : ""
            }`}
            value={form.capacidade}
            onChange={atualizar}
          />
          {erros.capacidade && (
            <div className="invalid-feedback">{erros.capacidade}</div>
          )}
        </div>

        <button className="btn btn-success">Salvar Sala</button>
      </form>
    </div>
  );
}
