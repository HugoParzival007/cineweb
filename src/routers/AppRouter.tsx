import { BrowserRouter, Routes, Route } from "react-router-dom";
import FilmesList from "../pages/filmes/FilmesList";
import FilmesForm from "../pages/filmes/FilmesForm";
import SalasForm from "../pages/salas/SalasForm";
import SalasList from "../pages/salas/SalasList";
import SessoesList from "../pages/sessoes/SessoesList";
import SessoesForm from "../pages/sessoes/SessoesForm";
import VendaIngresso from "../pages/sessoes/VendaIngresso";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Bem-vindo ao CineWeb</h1>} />

        <Route path="/filmes" element={<FilmesList />} />
        <Route path="/filmes/novo" element={<FilmesForm />} />

        <Route path="/salas" element={<SalasList />} />
        <Route path="/salas/nova" element={<SalasForm />} />

        <Route path="/sessoes" element={<SessoesList />} />
        <Route path="/sessoes/nova" element={<SessoesForm />} />

        <Route path="/sessoes/:id/vender" element={<VendaIngresso />} />
      </Routes>
    </BrowserRouter>
  );
}
