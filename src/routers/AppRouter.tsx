import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";

import FilmesList from "../pages/Filmes/FilmesList";
import FilmesForm from "../pages/Filmes/FilmesForm";

import SalasList from "../pages/Salas/SalasList";
import SalasForm from "../pages/Salas/SalasForm";

import SessoesList from "../pages/Sessoes/SessoesList";
import SessoesForm from "../pages/Sessoes/SessoesForm";
import VendaIngresso from "../pages/Sessoes/VendaIngresso";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/filmes" element={<FilmesList />} />
      <Route path="/filmes/novo" element={<FilmesForm />} />

      <Route path="/salas" element={<SalasList />} />
      <Route path="/salas/nova" element={<SalasForm />} />

      <Route path="/sessoes" element={<SessoesList />} />
      <Route path="/sessoes/nova" element={<SessoesForm />} />
      <Route path="/sessoes/:id/vender" element={<VendaIngresso />} />
    </Routes>
  );
}
