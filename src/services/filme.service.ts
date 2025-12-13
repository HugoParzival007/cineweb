import axios from "axios";
import type { Filme } from "../models/Filme";

const API = "http://localhost:3000/filmes";

export const listarFilmes = () => axios.get<Filme[]>(API);

export const obterFilme = (id: string) => axios.get<Filme>(`${API}/${id}`);

export const criarFilme = (filme: Omit<Filme, "id">) => axios.post(API, filme);

export const atualizarFilme = (id: string, filme: Omit<Filme, "id">) =>
  axios.put(`${API}/${id}`, filme);

export const excluirFilme = (id: string) => axios.delete(`${API}/${id}`);
