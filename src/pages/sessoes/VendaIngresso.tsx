import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { obterSessao } from "../../services/sessao.service";
import { listarFilmes } from "../../services/filme.service";
import { listarSalas } from "../../services/sala.service";
import { criarIngresso } from "../../services/ingresso.service";

import type { Sessao } from "../../models/Sessao";
import type { Filme } from "../../models/Filme";
import type { Sala } from "../../models/Sala";

export default function VendaIngresso() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [sessao, setSessao] = useState<Sessao | null>(null);
  const [filme, setFilme] = useState<Filme | null>(null);
  const [sala, setSala] = useState<Sala | null>(null);

  const [tipo, setTipo] = useState("");
  const [erro, setErro] = useState("");

  async function carregar() {
    if (!id) return;

    const sRes = await obterSessao(id);
    const s = sRes.data;
    setSessao(s);

    const filmes = await listarFilmes();
    setFilme(filmes.data.find((f) => f.id === s.filmeId) ?? null);

    const salas = await listarSalas();
    setSala(salas.data.find((sa) => sa.id === s.salaId) ?? null);
  }

  useEffect(() => {
    carregar();
  }, []);

  async function vender(e: React.FormEvent) {
    e.preventDefault();

    if (!tipo) {
      setErro("Escolha o tipo de ingresso");
      return;
    }

    const valor = tipo === "inteira" ? 20 : 10;

    await criarIngresso({
      sessaoId: id!,
      tipo: tipo as "inteira" | "meia",
      valor,
    });

    navigate("/sessoes");
  }

  if (!sessao || !filme || !sala) return <p>Carregando...</p>;

  return (
    <div className="card p-4 shadow">
      <h2>Venda de Ingresso</h2>

      <p><strong>Filme:</strong> {filme.titulo}</p>
      <p><strong>Sala:</strong> {sala.numero}</p>
      <p><strong>Horário:</strong> {new Date(sessao.horario).toLocaleString("pt-BR")}</p>

      <form onSubmit={vender}>
        <label className="form-label">Tipo</label>
        <select
          className={`form-select ${erro ? "is-invalid" : ""}`}
          value={tipo}
          onChange={(e) => {
            setTipo(e.target.value);
            setErro("");
          }}
        >
          <option value="">Selecione...</option>
          <option value="inteira">Inteira — R$ 20</option>
          <option value="meia">Meia — R$ 10</option>
        </select>

        {erro && <div className="invalid-feedback">{erro}</div>}

        <button className="btn btn-success mt-3">Confirmar</button>
      </form>
    </div>
  );
}
