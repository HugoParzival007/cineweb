import axios from "axios";
import type { Sala } from "../models/Sala";

const API = "http://localhost:3000/salas";

export const listarSalas = () => axios.get<Sala[]>(API);

export const obterSala = (id: string) => axios.get<Sala>(`${API}/${id}`);

export const criarSala = (sala: Omit<Sala, "id">) => axios.post(API, sala);

export const atualizarSala = (id: string, sala: Omit<Sala, "id">) =>
  axios.put(`${API}/${id}`, sala);

export const excluirSala = (id: string) => axios.delete(`${API}/${id}`);
