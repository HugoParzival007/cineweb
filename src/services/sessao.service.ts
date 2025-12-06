import axios from "axios";
import type  { Sessao } from "../models/Sessao";

const API = "http://localhost:3000/sessoes";

export const listarSessoes = () => axios.get(API);
export const criarSessao = (sessao: Sessao) => axios.post(API, sessao);
