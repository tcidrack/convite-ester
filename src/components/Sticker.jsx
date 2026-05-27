import { useEffect, useRef, useState } from "react";
import { CherriesSVG, DiscoSVG, LipsSVG, HappyBirthdaySVG } from "./StickerSVGs";

const FALLBACKS = {
  cherries: CherriesSVG,
  disco: DiscoSVG,
  lips: LipsSVG,
  happyBirthday: HappyBirthdaySVG,
};

// Tamanhos em % da largura do card para escalar com a tela
const SLOT_STYLES = {
  cherries: {
    top: "-4%", left: "-4%",
    width: "30%",
    "--rot": "-10deg",
    animationDelay: "0.3s",
  },
  disco: {
    top: "-6%", right: "-10%",
    width: "40%",
    "--rot": "8deg",
    animationDelay: "0.5s",
  },
  lips: {
    top: "50%", right: "-10%",
    width: "35%",
    "--rot": "5deg",
    animationDelay: "0.7s",
  },
  happyBirthday: {
    bottom: "-2%", right: "-4%",
    width: "40%",
    "--rot": "-5deg",
    animationDelay: "0.9s",
  },
  bow: {
    top: "-3%", left: "50%",
    transform: "translateX(-50%)",
    width: "18%",
    "--rot": "0deg",
    animationDelay: "1.1s",
  },
};

// Cada slot tem seu próprio fator de resposta ao scroll para ficar orgânico
const SCROLL_FACTOR = {
  cherries:     0.00018,
  disco:        0.00014,
  lips:         0.00016,
  happyBirthday:0.00012,
  bow:          0.00010,
};

export default function Sticker({ slot, src }) {
  if (slot === "bow" && !src) return null;

  const slotStyle = SLOT_STYLES[slot] || {};
  const Fallback = FALLBACKS[slot];
  const factor = SCROLL_FACTOR[slot] ?? 0.00015;

  const [scale, setScale] = useState(1);
  const rafRef = useRef(null);

  useEffect(() => {
    const container = document.querySelector("[data-scroll-container]");

    function onScroll() {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        // Em mobile o scroll fica dentro do container; em desktop vai para window
        const y = Math.max(
          window.scrollY,
          container ? container.scrollTop : 0
        );
        const grow = Math.min(y * factor, 0.12);
        setScale(1 + grow);
      });
    }

    // Escuta os dois para cobrir mobile e desktop
    window.addEventListener("scroll", onScroll, { passive: true });
    if (container) container.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (container) container.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [factor]);

  const rot = slotStyle["--rot"] || "0deg";

  // Para o slot "bow" o transform base já tem translateX
  const baseTransform = slot === "bow"
    ? `translateX(-50%) rotate(${rot}) scale(${scale})`
    : `rotate(${rot}) scale(${scale})`;

  // Remove "--rot" e "transform" do spread para não conflitar
  const { "--rot": _rot, transform: _tf, animationDelay, ...restSlot } = slotStyle;

  return (
    <div
      style={{
        position: "absolute",
        zIndex: 10,
        filter: "drop-shadow(2px 4px 8px rgba(0,0,0,0.3))",
        transform: baseTransform,
        transition: "transform 0.25s ease-out",
        animation: `stickerIn 0.6s cubic-bezier(0.34,1.56,0.64,1) ${animationDelay || "0s"} both`,
        maxWidth: "35vw",
        ...restSlot,
      }}
    >
      {src ? (
        <img
          src={src}
          alt={slot}
          style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />
      ) : Fallback ? (
        <Fallback />
      ) : null}
    </div>
  );
}
