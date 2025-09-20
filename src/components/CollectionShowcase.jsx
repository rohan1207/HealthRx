import React from "react";
import { motion } from "framer-motion";

const sectionVariants = {
  rest: {},
  hovered: {}
};

// Side containers animation - slide from behind center to left/right (gentle)
const sideContainer = (dir) => ({
  rest: {
    x: 0,
    y: 8,
    scale: 0.88,
    rotate: 0,
    opacity: 0,
    filter: "blur(1.5px)",
    zIndex: -1,
  },
  hovered: {
    x: dir === "left" ? -30 : 50,
    y: dir === "left" ? -2 : -6,
    scale: 0.93,
    rotate: dir === "left" ? -5 : 5,
    opacity: 1,
    filter: "blur(0px)",
    zIndex: 5,
    transition: {
      type: "tween",
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.05
    }
  },
});

// Main container animation
const mainContainer = {
  rest: { 
    scale: 1, 
    y: 0,
    rotate: 0,
    zIndex: 10
  },
  hovered: { 
    scale: 1.08, 
    y: -12,
    rotate: -2,
    zIndex: 10,
    transition: { 
      type: "spring", 
      stiffness: 180, 
      damping: 18 
    }
  }
};

// Floating ingredients animation
const ingredientVariant = (i) => ({
  rest: { 
    y: 0, 
    x: 0,
    rotate: 0, 
    opacity: 0.9, 
    scale: 1 
  },
hovered: {
  y: [0, -32, -12], // removed last 0
  x: [0, Math.sin(i) * 18], // removed last 0
  rotate: [0, i % 2 ? 10 : -10], // removed last 0
  scale: [1, 1.12], // removed last 1
  opacity: [0.9, 1], // removed last 0.9
  transition: { 
    duration: 3 + i * 0.25, 
    ease: "easeInOut"
  }
},
});

// Text animations
const textSlide = (direction) => ({
  rest: { x: 0, y: 0, opacity: 0.95 },
  hovered: { 
    x: direction === "left" ? -14 : 14,
    y: direction === "left" ? -4 : 4,
    opacity: 1,
    transition: { type: "spring", stiffness: 120, damping: 18 }
  }
});

const INGREDIENTS = [
  { id: 1, name: "Strawberry" },
  { id: 2, name: "Blueberry" },
  { id: 3, name: "Orange" },
  { id: 4, name: "Kiwi" },
  { id: 5, name: "Banana" },
  { id: 6, name: "Berry" }
];

export default function CollectionShowcase() {
  return (
    <motion.section
      className="relative overflow-hidden bg-gradient-to-br from-[#f5f3f0] via-[#EAE8E3] to-[#e8e5df] py-24"
      initial="rest"
      whileHover="hovered"
      animate="rest"
      variants={sectionVariants}
    >
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-12 items-center gap-8">
        {/* Left: headline and CTA */}
        <div className="col-span-12 lg:col-span-6 relative">
          <div className="relative z-10">
            <motion.p
              className="text-2xl sm:text-3xl tracking-[0.25em] text-slate-600 font-medium"
              variants={textSlide("left")}
            >
              HealthRx
            </motion.p>
            <h2 className="mt-2 font-serif text-6xl sm:text-7xl lg:text-8xl font-bold text-[#b08c66] leading-[0.9]">
              <motion.span
                className="block"
                variants={textSlide("left")}
              >
                PROTEIN
              </motion.span>
              <motion.span
                className="block text-[#8b6f47]"
                variants={textSlide("right")}
              >
                BLENDS
              </motion.span>
            </h2>
            <motion.button
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-teal-400 px-8 py-4 font-bold text-slate-800 shadow-[0_20px_40px_-15px_rgba(234,179,8,0.6)] hover:bg-teal-300 hover:shadow-[0_25px_50px_-15px_rgba(234,179,8,0.8)] transition-all duration-300"
              variants={{ 
                rest: { y: 0, scale: 1 }, 
                hovered: { y: -4, scale: 1.05 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              Buy Now
              <span className="text-lg">→</span>
            </motion.button>
          </div>

          {/* Floating ingredients around text */}
          <div className="pointer-events-none absolute inset-0 w-full h-full">
            {INGREDIENTS.map((ingredient, i) => (
              <motion.div
                key={ingredient.id}
                className="absolute"
                style={{
                  left: ["-20%", "52%", "10%", "66%", "30%", "58%"][i],
                  top: ["0%", "80%", "110%", "112%", "100%", "-10%"][i],
                }}
                variants={ingredientVariant(i)}
              >
                <img
                  src={`/material${ingredient.id}.png`}
                  alt={ingredient.name}
                  className="h-22 w-22 sm:h-26 sm:w-26 lg:h-28 lg:w-28 object-contain select-none"
                  style={{
                    filter: "drop-shadow(0 15px 25px rgba(0,0,0,0.15))",
                  }}
                  onError={(e) => {
                    // Fallback to a colored circle if image fails
                    e.currentTarget.style.display = "none";
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: protein containers cluster */}
        <div className="col-span-12 lg:col-span-6 relative h-[420px] lg:h-[600px] flex items-end justify-center">
          {/* Left container - slides from center to left */}
          <motion.img
            src="/container3.png"
            alt="HealthRx Protein Variant"
            className="absolute bottom-8 h-[65%] sm:h-[75%] lg:h-[80%] w-auto object-contain select-none"
            style={{ 
              right: "52%",
              transform: "translateX(50%)",
              filter: "drop-shadow(0 25px 35px rgba(0,0,0,0.2))",
              willChange: "transform"
            }}
            variants={sideContainer("left")}
            onError={(e) => (e.currentTarget.style.display = "none")}
          />

          {/* Main center container */}
          <motion.img
            src="/container.png"
            alt="HealthRx Protein Main"
            className="relative z-10 h-[75%] sm:h-[85%] lg:h-[90%] w-auto object-contain select-none"
            variants={mainContainer}
            style={{
              filter: "drop-shadow(0 35px 50px rgba(0,0,0,0.25))"
            }}
            onError={(e) => (e.currentTarget.style.display = "none")}
          />

          {/* Right container - slides from center to right */}
          <motion.img
            src="/container4.png"
            alt="HealthRx Protein Variant"
            className="absolute bottom-12 h-[65%] sm:h-[75%] lg:h-[80%] w-auto object-contain select-none"
            style={{ 
              left: "52%",
              transform: "translateX(-50%)",
              filter: "drop-shadow(0 25px 35px rgba(0,0,0,0.2))",
              willChange: "transform"
            }}
            variants={sideContainer("right")}
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-10 -right-10 w-96 h-96 bg-yellow-200 bg-opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-orange-200 bg-opacity-20 rounded-full blur-3xl"></div>
      </div>
    </motion.section>
  );
}