import axios from "axios";
import type { Sessao } from "../models/Sessao";

const API_URL = "http://localhost:3000/sessoes";

export function listarSessoes() {
  return axios.get<Sessao[]>(API_URL);
}

export function obterSessao(id: string) {
  return axios.get<Sessao>(`${API_URL}/${id}`);
}

export function criarSessao(sessao: Omit<Sessao, "id">) {
  return axios.post(API_URL, sessao);
}

export function atualizarSessao(id: string, sessao: Omit<Sessao, "id">) {
  return axios.put(`${API_URL}/${id}`, sessao);
}

export function deletarSessao(id: string) {
  return axios.delete(`${API_URL}/${id}`);
}
