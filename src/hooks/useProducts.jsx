import { useMemo } from "react";

// Centralized product data for ProductsPage
export default function useProducts() {
  return useMemo(
    () => ([
      {
        id: "p-vanilla",
        name: "HealthRx Whey – Vanilla",
        image: "/container.png",
        thumb: "/container.png",
        weight: "1 kg",
        cta: "More Info",
        color: {
          dot: "bg-amber-200",
          aura: "from-amber-200/40",
          pill: "bg-amber-400/10 text-amber-800 border-amber-700/20",
        },
        badges: ["Smooth • Pure", "27g Protein", "BCAA+EAA"],
      },
      {
        id: "p-beijinho",
        name: "HealthRx Whey – Berry",
        image: "/container3.png",
        thumb: "/container3.png",
        weight: "1 kg",
        cta: "More Info",
        color: {
          dot: "bg-pink-200",
          aura: "from-pink-200/40",
          pill: "bg-pink-400/10 text-pink-800 border-pink-700/20",
        },
        badges: ["No Added Sugar", "Cold / Hot Ready"],
      },
      {
        id: "p-brigadeiro",
        name: "HealthRx Whey – Chocolate",
        image: "/container4.png",
        thumb: "/container4.png",
        weight: "1 kg",
        cta: "More Info",
        color: {
          dot: "bg-amber-300",
          aura: "from-amber-300/40",
          pill: "bg-amber-500/10 text-amber-900 border-amber-800/20",
        },
        badges: ["Rich Cocoa", "Low Sugar"],
      },
      {
        id: "p-mocha",
        name: "HealthRx On‑the‑Go",
        image: "/container_detail.png",
        thumb: "/container_detail.png",
        weight: "500 g",
        cta: "More Info",
        color: {
          dot: "bg-teal-200",
          aura: "from-teal-200/40",
          pill: "bg-teal-500/10 text-teal-900 border-teal-800/20",
        },
        badges: ["Travel Pack", "Rapid Mix"],
      },
    ]),
    []
  );
}
