// Simulated demo data — not connected to a live store system

export const PRODUCT_PHOTOS = {
  "PB-5530": `${import.meta.env.BASE_URL}trousers-pb5530.png`,
  "PB-4421": `${import.meta.env.BASE_URL}shirt-pb4421.png`,
  "PB-6612": `${import.meta.env.BASE_URL}hat-pb6612.png`,
  "PB-8801": `${import.meta.env.BASE_URL}sandals-pb8801.png`,
  "PB-5491": `${import.meta.env.BASE_URL}trousers-pb5491.png`,
};

export const PRODUCT_SVG_FALLBACK = {
  "PB-5491": {
    bg: "linear-gradient(155deg, #B8A88A 0%, #7A6A52 100%)",
    label: "WIDE LEG\nTROUSERS",
  },
};

export const collection = {
  name: "Urban Summer 2026",
  zone: "Urban · Front Island A + Wall 3",
  health: 62,
  healthAfter: 91,
  risk: "Hero product delayed — Linen Cargo Trousers (PB-5530) expected Thursday",
  products: [
    { name: "Linen Cargo Trousers", sku: "PB-5530", role: "HERO", status: "delayed", reason: "Logistics delay — arrives Thursday delivery" },
    { name: "Ecru Linen Shirt", sku: "PB-4421", role: "Top", status: "ok", reason: null },
    { name: "Washed Canvas Bucket Hat", sku: "PB-6612", role: "Acc.", status: "low", reason: "Only 1 unit on floor — stockroom empty" },
    { name: "Tan Leather Sandals", sku: "PB-8801", role: "Shoes", status: "ok", reason: null },
  ],
  replacement: {
    name: "Wide Leg Canvas Trousers",
    sku: "PB-5491",
    match: 88,
    zone: "Folding 3018",
    stock: 7,
    reasons: [
      "Same relaxed, wide silhouette — matches the Urban Summer story",
      "Canvas vs linen: nearly identical visual weight and seasonal feel",
      "Shares the neutral/beige palette anchoring this collection",
      "Available now — 7 units in zone F-3018",
    ],
  },
};

export const impactMetrics = [
  { label: "Visual Integrity", before: 55, after: 90, colorKey: "emerald" },
  { label: "Cross-Sell Rate", before: 42, after: 71, colorKey: "accent" },
  { label: "Commercial Strength", before: 68, after: 89, colorKey: "violet" },
  { label: "Estimated Daily Gain", before: null, after: "+€85", colorKey: "emerald", text: true },
];
