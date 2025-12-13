import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { listarFilmes } from "../../services/filme.service";
import { listarSessoes } from "../../services/sessao.service";
import { listarIngressos } from "../../services/ingresso.service";
import { listarPedidos } from "../../services/pedido.service";

import type { Sessao } from "../../models/Sessao";
import type { Filme } from "../../models/Filme";
import type { Ingresso } from "../../models/Ingresso";

interface VendaDetalhada {
  id: string;
  filme: string;
  horario: string;
  tipo: "inteira" | "meia";
  valor: number;
}

export default function Home() {
  const [totalFilmes, setTotalFilmes] = useState(0);
  const [totalSessoes, setTotalSessoes] = useState(0);
  const [totalIngressos, setTotalIngressos] = useState(0);
  const [totalPedidos, setTotalPedidos] = useState(0);
  const [totalFaturado, setTotalFaturado] = useState(0);

  const [ultimasVendas, setUltimasVendas] = useState<VendaDetalhada[]>([]);

  async function carregar() {
    const [f, s, ing, pedidos] = await Promise.all([
      listarFilmes(),
      listarSessoes(),
      listarIngressos(),
      listarPedidos(),
    ]);

    const filmes = f.data as Filme[];
    const sessoes = s.data as Sessao[];
    const ingressos = ing.data as Ingresso[];

    setTotalFilmes(filmes.length);
    setTotalSessoes(sessoes.length);
    setTotalIngressos(ingressos.length);
    setTotalPedidos(pedidos.data.length);
    setTotalFaturado(
      pedidos.data.reduce((acc, p) => acc + p.valorTotal, 0)
    );

    // Monta uma listinha das últimas vendas com filme + horário
    const vendasDetalhadas: VendaDetalhada[] = ingressos
      .slice(-5) // pega as 5 últimas
      .map((ing) => {
        const sessao = sessoes.find((se) => String(se.id) === String(ing.sessaoId));
        const filme = filmes.find((fi) => String(fi.id) === String(sessao?.filmeId));

        return {
          id: ing.id,
          filme: filme ? filme.titulo : "Desconhecido",
          horario: sessao
            ? new Date(sessao.horario).toLocaleString("pt-BR")
            : "-",
          tipo: ing.tipo,
          valor: ing.valor,
        };
      })
      .reverse();

    setUltimasVendas(vendasDetalhadas);
  }

  useEffect(() => {
    carregar();
  }, []);

  return (
    <div className="cw-main">
      <div className="cw-container">
        {/* HERO */}
        <section className="cw-hero">
          <div className="cw-hero-title">
            <div className="cw-hero-icon">🎬</div>
            <span>CineWeb Dashboard</span>
          </div>
          <p className="cw-hero-subtitle">
            Sistema administrativo para cadastro de filmes, salas, sessões e
            controle de vendas de ingressos.
          </p>
        </section>

        {/* MÉTRICAS PRINCIPAIS */}
        <section className="cw-metrics-grid">
          <div className="cw-card cw-metric-card">
            <span className="cw-metric-label">Filmes cadastrados</span>
            <span className="cw-metric-value">{totalFilmes}</span>
            <div className="d-flex justify-content-between align-items-center">
              <span className="cw-metric-extra">
                Títulos disponíveis na programação.
              </span>
              <Link to="/filmes" className="btn btn-primary btn-sm">
                Gerenciar filmes
              </Link>
            </div>
          </div>

          <div className="cw-card cw-metric-card">
            <span className="cw-metric-label">Sessões ativas</span>
            <span className="cw-metric-value">{totalSessoes}</span>
            <div className="d-flex justify-content-between align-items-center">
              <span className="cw-metric-extra">
                Sessões cadastradas para exibição.
              </span>
              <Link to="/sessoes" className="btn btn-primary btn-sm">
                Gerenciar sessões
              </Link>
            </div>
          </div>

          <div className="cw-card cw-metric-card">
            <span className="cw-metric-label">Ingressos vendidos</span>
            <span className="cw-metric-value">{totalIngressos}</span>
            <div className="d-flex justify-content-between align-items-center">
              <span className="cw-metric-extra">
                Total de ingressos registrados.
              </span>
              <span className="badge bg-success">
                R$ {totalFaturado.toFixed(2).replace(".", ",")}
              </span>
            </div>
          </div>
        </section>

        {/* ÚLTIMAS VENDAS */}
        <section className="mt-4">
          <div className="cw-page-header">
            <div>
              <h2 className="cw-page-title">Últimas vendas</h2>
              <p className="cw-page-subtitle">
                Lista das últimas movimentações de ingressos.
              </p>
            </div>
          </div>

          {ultimasVendas.length === 0 ? (
            <p className="text-muted">Nenhuma venda registrada ainda.</p>
          ) : (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Filme</th>
                    <th>Horário</th>
                    <th>Tipo</th>
                    <th>Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {ultimasVendas.map((v) => (
                    <tr key={v.id}>
                      <td>{v.filme}</td>
                      <td>{v.horario}</td>
                      <td>{v.tipo === "inteira" ? "Inteira" : "Meia"}</td>
                      <td>R$ {v.valor.toFixed(2).replace(".", ",")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
