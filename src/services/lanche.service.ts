import axios from "axios";
import type { LancheCombo } from "../models/LancheCombo";

const API = "http://localhost:3000/lanches";

export const listarLanches = () => axios.get<LancheCombo[]>(API);
export const criarLanche = (lanche: Omit<LancheCombo, "id" | "subtotal">) =>
  axios.post(API, { ...lanche, subtotal: lanche.valorUnitario * lanche.qtUnidade });
export const deletarLanche = (id: string) => axios.delete(`${API}/${id}`);
export const obterLanche = (id: string) => axios.get<LancheCombo>(`${API}/${id}`);
export const atualizarLanche = (id: string, dados: Partial<LancheCombo>) =>
  axios.patch(`${API}/${id}`, dados);
