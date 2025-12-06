import axios from "axios";
import type  { Filme } from "../models/Filme";

const API = "http://localhost:3000/filmes";

export const listarFilmes = () => axios.get(API);
export const criarFilme = (filme: Filme) => axios.post(API, filme);
export const apagarFilme = (id: number) => axios.delete(`${API}/${id}`);
