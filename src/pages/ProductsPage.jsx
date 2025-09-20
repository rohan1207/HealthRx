import React, { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

// Product data (as requested)
const PRODUCTS = [
  {
    id: "jar-vanilla",
    name: "HealthRx Whey – Vanilla",
    weight: "1 kg",
    price: "₹2,999",
    type: "container",
    image: "/container.png",
    detailImage: "/container_detail.png", // optional: product detail overlay
    badges: ["Grass‑fed", "No Added Sugar", "Lab‑Tested"],
  },
  {
    id: "jar-chocolate",
    name: "HealthRx Whey – Chocolate",
    weight: "1 kg",
    price: "₹2,999",
    type: "container",
    image: "/container4.png",
    detailImage: "/container4.png",
    badges: ["27g Protein", "BCAA+EAA", "Gluten‑Free"],
  },
  {
    id: "sachet-berry",
    name: "HealthRx On‑the‑Go",
    weight: "500 g",
    price: "₹1,499",
    type: "sachet",
    image: "/container3.png", // place your sachet image in public as sachet-berry.png
    detailImage: "/container3.png",
    badges: ["Travel Pack", "Rapid Mix", "Premium Taste"],
  },
  {
    id: "sachet-mocha",
    name: "HealthRx On‑Mocha",
    weight: "500 g",
    price: "₹1,499",
    type: "sachet",
    image: "/container.png", // place your sachet image in public as sachet-mocha.png
    detailImage: "/container_detail.png",
    badges: ["Cold/Hot Ready", "Clean Label", "Low Sugar"],
  },
];

// Visual palette per product index (keeps styling without relying on product.color)
const COLORS = [
  { aura: "from-amber-200/40" },
  { aura: "from-pink-200/40" },
  { aura: "from-teal-200/40" },
  { aura: "from-emerald-200/40" },
];

// Positions are generated relative to viewport; we also allow reshuffle
function useRandomPositions(count) {
  return useMemo(() => {
    const vw = typeof window !== "undefined" ? window.innerWidth : 1200;
    const vh = typeof window !== "undefined" ? window.innerHeight : 800;
    const marginX = Math.max(80, vw * 0.08);
    const marginY = Math.max(80, vh * 0.12);

    // Four aesthetically pleasing spots roughly like the reference
    const preset = [
      { x: vw * 0.26, y: vh * 0.33 },
      { x: vw * 0.74, y: vh * 0.33 },
      { x: vw * 0.30, y: vh * 0.70 },
      { x: vw * 0.70, y: vh * 0.70 },
    ].map((p) => ({ x: Math.min(vw - marginX, Math.max(marginX, p.x)), y: Math.min(vh - marginY, Math.max(marginY, p.y)) }));

    // If there are more than 4, sprinkle extras randomly
    const arr = Array.from({ length: count }, (_, i) =>
      i < 4
        ? preset[i]
        : {
            x: Math.random() * (vw - marginX * 2) + marginX,
            y: Math.random() * (vh - marginY * 2) + marginY,
          }
    );
    // Simple repulsion to reduce overlap
    const minDist = Math.min(vw, vh) * 0.22;
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < i; j++) {
        const dx = arr[i].x - arr[j].x;
        const dy = arr[i].y - arr[j].y;
        const d = Math.hypot(dx, dy);
        if (d < minDist) {
          const angle = Math.atan2(dy, dx);
          const push = (minDist - d) * 0.6;
          arr[i].x += Math.cos(angle) * push;
          arr[i].y += Math.sin(angle) * push;
        }
      }
      arr[i].x = Math.min(vw - marginX, Math.max(marginX, arr[i].x));
      arr[i].y = Math.min(vh - marginY, Math.max(marginY, arr[i].y));
    }
    return arr;
  }, [count]);
}

function ProductFloat({ p, idx, pos }) {
  const ref = useRef(null);
  const [hover, setHover] = useState(false);
  const color = COLORS[idx % COLORS.length];
  const float = {
    animate: {
      y: [0, -8, 0],
      transition: { duration: 5 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" },
    },
  };

  return (
    <div
      className="absolute"
      style={{ left: pos.x, top: pos.y, transform: "translate(-50%, -50%)" }}
    >
  {/* aura circle */}
  <div className={`absolute -z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-48 w-48 rounded-full bg-gradient-to-b ${color.aura} to-transparent blur-2xl`} />

      <motion.div
        ref={ref}
        className="relative w-[200px] max-w-[30vw]"
        variants={float}
        animate="animate"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {/* Product image with hover detail crossfade */}
        <div className="relative aspect-[4/5] grid place-items-center" style={{ perspective: 1200 }}>
          <motion.img
            src={p.image}
            alt={p.name}
            className="h-full w-full object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.25)]"
            animate={hover ? { scale: 1.06, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            style={{ transform: "translateZ(60px)", backfaceVisibility: "hidden" }}
          />
          <motion.img
            src={p.detailImage || p.image}
            alt={`${p.name} detail`}
            className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.22)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: hover ? 1 : 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            style={{ backfaceVisibility: "hidden" }}
          />
        </div>

        {/* Right-side details panel */}
        <motion.div
          className="pointer-events-none absolute left-[calc(100%+14px)] top-1/2 -translate-y-1/2 w-[240px] max-w-[40vw] rounded-2xl bg-white/85 backdrop-blur p-4 shadow-lg border border-black/5"
          animate={hover ? { y: -6, scale: 1.02, boxShadow: "0 20px 50px rgba(0,0,0,0.15)" } : { y: 0, scale: 1, boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[13px] tracking-[0.18em] uppercase text-zinc-500 mb-1">HealthRx</p>
          <h3 className="font-playfair text-lg text-zinc-900 leading-snug">{p.name}</h3>
          <div className="mt-2 flex items-center gap-3 text-sm">
            <span className="rounded-full bg-teal-600/10 text-teal-800 px-2 py-0.5">{p.weight}</span>
            <span className="font-semibold text-zinc-800">{p.price}</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {p.badges.map((b) => (
              <span key={b} className="rounded-full border border-zinc-200 bg-white/60 px-2.5 py-1 text-[11px] text-zinc-700">{b}</span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function ProductsPage() {
  const products = PRODUCTS;
  const positions = useRandomPositions(products.length);
  const [seed, setSeed] = useState(0);

  return (
    <section className="relative min-h-screen bg-[#F7F4EA] overflow-hidden">
      {/* soft divider + title */}
      <div className="mx-auto max-w-6xl px-6 pt-20 text-center">
        <p className="text-xs tracking-[0.25em] uppercase text-zinc-500">Perfect for sweet moments</p>
        <h1 className="mt-3 font-playfair text-4xl sm:text-5xl text-zinc-900">Healthy Treats • Protein Blends</h1>
        <p className="mx-auto mt-4 max-w-2xl text-zinc-600">Crafted with whey protein and real ingredients. No added sugar. Premium taste, effortless nutrition.</p>
      </div>

      {/* desktop floating layout */}
      <div key={seed} className="relative mx-auto max-w-[1600px]">
        {products.map((p, i) => (
          <ProductFloat key={p.id} p={p} idx={i} pos={positions[i]} />
        ))}
      </div>

      {/* mobile fallback grid */}
      <div className="mx-auto mt-10 grid max-w-6xl grid-cols-2 gap-6 px-6 sm:hidden">
        {products.map((p) => (
          <div key={p.id} className="rounded-3xl bg-white/70 p-3">
            <div className="relative h-40 w-full">
              <img src={p.image} alt={p.name} className="absolute inset-0 h-full w-full object-contain" />
              <img src={p.detailImage || p.image} alt={`${p.name} detail`} className="absolute inset-0 h-full w-full object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <p className="mt-2 text-sm font-semibold text-zinc-800">{p.name}</p>
            <p className="text-xs text-zinc-600">{p.weight} • {p.price}</p>
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#F7F4EA] via-transparent to-transparent" />
    </section>
  );
}
