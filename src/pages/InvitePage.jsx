import { useState } from "react";
import EnvelopeScreen from "../components/EnvelopeScreen";
import Sticker from "../components/Sticker";
import RSVPModal from "../components/RSVPModal";
import WavyCard from "../components/WavyCard";
import { CONFIG } from "../config/event";

const CONFIRMED_KEY = `confirmed_${CONFIG.eventId}`;

export default function InvitePage() {
  const [opened, setOpened] = useState(false);
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [hasConfirmed, setHasConfirmed] = useState(
    () => !!localStorage.getItem(CONFIRMED_KEY)
  );
  const { images } = CONFIG;

  function handleConfirmed() {
    localStorage.setItem(CONFIRMED_KEY, "1");
    setHasConfirmed(true);
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Pinyon+Script&family=Playfair+Display:ital,wght@0,700;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }
        html, body { overflow-x: hidden; }
        body { font-family:'Cormorant Garamond',serif; background:#1a0a0a; min-height:100vh; }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes blink {
          0%,100% { opacity:1; } 50% { opacity:0.4; }
        }
        @keyframes pulseSeal {
          0%,100% { box-shadow:0 0 0 0px rgba(139,38,53,0.0), 0 4px 20px rgba(139,38,53,0.5); }
          50%     { box-shadow:0 0 0 10px rgba(139,38,53,0.18), 0 4px 40px rgba(139,38,53,0.8); }
        }
        @keyframes cardReveal {
          from { opacity:0; transform:translateY(40px) scale(0.9); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        @keyframes stickerIn {
          from { opacity:0; transform:scale(0) rotate(var(--rot,0deg)); }
          to   { opacity:1; transform:scale(1) rotate(var(--rot,0deg)); }
        }
        .card-inner { padding: 50px 40px 80px; position: relative; }
        @media (max-width: 480px) {
          .card-inner { padding: 36px 20px 80px; }
        }
      `}</style>

      <div style={{
        position:"fixed", inset:0, pointerEvents:"none",
        background:`
          radial-gradient(ellipse at 20% 50%,rgba(139,38,53,0.15) 0%,transparent 60%),
          radial-gradient(ellipse at 80% 20%,rgba(92,26,26,0.2) 0%,transparent 50%),
          radial-gradient(ellipse at 60% 80%,rgba(196,149,122,0.1) 0%,transparent 50%)
        `,
      }}/>

      {!opened && <EnvelopeScreen onOpen={() => setOpened(true)} />}

      {opened && (
        <div
          data-scroll-container
          style={{
            minHeight:"100vh", display:"flex", alignItems:"flex-start",
            justifyContent:"center", padding:"50px 24px 70px", overflowY:"auto", overflowX:"hidden",
          }}
        >
          <div style={{
            position:"relative", maxWidth:420, width:"100%",
            animation:"cardReveal 0.8s cubic-bezier(0.34,1.56,0.64,1) both",
            filter:"drop-shadow(0 20px 50px rgba(0,0,0,0.5)) drop-shadow(0 6px 16px rgba(139,38,53,0.2))",
          }}>
            <Sticker slot="cherries"      src={images.stickers.cherries} />
            <Sticker slot="disco"         src={images.stickers.disco} />
            <Sticker slot="lips"          src={images.stickers.lips} />
            <Sticker slot="happyBirthday" src={images.stickers.happyBirthday} />
            {images.stickers.bow && <Sticker slot="bow" src={images.stickers.bow} />}

            {/*
              amp=14 → ondas de 14px
              O padding inferior do conteúdo (80px) garante que os botões
              fiquem bem acima da onda inferior, nunca cortados
            */}
            <WavyCard
              innerBorder
              style={{
                background: "#f8f4ee",
                boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
              }}
            >
              <div className="card-inner">

                {/* Nome */}
                <div style={{ fontFamily:"'Pinyon Script',cursive", fontSize:"3.2rem", color:"#8b2635", textAlign:"center", lineHeight:1, marginBottom:2 }}>
                  {CONFIG.name}
                </div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.8rem", fontWeight:700, color:"#5c1a1a", textAlign:"center", letterSpacing:"6px", marginBottom:30 }}>
                  BIRTHDAY
                </div>

                <Divider />

                <p style={{
                  fontFamily:"'Cormorant Garamond',serif",
                  fontSize:"1.05rem", color:"#6b3a2a",
                  textAlign:"center", lineHeight:1.7,
                  fontStyle:"italic", letterSpacing:"0.5px",
                  textTransform:"uppercase", margin:"20px 0",
                }}>
                  {CONFIG.quote}
                </p>

                {/* Foto */}
                <div style={{ display:"flex", justifyContent:"center", margin:"25px 0 15px" }}>
                  <div style={{
                    width:100, height:120,
                    borderRadius:"50% 50% 50% 50% / 40% 40% 60% 60%",
                    background:"linear-gradient(135deg,#e8ddd0,#d4c5b0)",
                    display:"flex", flexDirection:"column",
                    alignItems:"center", justifyContent:"center",
                    overflow:"hidden", position:"relative",
                    boxShadow:"4px 8px 24px rgba(92,26,26,0.2)",
                  }}>
                    {images.birthdayPerson ? (
                      <img
                        src={images.birthdayPerson}
                        alt={CONFIG.name}
                        style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top center" }}
                        onError={e => { e.currentTarget.style.display="none"; }}
                      />
                    ) : (
                      <span style={{ fontSize:"0.65rem", color:"#8b5a4a", letterSpacing:"1px", textAlign:"center", padding:"0 8px" }}>
                        Adicione sua foto
                      </span>
                    )}
                  </div>
                </div>

                {/* Gracias */}
                <div style={{ fontFamily:"'Pinyon Script',cursive", fontSize:"2rem", color:"#8b2635", textAlign:"center", margin:"25px 0 20px", lineHeight:1.2 }}>
                  {CONFIG.thankYou}
                </div>

                {/* Info */}
                <div style={{ margin:"0 0 28px", padding:20, background:"rgba(139,38,53,0.05)", borderRadius:12, border:"1px solid rgba(139,38,53,0.12)" }}>
                  {[
                    { icon:"🗓️", label:"Data",    value:CONFIG.date },
                    { icon:"🕰️", label:"Horário", value:CONFIG.time },
                    { icon:"📌", label:"Local",   value:CONFIG.venue },
                  ].map(({ icon, label, value }, i, arr) => (
                    <div key={label} style={{
                      display:"flex", alignItems:"center", gap:12, padding:"8px 0",
                      borderBottom: i < arr.length - 1 ? "1px solid rgba(139,38,53,0.08)" : "none",
                    }}>
                      <span style={{ fontSize:"1.2rem", width:24, textAlign:"center" }}>{icon}</span>
                      <div>
                        <strong style={{ display:"block", fontSize:"0.75rem", letterSpacing:"1.5px", textTransform:"uppercase", color:"#5c1a1a", fontFamily:"'Cormorant Garamond',serif" }}>{label}</strong>
                        <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1rem", color:"#6b3a2a" }}>{value}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Botões — padding bottom de 80px garante espaço acima das ondas */}
                <div style={{ display:"flex", gap:12, width:"100%", justifyContent:"center" }}>
                  <Btn
                    onClick={() => window.open(CONFIG.mapsUrl, "_blank")}
                    bg="linear-gradient(135deg,#4a4a4a,#2d2d2d)"
                    color="#f0e8d8"
                  >
                    🗺️ Localização
                  </Btn>
                  {hasConfirmed ? (
                    <ConfirmedBadge />
                  ) : (
                    <Btn
                      onClick={() => setRsvpOpen(true)}
                      bg="linear-gradient(135deg,#8b2635,#5c1a1a)"
                      color="#f5f0e8"
                    >
                      💌 Confirmar
                    </Btn>
                  )}
                </div>

              </div>
            </WavyCard>
          </div>
        </div>
      )}

      <RSVPModal
        open={rsvpOpen}
        onClose={() => setRsvpOpen(false)}
        onConfirmed={handleConfirmed}
      />
    </>
  );
}

function Divider() {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:12, margin:"20px 0" }}>
      <div style={{ flex:1, height:1, background:"linear-gradient(to right,transparent,rgba(139,38,53,0.3),transparent)" }}/>
      <span style={{ fontSize:"1rem", color:"#8b2635" }}>🌸</span>
      <div style={{ flex:1, height:1, background:"linear-gradient(to right,rgba(139,38,53,0.3),transparent)" }}/>
    </div>
  );
}

function ConfirmedBadge() {
  return (
    <div style={{
      flex:1, padding:"14px 16px", borderRadius:50,
      background:"linear-gradient(135deg,rgba(74,130,74,0.18),rgba(74,130,74,0.08))",
      border:"1.5px solid rgba(74,130,74,0.4)",
      display:"flex", alignItems:"center", justifyContent:"center", gap:6,
      fontFamily:"'Cormorant Garamond',serif", fontSize:"0.9rem",
      fontWeight:600, letterSpacing:"1.5px", textTransform:"uppercase",
      color:"#7acc7a", userSelect:"none",
    }}>
      ✓ Confirmado
    </div>
  );
}

function Btn({ onClick, bg, color, children }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flex:1, padding:"14px 16px", border:"none", borderRadius:50,
        fontFamily:"'Cormorant Garamond',serif", fontSize:"0.9rem",
        fontWeight:600, letterSpacing:"1.5px", textTransform:"uppercase",
        cursor:"pointer", transition:"all 0.3s ease",
        background: bg, color,
        transform: hov ? "translateY(-2px)" : "none",
        boxShadow: hov ? "0 8px 24px rgba(0,0,0,0.3)" : "none",
      }}
    >
      {children}
    </button>
  );
}
