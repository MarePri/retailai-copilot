// Simulated demo data — not connected to a live store system

export const alternatives = [
  {
    name: "Ecru Linen Blend Shirt", sku: "PB-4421-ECR", similarity: 94,
    sizes: ["S", "M", "L", "XL"], stock: { floor: 2, stockroom: 4, zone: "Hanging 1003" },
    reasons: ["Same linen weave structure", "Ecru reads as off-white — same customer appeal", "Licensed SS26 Collection"],
    collection: "Urban Summer 2026", trend: "Summer Linen Tier 1", price: "€39.99",
    colorKey: "emerald",
  },
  {
    name: "White Poplin Oversized Shirt", sku: "PB-3817-WHT", similarity: 81,
    sizes: ["M", "L"], stock: { floor: 1, stockroom: 2, zone: "Folding 3012" },
    reasons: ["White tone match", "Oversized silhouette — trending this week", "Lower price point may convert"],
    collection: "Basics Essentials", trend: "Relaxed Silhouette Tier 2", price: "€25.99",
    colorKey: "amber",
  },
];

export const outfits = [
  {
    name: "Summer Coastal", score: 92, trend: "Mediterranean Linen",
    items: [
      { type: "Top", name: "Ecru Linen Blend Shirt", price: "€39.99", zone: "H-1003" },
      { type: "Bottom", name: "Light Wash Wide Denim", price: "€45.99", zone: "F-3008" },
      { type: "Shoes", name: "White Canvas Sneakers", price: "€34.99", zone: "Shoes 8001" },
      { type: "Acc.", name: "Woven Straw Tote", price: "€19.99", zone: "Acc. 5003" },
    ],
    reason: "Linen + wide denim is the defining silhouette of Summer 26. All 4 items in stock.",
  },
  {
    name: "Urban Casual", score: 87, trend: "Clean Monochrome",
    items: [
      { type: "Top", name: "White Poplin Oversized Shirt", price: "€25.99", zone: "F-3012" },
      { type: "Bottom", name: "Black Slim Chinos", price: "€35.99", zone: "F-3020" },
      { type: "Shoes", name: "Black Leather Loafers", price: "€49.99", zone: "Shoes 8003" },
      { type: "Acc.", name: "Silver Chain Necklace", price: "€12.99", zone: "Acc. 5007" },
    ],
    reason: "White-on-black contrast is performing +9% this week. Clean and convertible.",
  },
];

export const upsellItems = [
  { cat: "Footwear", name: "Tan Leather Sandals", reason: "Linen + tan leather is the SS26 coastal formula", impact: "+€34.99", conf: 91, zone: "Shoes 8002" },
  { cat: "Accessory", name: "Woven Raffia Belt", reason: "Completes the Mediterranean look — only 3 left", impact: "+€14.99", conf: 85, zone: "Acc. 5004" },
  { cat: "Bottom", name: "Light Wash Wide Denim", reason: "Top linen pairing this week. Conversion rate 38% when shown together", impact: "+€45.99", conf: 88, zone: "F-3008" },
];
