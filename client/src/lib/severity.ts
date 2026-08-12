// Canonical risk scale — single source of truth for all pages/components.
// Mirrors the :root --risk-* / --sev-* tokens in client/src/index.css.
//
// Three tiers, distinguished by VALUE (lightness) only — never hue — plus
// the text label and icon on every badge, so meaning never depends on color:
//   high (#1D1D1F) — the driver suffered bodily harm or was physically attacked
//   mod  (#6E6E73) — the driver was threatened during a forcible theft
//   low  (#AEAEB2) — regulatory / court / news records, no active threat
export type RiskTier = "low" | "mod" | "high";

export const RISK_TIERS: Record<RiskTier, { label: string; fill: string; ink: string; bg: string }> = {
  low:  { label: "Low risk",      fill: "#AEAEB2", ink: "#6E6E73", bg: "#F5F5F7" },
  mod:  { label: "Moderate risk", fill: "#6E6E73", ink: "#48484A", bg: "#EEEEEF" },
  high: { label: "High risk",     fill: "#1D1D1F", ink: "#1D1D1F", bg: "#E5E5E7" },
};

export const SEV_TIER: Record<string, RiskTier> = {
  fatal: "high",
  injury: "high",
  assault: "high",
  robbery: "mod",
  policy: "low",
  other: "low",
  incident: "low",
};

export function riskTier(severity: string | undefined | null): RiskTier {
  return SEV_TIER[String(severity ?? "").toLowerCase()] ?? "low";
}

export function riskLabel(severity: string | undefined | null): string {
  return RISK_TIERS[riskTier(severity)].label;
}

// Solid mark colour for a severity — used for map pins, dots and bar fills.
export const SEV_COLORS: Record<string, string> = Object.fromEntries(
  Object.entries(SEV_TIER).map(([sev, tier]) => [sev, RISK_TIERS[tier].fill]),
);

export const SEV_FALLBACK = RISK_TIERS.low.fill;

// Strip HTML from untrusted strings for plain-text display.
// Uses the browser's HTML parser instead of regex replacement, which is
// robust against nested/malformed tags (CodeQL: incomplete multi-character
// sanitization). Returns text content only; nothing is executed or rendered.
export function stripHtml(html: string | undefined | null): string {
  if (!html) return "";
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent ?? "";
}
