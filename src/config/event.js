// ============================================================
//  CONFIGURAÇÃO DO CONVITE — edite aqui para personalizar
// ============================================================

export const CONFIG = {
  // ── Dados da festa ─────────────────────────────────────────
  name: "Ester",
  date: "03 de Junho",
  time: "19h00",
  venue: "Fazendinha Country Bar",
  address: "R. Gustavo Sampaio, 2500 - Parquelândia, Fortaleza - CE",
  mapsUrl: "https://maps.app.goo.gl/F9DAc69sAQUQaMAd8",

  // ── Texto do cartão ────────────────────────────────────────
  quote:
    '“Os melhores momentos da vida ficam ainda mais especiais quando compartilhados com pessoas queridas.”',
  thankYou: "Sua presença é especial",

  // ── Imagens ────────────────────────────────────────────────
  // Coloque seus arquivos em /public/images/ e atualize os caminhos abaixo.
  // Use null para mostrar o placeholder padrão.
  images: {
    // Foto principal da aniversariante (exibida no cartão)
    birthdayPerson: "/images/birthday-person.png",

    // Adesivos decorativos — substitua pelo caminho da sua imagem
    // ou mantenha null para usar o SVG embutido
    stickers: {
      cherries: "/images/sticker-cherries.png",   // null → SVG padrão
      disco: "/images/sticker-disco.png",          // null → SVG padrão
      lips: "/images/sticker-lips.png",           // null → SVG padrão
      happyBirthday: "/images/sticker-hbd.png",    // null → SVG padrão
      bow: null,  // adesivo extra (laço), null = não exibe
    },
  },

  // ── Multi-tenant ───────────────────────────────────────────
  // Identificador único para este evento. Usado como chave de
  // armazenamento, para que múltiplos eventos não se misturem.
  eventId: "Ester-birthday-2026",
};
