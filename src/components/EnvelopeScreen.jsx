import { useState } from "react";

export default function EnvelopeScreen({ onOpen }) {
  const [opening, setOpening] = useState(false);

  function handleClick() {
    if (opening) return;
    setOpening(true);
    setTimeout(onOpen, 900);
  }

  return (
    <div style={{
      position: "fixed", inset: 0,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: 30, padding: 20,
    }}>
      <p style={{
        color: "#f5f0e8", fontFamily: "'Cormorant Garamond',serif",
        fontSize: "1.1rem", fontStyle: "italic", letterSpacing: "2px",
        animation: "fadeUp 1s ease 0.5s both",
      }}>
        Você tem uma carta especial 💌
      </p>

      <div
        onClick={handleClick}
        style={{
          cursor: "pointer",
          filter: "drop-shadow(0 20px 60px rgba(139,38,53,0.4))",
          animation: "fadeUp 1s ease 0.8s both",
          transition: "filter 0.4s",
        }}
        onMouseEnter={e => e.currentTarget.style.filter = "drop-shadow(0 30px 80px rgba(139,38,53,0.7))"}
        onMouseLeave={e => e.currentTarget.style.filter = "drop-shadow(0 20px 60px rgba(139,38,53,0.4))"}
      >
        <div style={{ width: 320, height: 220, position: "relative" }}>
          {/* Envelope body */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(145deg,#d4c5a9,#c4b08a)",
            borderRadius: 6,
            overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: 0, left: 0, bottom: 0, width: "50%",
              background: "linear-gradient(135deg,#b8a07a 50%,transparent 50%)",
              clipPath: "polygon(0 0,100% 50%,0 100%)",
            }}/>
            <div style={{
              position: "absolute", top: 0, right: 0, bottom: 0, width: "50%",
              background: "linear-gradient(225deg,#b8a07a 50%,transparent 50%)",
              clipPath: "polygon(100% 0,0 50%,100% 100%)",
            }}/>
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: 110,
              background: "linear-gradient(135deg,#c4b08a 50%,#b8a07a 50%)",
              clipPath: "polygon(0 100%,50% 0,100% 100%)",
            }}/>
          </div>

          {/* Top flap */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 130,
            background: "linear-gradient(160deg,#cdb99d,#b8a07a)",
            clipPath: "polygon(0 0,100% 0,50% 100%)",
            zIndex: 2,
            transformOrigin: "top center",
            transform: opening ? "rotateX(180deg)" : "rotateX(0deg)",
            transition: "transform 0.6s cubic-bezier(0.4,0,0.2,1)",
          }}/>

          {/* Selo — imagem selo.png */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: 56, height: 56,
            borderRadius: "50%",
            overflow: "hidden",
            zIndex: 3,
            animation: "pulseSeal 2s ease-in-out infinite",
          }}>
            <img
              src="/images/selo.png"
              alt="selo"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
              onError={e => {
                // Fallback se a imagem não existir
                e.currentTarget.style.display = "none";
                e.currentTarget.parentElement.style.background = "linear-gradient(135deg,#8b2635,#5c1a1a)";
                e.currentTarget.parentElement.style.borderRadius = "50%";
                e.currentTarget.parentElement.style.display = "flex";
                e.currentTarget.parentElement.style.alignItems = "center";
                e.currentTarget.parentElement.style.justifyContent = "center";
                e.currentTarget.parentElement.style.fontSize = "1.4rem";
                e.currentTarget.parentElement.style.boxShadow = "0 4px 20px rgba(139,38,53,0.5)";
                e.currentTarget.parentElement.innerHTML += "🌸";
              }}
            />
          </div>

          {/* Card peek */}
          <div style={{
            position: "absolute", bottom: 20, left: "50%",
            transform: opening
              ? "translateX(-50%) translateY(-200px)"
              : "translateX(-50%) translateY(0)",
            width: 260, height: 80,
            background: "#f5f0e8",
            borderRadius: 4, zIndex: 1,
            transition: "transform 0.8s cubic-bezier(0.4,0,0.2,1) 0.3s",
          }}/>
        </div>
      </div>

      <p style={{
        color: "#c4957a", fontSize: "0.85rem",
        letterSpacing: "3px", textTransform: "uppercase",
        fontFamily: "'Cormorant Garamond',serif",
        animation: "blink 2s ease-in-out infinite",
      }}>
        toque para abrir
      </p>
    </div>
  );
}
