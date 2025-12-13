import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { obterSessao } from "../../services/sessao.service";
import { listarFilmes } from "../../services/filme.service";
import { listarSalas } from "../../services/sala.service";
import { criarIngresso } from "../../services/ingresso.service";
import { criarPedido } from "../../services/pedido.service";

import type { Sessao } from "../../models/Sessao";
import type { Filme } from "../../models/Filme";
import type { Sala } from "../../models/Sala";
import type { Ingresso } from "../../models/Ingresso";

export default function VendaIngresso() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [sessao, setSessao] = useState<Sessao | null>(null);
  const [filme, setFilme] = useState<Filme | null>(null);
  const [sala, setSala] = useState<Sala | null>(null);

  const [tipo, setTipo] = useState("");
  const [erro, setErro] = useState("");
  const [erroCarregamento, setErroCarregamento] = useState("");

  async function carregar() {
    try {
      if (!id) {
        setErroCarregamento("Sessão não encontrada.");
        return;
      }

      const sRes = await obterSessao(id);
      const s = sRes.data;
      setSessao(s);

      const [fRes, saRes] = await Promise.all([listarFilmes(), listarSalas()]);

      const filmeEncontrado =
        fRes.data.find((f) => String(f.id) === String(s.filmeId)) ?? null;
      const salaEncontrada =
        saRes.data.find((x) => String(x.id) === String(s.salaId)) ?? null;

      setFilme(filmeEncontrado);
      setSala(salaEncontrada);

      if (!filmeEncontrado || !salaEncontrada) {
        setErroCarregamento(
          "Não foi possível localizar o filme ou a sala dessa sessão."
        );
      }
    } catch (e) {
      console.error(e);
      setErroCarregamento("Erro ao carregar dados da sessão.");
    }
  }

  useEffect(() => {
    carregar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function vender(e: React.FormEvent) {
    e.preventDefault();

    if (!sessao || !id) return;

    if (!tipo) {
      setErro("Escolha o tipo de ingresso");
      return;
    }

    const valor = tipo === "inteira" ? 20 : 10;

    // 1) Cria o ingresso
    const ingressoRes = await criarIngresso({
      sessaoId: id,
      tipo: tipo as "inteira" | "meia",
      valor,
    });

    const novoIngresso: Ingresso = ingressoRes.data;

    // 2) Cria o pedido (um ingresso, nenhum lanche por enquanto)
    await criarPedido({
      qtInteira: tipo === "inteira" ? 1 : 0,
      qtMeia: tipo === "meia" ? 1 : 0,
      ingressos: [novoIngresso],
      lanches: [], // depois podemos popular com combos
    });

    navigate("/sessoes");
  }

  if (erroCarregamento) {
    return (
      <div className="card p-4 shadow cw-container mt-4">
        <h2>Venda de Ingresso</h2>
        <p className="text-danger">{erroCarregamento}</p>
      </div>
    );
  }

  if (!sessao || !filme || !sala) {
    return (
      <div className="cw-container mt-4 text-center">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="cw-container mt-4">
      <div className="card p-4 shadow">
        <h2 className="mb-3">Venda de Ingresso</h2>

        <p>
          <strong>Filme:</strong> {filme.titulo}
        </p>
        <p>
          <strong>Sala:</strong> {sala.numero}
        </p>
        <p>
          <strong>Horário:</strong>{" "}
          {new Date(sessao.horario).toLocaleString("pt-BR")}
        </p>

        <form onSubmit={vender} className="mt-3">
          <label className="form-label">Tipo de ingresso</label>

          <select
            className={`form-select ${erro ? "is-invalid" : ""}`}
            value={tipo}
            onChange={(e) => {
              setTipo(e.target.value);
              setErro("");
            }}
          >
            <option value="">Selecione...</option>
            <option value="inteira">Inteira — R$ 20,00</option>
            <option value="meia">Meia — R$ 10,00</option>
          </select>

          {erro && <div className="invalid-feedback">{erro}</div>}

          <button className="btn btn-success mt-3">Confirmar venda</button>
        </form>
      </div>
    </div>
  );
}
