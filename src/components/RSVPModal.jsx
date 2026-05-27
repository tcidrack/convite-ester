import { useState } from "react";
import { useGuests } from "../hooks/useGuests";

export default function RSVPModal({ open, onClose, onConfirmed }) {
  const { addGuest } = useGuests();
  const [name, setName] = useState("");
  const [presence, setPresence] = useState(null);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    if (!name.trim()) { setError("Digite seu nome"); return; }
    if (!presence) { setError("Diga se vai comparecer!"); return; }
    setError("");
    await addGuest({ name: name.trim(), presence, message: message.trim() });
    onConfirmed?.();
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setName(""); setPresence(null); setMessage("");
    }, 3000);
  }

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div
      onClick={handleOverlayClick}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(10,3,3,0.85)",
        backdropFilter: "blur(8px)",
        zIndex: 100,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        opacity: open ? 1 : 0,
        pointerEvents: open ? "all" : "none",
        transition: "opacity 0.4s ease",
      }}
    >
      <div style={{
        background: "#faf7f0",
        width: "100%",
        maxWidth: 480,
        borderRadius: "30px 30px 0 0",
        padding: "30px 28px 50px",
        transform: open ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.5s cubic-bezier(0.34,1.2,0.64,1)",
      }}>
        {/* Handle */}
        <div style={{ width: 40, height: 4, background: "rgba(139,38,53,0.2)", borderRadius: 2, margin: "0 auto 24px" }}/>

        {submitted ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: "3rem", marginBottom: 12 }}>🌸</div>
            <div style={{ fontFamily: "'Pinyon Script',cursive", fontSize: "2rem", color: "#8b2635", marginBottom: 8 }}>Anotado!</div>
            <p style={{ color: "#6b3a2a", fontStyle: "italic", fontFamily: "'Cormorant Garamond',serif" }}>
              Obrigada pela confirmação, mal podemos esperar! 🎊
            </p>
          </div>
        ) : (
          <>
            <div style={{ fontFamily: "'Pinyon Script',cursive", fontSize: "2.2rem", color: "#8b2635", marginBottom: 4 }}>
              Confirmar presença
            </div>
            <p style={{ fontSize: "0.8rem", color: "#c4957a", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 24, fontFamily: "'Cormorant Garamond',serif" }}>
              Mal podemos esperar 🌸
            </p>

            {error && (
              <p style={{ color: "#8b2635", fontSize: "0.85rem", marginBottom: 12, fontFamily: "'Cormorant Garamond',serif" }}>{error}</p>
            )}

            <FormGroup label="Seu nome">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome aqui..."
                style={inputStyle}
              />
            </FormGroup>

            <FormGroup label="Vai comparecer?">
              <div style={{ display: "flex", gap: 10 }}>
                {[
                  { val: "yes", label: "🥂 Sim, estarei lá!" },
                  { val: "no",  label: "🥺 Não poderei ir"  },
                ].map(({ val, label }) => (
                  <button
                    key={val}
                    onClick={() => setPresence(val)}
                    style={{
                      ...radioStyle,
                      borderColor: presence === val ? "#8b2635" : "rgba(139,38,53,0.2)",
                      background: presence === val ? "rgba(139,38,53,0.1)" : "transparent",
                      color: presence === val ? "#5c1a1a" : "#6b3a2a",
                      fontWeight: presence === val ? 600 : 400,
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </FormGroup>

            <FormGroup label="Mensagem (opcional)">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Uma mensagem carinhosa..."
                style={inputStyle}
              />
            </FormGroup>

            <button onClick={handleSubmit} style={submitStyle}>
              Confirmar ✨
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function FormGroup({ label, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: "0.75rem", letterSpacing: "1.5px", textTransform: "uppercase", color: "#6b3a2a", marginBottom: 8, fontWeight: 600, fontFamily: "'Cormorant Garamond',serif" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px 18px",
  background: "rgba(139,38,53,0.05)",
  border: "1.5px solid rgba(139,38,53,0.15)",
  borderRadius: 12,
  fontFamily: "'Cormorant Garamond',serif",
  fontSize: "1rem",
  color: "#5c1a1a",
  outline: "none",
  boxSizing: "border-box",
};

const radioStyle = {
  flex: 1,
  padding: "12px 8px",
  border: "1.5px solid",
  borderRadius: 10,
  textAlign: "center",
  cursor: "pointer",
  fontSize: "0.88rem",
  transition: "all 0.3s",
  background: "transparent",
  fontFamily: "'Cormorant Garamond',serif",
};

const submitStyle = {
  width: "100%",
  padding: 16,
  marginTop: 20,
  background: "linear-gradient(135deg,#8b2635,#5c1a1a)",
  color: "#f5f0e8",
  border: "none",
  borderRadius: 50,
  fontFamily: "'Cormorant Garamond',serif",
  fontSize: "1rem",
  fontWeight: 600,
  letterSpacing: "2px",
  textTransform: "uppercase",
  cursor: "pointer",
};
