// Brand palette for contexts that need a literal colour string (Recharts,
// Leaflet, canvas). Mirrors the :root tokens in client/src/index.css, which
// remain the single source of truth for everything CSS can reach.
//
// Minimalist black & white system — every value is a shade of gray or true
// black/white. `ink` is the near-black used for text and solid fills; on
// dark (ink) surfaces it flips to white. There is no colored accent.
export const BRAND = {
  teal: "#1D1D1F",
  tealInk: "#1D1D1F",
  tealDim: "#000000",
  navy: "#1D1D1F",
  charcoal: "#1D1D1F",
  tint: "#F5F5F7",
  tintDeep: "#E8E8ED",
  white: "#FFFFFF",
  ink2: "#6E6E73",
  ink3: "#86868B",
  border: "#D2D2D7",
  borderSoft: "#E8E8ED",
} as const;

// Generic chart sequence: ink stepped toward white in even gray increments.
// Charts that encode risk use the severity scale in ./severity instead.
export const CHART_SERIES = [BRAND.navy, "#6E6E73", "#AEAEB2", "#D2D2D7"] as const;
export const CHART_GRID = "#E8E8ED";
export const CHART_AXIS = BRAND.ink2;
