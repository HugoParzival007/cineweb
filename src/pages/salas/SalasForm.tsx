import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { criarSala } from "../../services/sala.service";
import { z } from "zod";

const salaSchema = z.object({
  numero: z.number().positive("O número da sala deve ser maior que 0"),
  capacidade: z.number().positive("A capacidade deve ser maior que 0"),
});

export default function SalasForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    numero: "",
    capacidade: "",
  });

  const [erros, setErros] = useState<{ [k: string]: string }>({});

  function atualizar(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function salvar(e: any) {
    e.preventDefault();

    const validacao = salaSchema.safeParse({
      numero: Number(form.numero),
      capacidade: Number(form.capacidade),
    });

    if (!validacao.success) {
      const errosZod: any = {};
      validacao.error.issues.forEach((err) => {
        errosZod[err.path[0]] = err.message;
      });

      setErros(errosZod);
      return;
    }

    await criarSala(validacao.data);
    navigate("/sessoes"); // vai ser útil para parte 4
  }

  return (
    <div className="card p-4">
      <h2>Cadastrar Sala</h2>
      <form onSubmit={salvar}>
        <div className="mb-3">
          <label className="form-label">Número da Sala</label>
          <input
            name="numero"
            type="number"
            className="form-control"
            onChange={atualizar}
          />
          {erros.numero && <p className="text-danger">{erros.numero}</p>}
        </div>

        <div className="mb-3">
          <label className="form-label">Capacidade Máxima</label>
          <input
            name="capacidade"
            type="number"
            className="form-control"
            onChange={atualizar}
          />
          {erros.capacidade && <p className="text-danger">{erros.capacidade}</p>}
        </div>

        <button className="btn btn-success">Salvar Sala</button>
      </form>
    </div>
  );
}
