// =============================================================================
// IMPORTANT: This is a SIMULATED DEMO — not connected to a live store system.
// All responses are deterministic (pre-written). No LLM, no external AI service,
// no backend API is called. The "AI" labels in the UI describe the intended
// product vision, not the current implementation.
// =============================================================================

export const quickQuestions = [
  "Why are we behind LY?",
  "Which family is hurting us most?",
  "What should we focus on before closing?",
  "What's our biggest opportunity today?",
];

export function getDeterministicReply(userMsg) {
  const normalized = userMsg.toLowerCase();
  if (normalized.includes("opportunity")) {
    return "Licensed Collection is the strongest opportunity at +14.2% vs LY. Move it from mid-floor to prime visibility, protect availability through closing, and pair it with Accessories. Expected upside: €80–110 today. Confidence: 89%.";
  }
  if (normalized.includes("closing") || normalized.includes("focus")) {
    return "Before closing, prioritize Denim replenishment from H-1005 to H-1008, restore Women's Basics visibility at F-3002, and move Licensed Collection into prime traffic. These are the three highest-impact actions for today's forecast.";
  }
  if (normalized.includes("family")) {
    return "Women's Basics is hurting performance most at −11.4% vs LY, followed by Denim at −8.1%. Basics has a visibility problem; Denim has available stock that has not reached the floor. Fix Basics first, then replenish H-1005 to H-1008.";
  }
  return "Women's Basics is the primary drag at −11.4%. Restore 4–6 folded items to the front table from zone F-3002 and add a mannequin at A3. Then replenish Denim from H-1005 to H-1008. Together, those actions should recover €120–160 per day. Confidence: 84%.";
}
