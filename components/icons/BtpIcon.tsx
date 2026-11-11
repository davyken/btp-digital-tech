import type { IconName } from "@/lib/content";

/**
 * Hand-built construction icon set.
 * Style rules: 32×32 grid, 2px stroke, square caps, mitred joins,
 * plus one offset "pixel block" (from the logo) in an accent colour.
 */
const paths: Record<IconName, { block: [number, number, number, number]; d: React.ReactNode }> = {
  screen: {
    block: [18, 4, 9, 7],
    d: (
      <>
        <path d="M5 8h22v14H5z" />
        <path d="M2 26h28" />
        <path d="M10 18l4-5 3 3 4-6" />
        <path d="M21 10h2v2" />
      </>
    ),
  },
  crate: {
    block: [3, 3, 8, 8],
    d: (
      <>
        <path d="M5 12h22v16H5z" />
        <path d="M5 12l4-6h14l4 6" />
        <path d="M13 12v6h6v-6" />
        <path d="M9 24h5" />
      </>
    ),
  },
  wrench: {
    block: [19, 19, 9, 9],
    d: (
      <>
        <path d="M20 4a6 6 0 0 0-5.6 8.2L4 22.6V28h5.4l10.4-10.4A6 6 0 0 0 28 12l-4 4-4-1-1-4 4-4a6 6 0 0 0-3-3z" />
      </>
    ),
  },
  excavator: {
    block: [4, 5, 8, 6],
    d: (
      <>
        <path d="M4 22h16v5H4z" />
        <path d="M6 22v-6h9l2 6" />
        <path d="M15 16l6-9 7 6" />
        <path d="M28 13v5l-3 1" />
        <path d="M8 27v0M16 27v0" />
      </>
    ),
  },
  beam: {
    block: [20, 3, 8, 8],
    d: (
      <>
        <path d="M3 8h26M3 24h26" />
        <path d="M16 8v16" />
        <path d="M9 8v4M23 8v4M9 24v-4M23 24v-4" />
        <path d="M5 28h22" strokeDasharray="2 2" />
      </>
    ),
  },
  key: {
    block: [3, 18, 9, 9],
    d: (
      <>
        <circle cx="10" cy="22" r="5" />
        <path d="M14 18L27 5" />
        <path d="M22 10l3 3M25 7l3 3" />
        <path d="M4 4h8v6" />
      </>
    ),
  },
  compass: {
    block: [19, 20, 9, 8],
    d: (
      <>
        <circle cx="16" cy="6" r="2" />
        <path d="M15 8L7 28M17 8l8 20" />
        <path d="M9 22c4 2 10 2 14 0" />
        <path d="M16 2v2" />
      </>
    ),
  },
  trowel: {
    block: [3, 19, 8, 8],
    d: (
      <>
        <path d="M6 14l12-10 10 10-12 8z" />
        <path d="M16 22l-4 4" />
        <path d="M12 26l-3 3" strokeWidth="3" />
      </>
    ),
  },
  helmet: {
    block: [20, 4, 8, 7],
    d: (
      <>
        <path d="M5 21a11 11 0 0 1 22 0" />
        <path d="M2 21h28v4H2z" />
        <path d="M13 11V7h6v4" />
        <path d="M16 11v6" />
      </>
    ),
  },
  rebar: {
    block: [19, 3, 9, 9],
    d: (
      <>
        <path d="M6 4v24M12 4v24M18 12v16M24 12v16" />
        <path d="M3 10h22M3 18h26M3 26h26" />
      </>
    ),
  },
  permit: {
    block: [19, 18, 9, 10],
    d: (
      <>
        <path d="M6 3h14l6 6v20H6z" />
        <path d="M20 3v6h6" />
        <path d="M10 14h12M10 19h8" />
        <path d="M10 24l2 2 4-4" />
      </>
    ),
  },
  pipe: {
    block: [3, 3, 8, 8],
    d: (
      <>
        <path d="M4 13h10a4 4 0 0 1 4 4v11" />
        <path d="M4 19h8v9" />
        <path d="M18 28h-6" />
        <path d="M22 6h6v6" />
        <path d="M28 6l-9 9" />
      </>
    ),
  },
};

type Props = {
  name: IconName;
  size?: number;
  accent?: "yellow" | "red" | "blue" | "none";
  className?: string;
  title?: string;
};

const accentVar = { yellow: "var(--color-yellow)", red: "var(--color-red)", blue: "var(--color-blue)", none: "transparent" };

export function BtpIcon({ name, size = 32, accent = "yellow", className, title }: Props) {
  const icon = paths[name];
  const [x, y, w, h] = icon.block;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <rect x={x} y={y} width={w} height={h} fill={accentVar[accent]} className="btp-icon-block" />
      <g stroke="currentColor" strokeWidth={2} strokeLinecap="square" strokeLinejoin="miter">
        {icon.d}
      </g>
    </svg>
  );
}
