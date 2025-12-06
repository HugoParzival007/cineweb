import axios from "axios";
import type { Filme } from "../models/Filme";

const API = "http://localhost:3000/filmes";

export const listarFilmes = () => axios.get<Filme[]>(API);

export const criarFilme = (filme: Omit<Filme, "id">) => axios.post(API, filme);

export const excluirFilme = (id: string) => axios.delete(`${API}/${id}`);
