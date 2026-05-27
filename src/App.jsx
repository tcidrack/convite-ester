import { BrowserRouter, Routes, Route } from "react-router-dom";
import InvitePage from "./pages/InvitePage";
import GuestListPage from "./pages/GuestListPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Convite principal — compartilhado com os convidados */}
        <Route path="/" element={<InvitePage />} />

        {/* Lista de confirmados — link separado para a aniversariante */}
        <Route path="/convidados" element={<GuestListPage />} />

        {/* Rota alternativa: /guests (inglês) */}
        <Route path="/guests" element={<GuestListPage />} />
      </Routes>
    </BrowserRouter>
  );
}
