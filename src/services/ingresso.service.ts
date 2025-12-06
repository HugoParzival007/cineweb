import axios from "axios";
import type { Ingresso } from "../models/Ingresso";

const API = "http://localhost:3000/ingressos";

export const criarIngresso = (ingresso: Omit<Ingresso, "id">) => axios.post(API, ingresso);

export const listarIngressos = () => axios.get<Ingresso[]>(API);
