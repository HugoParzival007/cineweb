import axios from "axios";
import type { Pedido } from "../models/Pedido";

const API = "http://localhost:3000/pedidos";

// Lista todos os pedidos
export const listarPedidos = () => axios.get<Pedido[]>(API);

// Cria um pedido calculando o valorTotal
export const criarPedido = (
  pedido: Omit<Pedido, "id" | "valorTotal">
) => {
  const valorIngressos = pedido.ingressos.reduce(
    (acc, ing) => acc + ing.valor,
    0
  );

  const valorLanches = pedido.lanches.reduce(
    (acc, lanche) => acc + lanche.subtotal,
    0
  );

  const valorTotal = valorIngressos + valorLanches;

  return axios.post(API, {
    ...pedido,
    valorTotal,
  });
};
