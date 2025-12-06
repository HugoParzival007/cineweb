import axios from "axios";
import type { Sala } from "../models/Sala";

const API = "http://localhost:3000/salas";

export const listarSalas = () => axios.get<Sala[]>(API);

export const criarSala = (sala: Omit<Sala, "id">) => axios.post(API, sala);
