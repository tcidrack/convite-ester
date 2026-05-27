# 🍒 Ester Birthday — Convite Digital

Projeto React com duas rotas separadas: o convite para os convidados e a lista de presença para a aniversariante.

---

## Estrutura do projeto

```
src/
├── config/
│   └── event.js          ← ⭐ EDITE AQUI para personalizar tudo
├── pages/
│   ├── InvitePage.jsx    ← Página do convite (rota /)
│   └── GuestListPage.jsx ← Lista de convidados (rota /convidados)
├── components/
│   ├── EnvelopeScreen.jsx
│   ├── RSVPModal.jsx
│   ├── Sticker.jsx
│   └── StickerSVGs.jsx
├── hooks/
│   └── useGuests.js      ← Armazenamento multi-tenant (localStorage)
└── App.jsx               ← Rotas
```

---

## ⚡ Como rodar

```bash
npm install
npm start
```

---

## 📝 Personalização — `src/config/event.js`

Abra esse arquivo e edite:

| Campo         | O que faz                                      |
|---------------|------------------------------------------------|
| `name`        | Nome da aniversariante                         |
| `date`        | Data da festa                                  |
| `time`        | Horário                                        |
| `venue`       | Nome do local                                  |
| `address`     | Endereço completo                              |
| `mapsUrl`     | Link do Google Maps                            |
| `quote`       | Frase do cartão                                |
| `thankYou`    | Texto de agradecimento                         |
| `eventId`     | ID único do evento (separa dados no storage)   |

---

## 🖼️ Substituindo imagens e adesivos

Coloque seus arquivos em **`/public/images/`** e atualize os caminhos em `event.js`:

```js
images: {
  // Foto principal no cartão
  birthdayPerson: "/images/birthday-person.png",

  // Adesivos — coloque null para usar o SVG padrão
  stickers: {
    cherries:     "/images/sticker-cherries.png",
    disco:        "/images/sticker-disco.png",
    lips:         "/images/sticker-lips.png",
    happyBirthday:"/images/sticker-hbd.png",
    bow:          null,  // null = não exibe
  },
},
```

**Formatos aceitos:** PNG (recomendado, com fundo transparente), WebP, JPG.

---

## 🔗 Rotas

| URL            | Página                                    |
|----------------|-------------------------------------------|
| `/`            | Convite — compartilhe este link           |
| `/convidados`  | Lista de presença — só para você ver      |
| `/guests`      | Mesmo que `/convidados` (alias em inglês) |

---

## 🏢 Multi-tenant

O campo `eventId` em `event.js` é usado como chave de armazenamento.
Para criar um segundo evento, duplique o projeto e mude o `eventId`.
Cada evento terá sua própria lista de convidados isolada.

---

## 🚀 Deploy

```bash
npm run build
```

Sobe a pasta `build/` em qualquer host estático:
- **Vercel** (recomendado): `vercel --prod`
- **Netlify**: arraste a pasta `build/`
- **GitHub Pages**: use `gh-pages`

> ⚠️ No Vercel/Netlify, configure o redirect para SPA:
> todas as rotas `/*` → `index.html` (status 200).
