import axios from "axios";
import type { Sessao } from "../models/Sessao";

const API_URL = "http://localhost:3000/sessoes";

export const listarSessoes = () => axios.get<Sessao[]>(API_URL);

export const obterSessao = (id: string) => axios.get<Sessao>(`${API_URL}/${id}`);

export const criarSessao = (sessao: Omit<Sessao, "id">) =>
  axios.post(API_URL, sessao);

export const atualizarSessao = (id: string, sessao: Omit<Sessao, "id">) =>
  axios.put(`${API_URL}/${id}`, sessao);

export const deletarSessao = (id: string) =>
  axios.delete(`${API_URL}/${id}`);
