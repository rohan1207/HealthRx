import React from "react";
import { motion } from "framer-motion";

const stripeVariants = {
  rest: (i) => ({
    rotate: i % 2 ? -15 : -10,
    skewX: i % 2 ? 5 : 3,
    transition: { duration: 0.6 }
  }),
  hovered: {
    rotate: 0,
    skewX: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const badgeVariants = {
  rest: { rotate: -15 },
  hovered: { rotate: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function BrandMission() {
  return (
    <motion.section
      className="group relative min-h-screen bg-[#1F2937] text-white overflow-hidden"
      initial="rest"
      whileHover="hovered"
      animate="rest"
    >
      {/* Animated stripes background (non-interactive) */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[120%] w-16 bg-white/5"
            variants={stripeVariants}
            custom={i}
            style={{
              left: `${i * 8}%`,
              transformOrigin: "center",
              translateY: `${i % 2 ? -5 : 0}%`,
            }}
          />
        ))}
      </div>

      {/* Content container */}
      <div className="relative container mx-auto px-6 py-24 grid grid-cols-12 gap-8 items-center min-h-screen">
        {/* Text content */}
        <div className="col-span-12 md:col-span-7 space-y-6">
          <h2 className="text-5xl sm:text-6xl font-bold leading-tight tracking-tight">
          Elevating Nutrition. Redefining Trust. Powering Your Health.
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl">
            At <span className="text-teal-400 font-semibold">HealthRx</span>, we believe true strength starts with trust. 
    That’s why every scoop of our premium protein blends is crafted with integrity, 
    transparency, and science-backed nutrition. No shortcuts. No compromises.
          </p>
          <p className="text-lg text-gray-300 max-w-2xl">
           Our mission is simple: to fuel your body with the purest, most effective 
    formulations that not only support performance but also embody luxury in 
    health and wellness. Because your health deserves nothing less than excellence.
          </p>
        </div>

        {/* Logo container */}
        <div className="col-span-12 md:col-span-5 flex justify-center items-center">
          <motion.div
            className="w-64 h-64 relative"
            variants={badgeVariants}
          >
            {/* Circular text path */}
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full fill-current text-yellow-400"
            >
              <path
                id="circlePath"
                d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                fill="none"
              />
              <text className="text-[8px]">
                <textPath href="#circlePath" startOffset="0%">
                  healthy Premium Protein • Trusted Nutrition • HealthRx • healthy Premium Protein • Trusted Nutrition • HealthRx •
                </textPath>
              </text>
            </svg>

              {/* Center badge with brand text */}
              <div className="absolute inset-0 m-auto w-32 h-32 bg-yellow-400 flex items-center justify-center rounded-full">
                <motion.span
                  className="font-playfair text-[#1F2937] text-xl sm:text-2xl font-semibold tracking-wide"
                  variants={{ rest: { rotate: 0 }, hovered: { rotate: 0 } }}
                >
                  Certified
                </motion.span>
              </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}