import { useId } from "react";

type FolkSectionBackgroundProps = {
  variant?: "warm" | "cream" | "gold";
};

/**
 * Soft Andhra folk / temple-architecture atmosphere for section backs:
 * jali lattice, kolam corners, torana arches, and faint gopuram outlines.
 */
export default function FolkSectionBackground({
  variant = "warm",
}: FolkSectionBackgroundProps) {
  const uid = useId().replace(/:/g, "");
  const jaliId = `folk-jali-${uid}`;

  const wash =
    variant === "gold"
      ? "from-[#fff8e8] via-[#faf0d8] to-[#f5e6c4]"
      : variant === "cream"
        ? "from-[#fffaf0] via-[#fff6e4] to-[#f8edd4]"
        : "from-[#fffdf7] via-[#faf3e0] to-[#f3e7c9]";

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Warm wash */}
      <div className={`absolute inset-0 bg-gradient-to-b ${wash}`} />

      {/* Jali / lattice pattern */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.07]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={jaliId}
            x="0"
            y="0"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M24 2 L46 24 L24 46 L2 24 Z"
              fill="none"
              stroke="#92650a"
              strokeWidth="1"
            />
            <circle cx="24" cy="24" r="3" fill="#d4af37" />
            <path
              d="M24 10 L38 24 L24 38 L10 24 Z"
              fill="none"
              stroke="#b8860b"
              strokeWidth="0.6"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${jaliId})`} />
      </svg>

      {/* Kolam corner — top left */}
      <svg
        className="absolute -left-6 -top-6 h-44 w-44 text-[var(--gold)] opacity-[0.18] md:h-56 md:w-56"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="40" cy="40" r="28" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="40" cy="40" r="18" stroke="currentColor" strokeWidth="1" />
        <circle cx="40" cy="40" r="6" fill="currentColor" />
        <path
          d="M40 8 C70 8 92 30 92 60"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M8 40 C8 70 30 92 60 92"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M40 16 L48 40 L40 64 L32 40 Z"
          stroke="currentColor"
          strokeWidth="1"
        />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const x2 = 40 + Math.cos(rad) * 34;
          const y2 = 40 + Math.sin(rad) * 34;
          return (
            <line
              key={deg}
              x1="40"
              y1="40"
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth="0.8"
            />
          );
        })}
      </svg>

      {/* Kolam corner — bottom right */}
      <svg
        className="absolute -bottom-8 -right-8 h-48 w-48 rotate-180 text-[var(--maroon)] opacity-[0.14] md:h-60 md:w-60"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="40" cy="40" r="30" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="40" cy="40" r="20" stroke="currentColor" strokeWidth="1" />
        <path
          d="M40 12 C55 20 68 33 72 50 M12 40 C20 55 33 68 50 72"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <circle cx="40" cy="40" r="5" fill="currentColor" />
      </svg>

      {/* Torana / arch — left edge */}
      <svg
        className="absolute bottom-0 left-0 hidden h-[70%] w-28 text-[var(--gold)] opacity-[0.12] md:block lg:w-36"
        viewBox="0 0 120 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMinYMax meet"
      >
        {/* Pillar */}
        <rect x="28" y="140" width="18" height="240" stroke="currentColor" strokeWidth="1.5" />
        <rect x="24" y="130" width="26" height="12" stroke="currentColor" strokeWidth="1.2" />
        <rect x="20" y="370" width="34" height="14" stroke="currentColor" strokeWidth="1.2" />
        {/* Arch */}
        <path
          d="M37 140 C37 80 83 80 83 140"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M37 140 C37 95 83 95 83 140"
          stroke="currentColor"
          strokeWidth="1"
        />
        {/* Right pillar of pair */}
        <rect x="74" y="140" width="18" height="240" stroke="currentColor" strokeWidth="1.5" />
        <rect x="70" y="130" width="26" height="12" stroke="currentColor" strokeWidth="1.2" />
        <rect x="66" y="370" width="34" height="14" stroke="currentColor" strokeWidth="1.2" />
        {/* Kalasha finial */}
        <ellipse cx="60" cy="72" rx="10" ry="6" stroke="currentColor" strokeWidth="1.2" />
        <path d="M60 66 L60 48" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="60" cy="46" r="3" fill="currentColor" />
      </svg>

      {/* Torana / arch — right edge (mirrored) */}
      <svg
        className="absolute bottom-0 right-0 hidden h-[70%] w-28 scale-x-[-1] text-[var(--maroon)] opacity-[0.1] md:block lg:w-36"
        viewBox="0 0 120 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMinYMax meet"
      >
        <rect x="28" y="140" width="18" height="240" stroke="currentColor" strokeWidth="1.5" />
        <rect x="24" y="130" width="26" height="12" stroke="currentColor" strokeWidth="1.2" />
        <rect x="20" y="370" width="34" height="14" stroke="currentColor" strokeWidth="1.2" />
        <path
          d="M37 140 C37 80 83 80 83 140"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <rect x="74" y="140" width="18" height="240" stroke="currentColor" strokeWidth="1.5" />
        <rect x="70" y="130" width="26" height="12" stroke="currentColor" strokeWidth="1.2" />
        <rect x="66" y="370" width="34" height="14" stroke="currentColor" strokeWidth="1.2" />
        <ellipse cx="60" cy="72" rx="10" ry="6" stroke="currentColor" strokeWidth="1.2" />
        <path d="M60 66 L60 48" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="60" cy="46" r="3" fill="currentColor" />
      </svg>

      {/* Soft gopuram skyline along bottom */}
      <svg
        className="absolute bottom-0 left-1/2 h-24 w-[120%] -translate-x-1/2 text-[var(--maroon)] opacity-[0.08] md:h-32"
        viewBox="0 0 1200 160"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path d="M0 160 L0 120 L40 120 L60 70 L80 120 L140 120 L160 50 L180 30 L200 50 L220 120 L300 120 L320 80 L340 120 L420 120 L450 40 L470 20 L490 40 L520 120 L600 120 L630 60 L660 120 L740 120 L770 45 L790 25 L810 45 L840 120 L920 120 L950 75 L980 120 L1060 120 L1090 55 L1110 35 L1130 55 L1160 120 L1200 120 L1200 160 Z" />
      </svg>

      {/* Soft vignette so content stays readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/50" />
    </div>
  );
}
