import axios from "axios";
import type { Sala } from "../models/Sala";

const API = "http://localhost:3000/salas";

export const criarSala = (sala: Sala) => axios.post(API, sala);
export const listarSalas = () => axios.get(API);
