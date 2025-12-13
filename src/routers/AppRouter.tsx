import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";

import FilmesList from "../pages/filmes/FilmesList";
import FilmesForm from "../pages/filmes/FilmesForm";

import SalasList from "../pages/salas/SalasList";
import SalasForm from "../pages/salas/SalasForm";

import SessoesList from "../pages/sessoes/SessoesList";
import SessoesForm from "../pages/sessoes/SessoesForm";

import VendaIngresso from "../pages/sessoes/VendaIngresso";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* FILMES */}
      <Route path="/filmes" element={<FilmesList />} />
      <Route path="/filmes/novo" element={<FilmesForm />} />
      <Route path="/filmes/editar/:id" element={<FilmesForm />} />

      {/* SALAS */}
      <Route path="/salas" element={<SalasList />} />
      <Route path="/salas/nova" element={<SalasForm />} />
      <Route path="/salas/editar/:id" element={<SalasForm />} />

      {/* SESSÕES */}
      <Route path="/sessoes" element={<SessoesList />} />
      <Route path="/sessoes/nova" element={<SessoesForm />} />
      <Route path="/sessoes/:id/editar" element={<SessoesForm />} />
      <Route path="/sessoes/:id/vender" element={<VendaIngresso />} />
    </Routes>
  );
}
