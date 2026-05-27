import { useGuests } from "../hooks/useGuests";
import { CONFIG } from "../config/event";

export default function GuestListPage() {
  const { guests, stats } = useGuests();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Pinyon+Script&family=Playfair+Display:wght@400;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }
        body { background:#1a0a0a; font-family:'Cormorant Garamond',serif; }
        ::-webkit-scrollbar { width:3px; }
        ::-webkit-scrollbar-thumb { background:rgba(139,38,53,0.4); border-radius:2px; }
        @keyframes slideIn {
          from { opacity:0; transform:translateX(-20px); }
          to   { opacity:1; transform:translateX(0); }
        }
      `}</style>

      {/* Background */}
      <div style={{
        position:"fixed", inset:0, pointerEvents:"none",
        background:`
          radial-gradient(ellipse at 20% 50%,rgba(139,38,53,0.12) 0%,transparent 60%),
          radial-gradient(ellipse at 80% 80%,rgba(196,149,122,0.08) 0%,transparent 50%)
        `,
      }}/>

      <div style={{ minHeight:"100vh", padding:"40px 20px 60px", overflowY:"auto" }}>
        <div style={{ maxWidth:520, margin:"0 auto" }}>

          {/* Header */}
          <div style={{ textAlign:"center", marginBottom:36 }}>
            <div style={{
              display:"inline-block",
              background:"rgba(139,38,53,0.12)",
              border:"1px solid rgba(139,38,53,0.25)",
              borderRadius:50, padding:"6px 18px",
              fontSize:"0.7rem", letterSpacing:"2.5px",
              textTransform:"uppercase", color:"#c4957a",
              marginBottom:16, fontFamily:"'Cormorant Garamond',serif",
            }}>
              {CONFIG.eventId}
            </div>
            <div style={{ fontFamily:"'Pinyon Script',cursive", fontSize:"3rem", color:"#f5f0e8", display:"block", lineHeight:1.1 }}>
              Lista de Convidados
            </div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1rem", color:"#c4957a", fontStyle:"italic", marginTop:6 }}>
              {CONFIG.name} Birthday · {CONFIG.date}
            </div>
          </div>

          {/* Stats */}
          <div style={{ display:"flex", gap:12, marginBottom:28 }}>
            {[
              { num: stats.total, label: "Total",     color: "#f5f0e8" },
              { num: stats.yes,   label: "Presentes", color: "#7acc7a" },
              { num: stats.no,    label: "Não vão",   color: "#e88" },
            ].map(({ num, label, color }) => (
              <div key={label} style={{
                flex:1, background:"rgba(245,240,232,0.06)",
                border:"1px solid rgba(245,240,232,0.1)",
                borderRadius:14, padding:"18px 12px", textAlign:"center",
              }}>
                <span style={{ fontFamily:"'Playfair Display',serif", fontSize:"2.2rem", color, display:"block", lineHeight:1 }}>{num}</span>
                <span style={{ fontSize:"0.7rem", color:"#c4957a", letterSpacing:"1.5px", textTransform:"uppercase", marginTop:4, display:"block" }}>{label}</span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:24 }}>
            <div style={{ flex:1, height:1, background:"linear-gradient(to right,transparent,rgba(245,240,232,0.15))" }}/>
            <span style={{ color:"#8b2635", fontSize:"1rem" }}>🌸</span>
            <div style={{ flex:1, height:1, background:"linear-gradient(to left,transparent,rgba(245,240,232,0.15))" }}/>
          </div>

          {/* Guest list */}
          {guests.length === 0 ? (
            <EmptyState />
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {guests.map((g, i) => (
                <GuestItem key={g.id} guest={g} index={i} />
              ))}
            </div>
          )}

          {/* Footer link */}
          <div style={{ textAlign:"center", marginTop:36 }}>
            <a
              href="/"
              style={{
                color:"#c4957a", fontFamily:"'Cormorant Garamond',serif",
                fontStyle:"italic", fontSize:"0.9rem",
                textDecoration:"none", letterSpacing:"1px",
                borderBottom:"1px solid rgba(196,149,122,0.3)",
                paddingBottom:2,
              }}
            >
              ← Voltar ao convite
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

function GuestItem({ guest, index }) {
  const isYes = guest.presence === "yes";
  const text = guest.message || (isYes ? "Estarei lá! 🥂" : "Não poderei ir 🥺");

  return (
    <div style={{
      background:"rgba(245,240,232,0.06)",
      border:"1px solid rgba(245,240,232,0.09)",
      borderRadius:14, padding:"14px 18px",
      display:"flex", alignItems:"flex-start", gap:14,
      animation:`slideIn 0.4s ease ${index * 0.05}s both`,
    }}>
      {/* Avatar */}
      <div style={{
        width:44, height:44, borderRadius:"50%",
        background:"linear-gradient(135deg,#8b2635,#5c1a1a)",
        display:"flex", alignItems:"center", justifyContent:"center",
        fontFamily:"'Playfair Display',serif", fontSize:"1.1rem",
        color:"#f5f0e8", fontWeight:700, flexShrink:0,
      }}>
        {guest.name.charAt(0).toUpperCase()}
      </div>

      {/* Info */}
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ color:"#f5f0e8", fontSize:"1rem", fontFamily:"'Cormorant Garamond',serif" }}>{guest.name}</div>
        <div style={{ color:"#c4957a", fontSize:"0.78rem", marginTop:2, fontStyle:"italic" }}>
          {text}
        </div>
        <div style={{ color:"rgba(196,149,122,0.55)", fontSize:"0.7rem", marginTop:3 }}>{guest.time}</div>
      </div>

      {/* Badge */}
      <span style={{
        fontSize:"0.7rem", padding:"4px 10px", borderRadius:50,
        letterSpacing:"1px", textTransform:"uppercase", fontWeight:600, flexShrink:0,
        background: isYes ? "rgba(74,130,74,0.2)" : "rgba(139,38,53,0.2)",
        color:       isYes ? "#7acc7a"             : "#e88",
        border:      `1px solid ${isYes ? "rgba(74,130,74,0.3)" : "rgba(139,38,53,0.3)"}`,
      }}>
        {isYes ? "✓ Sim" : "✗ Não"}
      </span>
    </div>
  );
}

function EmptyState() {
  return (
    <div style={{
      textAlign:"center", padding:"50px 20px",
      color:"#c4957a", fontStyle:"italic",
      fontFamily:"'Cormorant Garamond',serif", fontSize:"1.05rem", lineHeight:1.8,
    }}>
      <div style={{ fontSize:"2.5rem", marginBottom:12 }}>🌸</div>
      Nenhuma confirmação ainda<br/>
      <span style={{ fontSize:"0.9rem", opacity:0.7 }}>Compartilhe o convite para que as pessoas confirmem presença!</span>
    </div>
  );
}
