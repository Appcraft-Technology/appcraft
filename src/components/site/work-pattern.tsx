import type { PatternKey } from "./work-data";

export function PatternOverlay({ kind }: { kind: PatternKey }) {
  const stroke = "currentColor";
  return (
    <svg
      aria-hidden
      className="absolute inset-0 size-full text-ink opacity-[0.09]"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 200 120"
      fill="none"
      stroke={stroke}
      strokeWidth="1"
    >
      {kind === "grid" && (
        <>
          {[...Array(10)].map((_, i) => (
            <line key={`v${i}`} x1={i * 20} y1="0" x2={i * 20} y2="120" />
          ))}
          {[...Array(7)].map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 20} x2="200" y2={i * 20} />
          ))}
          <rect x="60" y="40" width="80" height="40" strokeWidth="1.5" />
        </>
      )}
      {kind === "speedo" && (
        <>
          <path d="M50 90a50 50 0 1 1 100 0" strokeWidth="2" />
          <path d="M100 90 138 58" strokeWidth="2" />
          <circle cx="100" cy="90" r="5" />
          {[...Array(9)].map((_, i) => {
            const a = Math.PI + (i * Math.PI) / 8;
            return (
              <line
                key={i}
                x1={100 + 42 * Math.cos(a)}
                y1={90 + 42 * Math.sin(a)}
                x2={100 + 50 * Math.cos(a)}
                y2={90 + 50 * Math.sin(a)}
              />
            );
          })}
        </>
      )}
      {kind === "wave" && (
        <>
          <path d="M0 60q12.5-40 25 0t25 0 25 0 25 0 25 0 25 0 25 0" strokeWidth="1.5" />
          <path d="M0 60q12.5 30 25 0t25 0 25 0 25 0 25 0 25 0 25 0" strokeWidth="1.5" />
          {[...Array(20)].map((_, i) => (
            <line
              key={i}
              x1={i * 10 + 5}
              y1={60 - (i % 5) * 6 - 6}
              x2={i * 10 + 5}
              y2={60 + (i % 5) * 6 + 6}
            />
          ))}
        </>
      )}
      {kind === "road" && (
        <>
          <path d="M60 120 90 0" strokeWidth="1.5" />
          <path d="M140 120 110 0" strokeWidth="1.5" />
          <path d="M100 120V0" strokeDasharray="8 10" strokeWidth="2" />
          <circle cx="100" cy="60" r="26" strokeWidth="1.5" />
          <path d="M74 60h52M100 60v26" />
        </>
      )}
      {kind === "quiz" && (
        <>
          {[...Array(4)].map((_, r) =>
            [...Array(7)].map((_, c) => (
              <text
                key={`${r}-${c}`}
                x={c * 28 + 10}
                y={r * 30 + 26}
                fontSize="18"
                fill={stroke}
                stroke="none"
              >
                ?
              </text>
            )),
          )}
        </>
      )}
      {kind === "route" && (
        <>
          <path d="M10 100q40-10 55-40t60-30 65 10" strokeDasharray="6 8" strokeWidth="1.5" />
          {(
            [
              [40, 92],
              [100, 42],
              [160, 32],
            ] as const
          ).map(([x, y]) => (
            <g key={`${x}`}>
              <path
                d={`M${x} ${y + 14}c8-10 12-14 12-21a12 12 0 1 0-24 0c0 7 4 11 12 21z`}
                strokeWidth="1.5"
              />
              <circle cx={x} cy={y - 7} r="4" />
            </g>
          ))}
        </>
      )}
    </svg>
  );
}
