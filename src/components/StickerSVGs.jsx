export function CherriesSVG() {
  return (
    <svg viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <path d="M50 22 C44 14,28 12,26 20 C24 28,38 30,50 22Z" fill="#f5f0e8" stroke="#5c1a1a" strokeWidth="2"/>
      <path d="M50 22 C56 14,72 12,74 20 C76 28,62 30,50 22Z" fill="#f5f0e8" stroke="#5c1a1a" strokeWidth="2"/>
      <circle cx="50" cy="22" r="5" fill="#f5f0e8" stroke="#5c1a1a" strokeWidth="2"/>
      <path d="M40 30 C38 44,30 50,30 60" stroke="#5c1a1a" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M60 30 C62 44,70 50,68 62" stroke="#5c1a1a" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="30" cy="74" r="14" fill="#8b2635"/>
      <circle cx="68" cy="76" r="14" fill="#8b2635"/>
      <circle cx="27" cy="69" r="5" fill="#a83545" opacity="0.5"/>
      <circle cx="65" cy="71" r="5" fill="#a83545" opacity="0.5"/>
    </svg>
  );
}

export function DiscoSVG() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <radialGradient id="discog" cx="40%" cy="35%">
          <stop offset="0%" stopColor="#e8e8e8"/>
          <stop offset="100%" stopColor="#888"/>
        </radialGradient>
      </defs>
      <circle cx="40" cy="40" r="36" fill="url(#discog)"/>
      <g stroke="#ccc" strokeWidth="0.5">
        <line x1="4" y1="40" x2="76" y2="40"/>
        <line x1="40" y1="4" x2="40" y2="76"/>
        <line x1="14" y1="14" x2="66" y2="66"/>
        <line x1="66" y1="14" x2="14" y2="66"/>
        <line x1="4" y1="25" x2="76" y2="25"/>
        <line x1="4" y1="55" x2="76" y2="55"/>
        <line x1="25" y1="4" x2="25" y2="76"/>
        <line x1="55" y1="4" x2="55" y2="76"/>
      </g>
      <circle cx="25" cy="22" r="3" fill="white" opacity="0.9"/>
      <circle cx="55" cy="18" r="2" fill="white" opacity="0.7"/>
      <circle cx="60" cy="50" r="3" fill="white" opacity="0.8"/>
      <circle cx="20" cy="58" r="2" fill="white" opacity="0.6"/>
    </svg>
  );
}

export function LipsSVG() {
  return (
    <svg viewBox="0 0 90 55" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <path d="M5 22 C15 8,30 6,45 14 C60 6,75 8,85 22 C80 38,65 48,45 46 C25 48,10 38,5 22Z" fill="#8b2635"/>
      <path d="M20 22 C30 28,45 26,70 22" stroke="#5c1a1a" strokeWidth="2"/>
      <path d="M28 14 C35 18,45 16,62 14" fill="#a83545" opacity="0.5"/>
    </svg>
  );
}

export function HappyBirthdaySVG() {
  return (
    <svg viewBox="0 0 140 45" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect x="2" y="2" width="136" height="41" rx="6" fill="#2a2a2a" stroke="#888" strokeWidth="1.5"/>
      <text x="70" y="17" fontFamily="Arial Black,sans-serif" fontSize="11" fontWeight="900" fill="#d0d0d0" textAnchor="middle" letterSpacing="3">HAPPY</text>
      <text x="70" y="34" fontFamily="Arial Black,sans-serif" fontSize="11" fontWeight="900" fill="#d0d0d0" textAnchor="middle" letterSpacing="2">BIRTHDAY</text>
    </svg>
  );
}
