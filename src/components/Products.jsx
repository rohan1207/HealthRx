import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

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

function ProductCard({ p }) {
  const cardRef = useRef(null);
  const hoverTimer = useRef(null);
  const [t, setT] = useState({ rx: 0, ry: 0 });
  const [shine, setShine] = useState({ x: 50, y: 50, o: 0 });
  const [hovered, setHovered] = useState(false);

  const onMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const cx = px - rect.width / 2;
    const cy = py - rect.height / 2;
  const rx = (-cy / rect.height) * 6; // gentler tilt so it doesn't fight the flip
  const ry = (cx / rect.width) * 6;
    setT({ rx, ry });
    setShine({ x: (px / rect.width) * 100, y: (py / rect.height) * 100, o: 0.28 });
  };

  const onLeave = () => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
    setT({ rx: 0, ry: 0 });
    setShine({ x: 50, y: 50, o: 0 });
    setHovered(false);
  };

  const isJar = p.type === "container";
  const imgScale = isJar ? 1.1 : 1.04; // slightly larger visuals

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onMouseEnter={() => {
        if (hoverTimer.current) clearTimeout(hoverTimer.current);
        hoverTimer.current = setTimeout(() => setHovered(true), 110); // small intent delay for elegance
      }}
      className="relative rounded-3xl p-2 sm:p-3 overflow-visible"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -12, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
        transform: `perspective(1000px) rotateX(${t.rx}deg) rotateY(${t.ry}deg)`,
      }}
    >
      {/* floating accent aura behind product */}
      <div className="absolute left-1/2 top-8 -translate-x-1/2 h-64 w-64 rounded-full bg-gradient-to-b from-teal-200/35 to-transparent blur-2xl" style={{ transform: "translateZ(0)" }} />

      {/* 3D flip stage */}
      <div className="relative aspect-[4/5] w-full grid place-items-center" style={{ perspective: 1400 }}>
        <motion.div
          className="relative h-full w-full"
          animate={hovered ? { rotateY: 170, scale: 1.06, y: -4 } : { rotateY: 0, scale: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformStyle: "preserve-3d", willChange: "transform" }}
        >
          {/* front */}
          <img
            src={p.image}
            alt={p.name}
            className="absolute inset-0 m-auto h-full w-full object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.2)]"
            style={{ backfaceVisibility: "hidden", transform: `translateZ(60px) scale(${imgScale})` }}
            onError={(e) => {
              if (!isJar) e.currentTarget.src = "/container.png";
            }}
          />
          {/* back */}
          <img
            src={p.detailImage || p.image}
            alt={`${p.name} details`}
            className="absolute inset-0 m-auto h-full w-full object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.18)]"
            style={{ backfaceVisibility: "hidden", transform: `rotateY(180deg) translateZ(60px) scale(${imgScale})` }}
            onError={(e) => {
              e.currentTarget.src = p.image;
            }}
          />
        </motion.div>
      </div>

      {/* details */}
      <div className="relative mt-5">
        <div className="flex items-center justify-between">
          <h3 className="text-[1.1rem] font-medium text-zinc-900 font-playfair leading-snug">{p.name}</h3>
          <span className="text-teal-700 font-semibold tracking-wide">{p.weight}</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {p.badges.map((b, i) => (
            <span
              key={i}
              className="rounded-full border border-teal-700/20 bg-teal-600/10 px-3 py-1 text-[0.72rem] text-teal-800 tracking-wide"
            >
              {b}
            </span>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between">
          <span className="text-zinc-800 font-semibold text-lg">{p.price}</span>
          <div className="flex gap-2">
            <motion.button
              whileTap={{ scale: 0.96 }}
              className="rounded-full border border-teal-700/30 bg-white/70 backdrop-blur px-4 py-2 text-sm font-semibold text-teal-800 hover:bg-white"
            >
              Add to Cart
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.96 }}
              className="rounded-full bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-500 shadow-[0_10px_30px_-10px_rgba(13,148,136,0.8)]"
            >
              Buy Now
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Products() {
  return (
    <section className="relative bg-[#EAE8E3] py-24 sm:py-28 text-zinc-900">
      {/* subtle top gradient divider */}
      <div className="absolute -top-10 inset-x-0 h-24 bg-gradient-to-b from-transparent via-zinc-900/5 to-transparent pointer-events-none" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col items-center text-center gap-3">
          <span className="rounded-full border border-black/10 bg-white/60 backdrop-blur px-3 py-1 text-xs tracking-widest uppercase text-zinc-700">Products</span>
          <h2 className="font-playfair text-4xl sm:text-5xl font-semibold">Pure performance, designed to be trusted</h2>
          <p className="max-w-2xl text-zinc-600">A modern, tactile showcase. Hover to tilt, lift and reveal subtle light play—crafted for a premium feel.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {PRODUCTS.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
