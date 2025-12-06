import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { listarSessoes } from "../../services/sessao.service";
import { listarFilmes } from "../../services/filme.service";
import { listarSalas } from "../../services/sala.service";
import { criarIngresso } from "../../services/ingresso.service";
import type { Filme } from "../../models/Filme";
import type { Sala } from "../../models/Sala";
import type { Sessao } from "../../models/Sessao";
import { z } from "zod";

// validação Zod
const vendaSchema = z.object({
  tipo: z.enum(["inteira", "meia"]).refine((v) => v.length > 0, { 
    message: "Escolha um tipo de ingresso"
  })
});

export default function VendaIngresso() {
  const { id } = useParams(); // sessaoId
  const navigate = useNavigate();

  const [sessao, setSessao] = useState<Sessao | null>(null);
  const [filme, setFilme] = useState<Filme | null>(null);
  const [sala, setSala] = useState<Sala | null>(null);
  const [tipo, setTipo] = useState("");
  const [erro, setErro] = useState("");

  async function carregar() {
    const s = await listarSessoes();
    const f = await listarFilmes();
    const sl = await listarSalas();

    const sessaoEncontrada = s.data.find((x: Sessao) => x.id === Number(id));
    setSessao(sessaoEncontrada);

    if (sessaoEncontrada) {
      setFilme(f.data.find((x: Filme) => x.id === sessaoEncontrada.filmeId));
      setSala(sl.data.find((x: Sala) => x.id === sessaoEncontrada.salaId));
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  async function vender(e: any) {
    e.preventDefault();

    const validacao = vendaSchema.safeParse({ tipo });

    if (!validacao.success) {
      setErro(validacao.error.issues[0].message);
      return;
    }

    const valor = tipo === "inteira" ? 20 : 10;

    await criarIngresso({
      sessaoId: Number(id),
      tipo: tipo as "inteira" | "meia",
      valor,
    });

    navigate("/sessoes");
  }

  if (!sessao || !filme || !sala) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="card p-4">
      <h2>Venda de Ingresso</h2>

      <p><strong>Filme:</strong> {filme.titulo}</p>
      <p><strong>Sala:</strong> {sala.numero}</p>
      <p><strong>Horário:</strong> {new Date(sessao.horario).toLocaleString()}</p>

      <form onSubmit={vender} className="mt-3">

        <div className="mb-3">
          <label className="form-label">Tipo de Ingresso</label>
          <select
            className="form-select"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          >
            <option value="">Selecione</option>
            <option value="inteira">Inteira (R$ 20,00)</option>
            <option value="meia">Meia (R$ 10,00)</option>
          </select>
          {erro && <p className="text-danger">{erro}</p>}
        </div>

        <button className="btn btn-success">Confirmar Venda</button>
      </form>
    </div>
  );
}
