const PATH_400_700 = `M 0,12 C 30,0 60,0 90,12 C 120,24 150,24 180,12 C 210,0 240,0 270,12 C 300,24 330,24 360,12 C 380,4 392,4 400,12 C 394,40 394,70 400,100 C 406,130 406,160 400,190 C 394,220 394,250 400,280 C 406,310 406,340 400,370 C 394,400 394,430 400,460 C 406,490 406,520 400,550 C 394,580 394,610 400,640 C 406,665 406,680 400,690 C 360,700 320,700 280,690 C 240,680 200,680 160,690 C 120,700 80,700 40,690 C 20,694 10,694 0,690 C 6,660 6,630 0,600 C -6,570 -6,540 0,510 C 6,480 6,450 0,420 C -6,390 -6,360 0,330 C 6,300 6,270 0,240 C -6,210 -6,180 0,150 C 6,120 6,90 0,60 C -6,35 -6,20 0,12 Z`;

export default function WavyCard({ children, bg = "#faf7f0", style = {} }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        background: bg,
        borderRadius: 28,
        ...style,
      }}
    >
      {/* Borda ondulada pontilhada decorativa por cima */}
      <svg
        viewBox="-8 -12 416 724"
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "2% 3%",
          width: "94%",
          height: "96%",
          pointerEvents: "none",
          zIndex: 2,
        }}
      >
        <path
          d={PATH_400_700}
          fill="none"
          stroke="rgba(139,38,53,0.2)"
          strokeWidth="5"
          strokeDasharray="12 12"
        />
      </svg>

      <div style={{ position: "relative", zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}
