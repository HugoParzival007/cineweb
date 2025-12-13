import type { Ingresso } from "./Ingresso";
import type { LancheCombo } from "./LancheCombo";

export interface Pedido {
  id: string;
  qtInteira: number;
  qtMeia: number;
  ingressos: Ingresso[];
  lanches: LancheCombo[];
  valorTotal: number;
}
