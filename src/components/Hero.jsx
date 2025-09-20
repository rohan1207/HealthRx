import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/*
  Hero interaction contract
  - Pin the hero while user scrolls through one viewport height
  - While pinned: rotate the cap 360deg around its center
  - Circular marquee text orbits around the cap
  - On completion: camera "tilt" to front and reveal full container
*/
export default function Hero() {
  const root = useRef(null);
  const cap = useRef(null);
  const bottle = useRef(null);
  const circleText = useRef(null);
  const splashRef = useRef(null);
  
  // Material scatter refs (now 4 premium badges instead of PNGs)
  const materialRefs = useRef([]);
  const [materialData] = useState(() => {
    const labels = ["100% Natural", "Gains", "ATP", "Recovery"]; // map to 4 corners
    const vw = typeof window !== "undefined" ? window.innerWidth : 1200;
    const vh = typeof window !== "undefined" ? window.innerHeight : 800;
    const marginX = Math.max(96, Math.min(160, vw * 0.08));
    const marginY = Math.max(96, Math.min(160, vh * 0.1));
    const dx = vw / 3 - marginX; // distance from center to corner minus margin
    const dy = vh / 3 - marginY;

    const corners = [
      { x: -dx, y: -dy }, // top-left
      { x: -dx, y: dy },  // bottom-left
      { x: dx, y: -dy },  // top-right
      { x: dx, y: dy },   // bottom-right
    ];

    return labels.map((label, i) => ({
      id: i + 1,
      label,
      startX: 0,
      startY: 0,
      endX: corners[i].x,
      endY: corners[i].y,
      rotation: 0,
      scale: 0.92 + Math.random() * 0.25,
      delay: Math.random() * 0.2,
    }));
  });

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=300%", // longer distance -> slower, more premium
          scrub: 1, // smoother scrub easing
          pin: true,
          anticipatePin: 1,
        },
        defaults: { ease: "power1.inOut" },
      });

      // Initial state
      gsap.set(bottle.current, { autoAlpha: 0, scale: 0.92, yPercent: 8 });
      gsap.set(cap.current, { autoAlpha: 1, rotate: 0 });
      gsap.set(circleText.current, { autoAlpha: 1, rotate: 0, "--offset": "-90deg", "--sweep": "0deg" });
      gsap.set(splashRef.current, { autoAlpha: 0, scale: 0.8, rotateY: -15 });

      // 1) Rotate cap 360 and reveal text by growing sweep 0→360 (exactly synced)
      tl.to(cap.current, { rotate: 360 }, 0);
      tl.to(circleText.current, { css: { "--sweep": "360deg" } }, 0)
        .to(circleText.current, { autoAlpha: 0, duration: 0.3 }, 0.55); // Quick fade out after completion

      // 2) Camera change: perspective tilt + crossfade to bottle
      tl.to(
        root.current,
        { perspective: 1000, transformStyle: "preserve-3d" },
        0.6
      );

      tl.to(
        cap.current,
        { rotationX: 28, autoAlpha: 0, scale: 0.9, duration: 0.6 },
        0.7
      );

      tl.to(
        bottle.current,
        { autoAlpha: 1, scale: 1, yPercent: 0, duration: 0.8 },
        0.9
      );

      // Subtle parallax float for bottle towards the end
      tl.to(bottle.current, { yPercent: -5, duration: 0.6 }, ">-0.2");

      // Dramatic powder splash effect after container reveal
      tl.to(
        splashRef.current,
        {
          autoAlpha: 1,
          scale: 1.4,
          rotateY: 0,
          duration: 1.2,
          ease: "power2.out",
        },
        ">-0.3" // Start slightly before bottle animation ends
      ).to(
        splashRef.current,
        {
          scale: 1.6,
          duration: 1,
          ease: "power1.inOut",
        },
        ">" // Continues expanding slightly
      );

      // Badge scatter effect - triggered when splash is fully visible
      materialRefs.current.forEach((materialRef, index) => {
        if (!materialRef) return;
        
        const data = materialData[index];
        
        // Initial state: hidden and at center
        gsap.set(materialRef, {
          autoAlpha: 0,
          x: data.startX,
          y: data.startY,
          rotation: 0,
          scale: 0.5,
        });
        
        // Animate scatter when splash reaches full visibility
        tl.to(
          materialRef,
          {
            autoAlpha: 1,
            x: data.endX,
            y: data.endY,
            rotation: data.rotation,
            scale: data.scale,
            duration: 1.8 + data.delay,
            ease: "power2.out",
          },
          ">-0.8" // Start during splash expansion
        );
      });
      // Continue material movement outward on scroll exit
      ScrollTrigger.create({
        trigger: root.current,
        start: "bottom top",
        end: "bottom -200%",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          materialRefs.current.forEach((materialRef, index) => {
            if (!materialRef) return;
            
            const data = materialData[index];
            const exitMultiplier = 1 + progress * 2; // Continue moving outward
            
            gsap.to(materialRef, {
              x: data.endX * exitMultiplier,
              y: data.endY * exitMultiplier,
              rotation: data.rotation + progress * 180,
              scale: data.scale * (1 - progress * 0.5),
              autoAlpha: 1 - progress,
              duration: 0.3,
              ease: "none",
            });
          });
        },
      });
    }, root);

    return () => ctx.revert();
  }, [materialData]);

  // Create circular text once
  useEffect(() => {
    const text = "HealthRx • Fuel • Focus • Strength • Recovery • Vitality • Clarity • Power • Perform • ";
    const chars = text.repeat(2).split(""); // Reduced repeats for cleaner look
    const container = circleText.current;
    if (!container) return;
    container.innerHTML = "";
    const radius = 140; // Increased radius for better spacing
    // Initialize the reveal to start at -90deg (top) and sweep 0deg
    container.style.setProperty("--offset", "-90deg");
    container.style.setProperty("--sweep", "0deg");
    chars.forEach((ch, i) => {
      const span = document.createElement("span");
      const deg = (i / chars.length) * 360;
      span.textContent = ch;
      span.style.position = "absolute";
      span.style.left = "50%";
      span.style.top = "25%";
      span.style.transformOrigin = `0 ${radius}px`;
      span.style.transform = `rotate(${deg}deg) translateY(-${radius}px)`;
      span.style.fontWeight = 600;
      span.style.letterSpacing = "0.4em"; // More dynamic spacing
      span.style.fontSize = "0.95rem"; // Slightly smaller for clarity
      span.style.color = "#0f766e"; // teal-700
      container.appendChild(span);
    });
  }, []);

  return (
    <section
      ref={root}
      className="relative min-h-[100vh] bg-[#EAE8E3] text-zinc-900"
    >
      {/* Decor gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-200px,rgba(13,148,136,0.12),transparent)]" />

      {/* Center stage */}
      <div className="sticky top-0 flex h-screen items-center justify-center">
        <div className="relative aspect-square w-[72vmin] max-w-[760px] select-none">
          {/* Cap (top view) */}
          <img
            ref={cap}
            src="/container_cap.png"
            alt="HealthRx Cap"
            className="absolute inset-0 m-auto h-full w-full object-contain will-change-transform drop-shadow-[0_30px_60px_rgba(0,0,0,0.15)]"
          />

          {/* Circular text container */}
          <div
            ref={circleText}
            aria-hidden
            className="pointer-events-none absolute inset-0 m-auto h-full w-full [transform-style:preserve-3d]"
            style={{
              WebkitMaskImage:
                "conic-gradient(from var(--offset), #000 0 var(--sweep), transparent var(--sweep) 360deg)",
              maskImage:
                "conic-gradient(from var(--offset), #000 0 var(--sweep), transparent var(--sweep) 360deg)",
            }}
          />

          {/* Powder splash effect */}
          <div className="absolute inset-0 m-auto overflow-visible">
            <img
              ref={splashRef}
              src="/powder_splash.png"
              alt=""
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-[650%] w-[850%] -translate-x-1/2 -translate-y-1/2 object-contain will-change-transform"
              style={{ 
                transformOrigin: "center center -20px", // Closer to container for more impact
                filter: "brightness(1.05)" // Slight brightness boost
              }}
            />
          </div>

          {/* Bottle (front view) */}
          <img
            ref={bottle}
            src="/container.png"
            alt="HealthRx Protein Container"
            className="absolute inset-0 m-auto h-full w-full object-contain will-change-transform drop-shadow-[0_40px_80px_rgba(0,0,0,0.2)]"
          />

          {/* Premium teal badges (replace material PNGs) */}
          {materialData.map((data, index) => (
            <div
              key={data.id}
              ref={(el) => (materialRefs.current[index] = el)}
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 will-change-transform pointer-events-none select-none flex items-center justify-center rounded-full bg-teal-600 text-white shadow-lg shadow-teal-900/20 ring-1 ring-white/20"
              style={{
                width: "8rem", // ~68px for readability
                height: "8rem",
                transformOrigin: "center center",
                zIndex: 5,
              }}
            >
              <span className="px-3 text-center text-[10px] sm:text-lg font-semibold tracking-wide leading-tight uppercase">
                {data.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Sub copy at bottom of section to ensure scroll range */}
      <div className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 text-center">
        <p className="font-cormorant text-xl text-zinc-600">
          Precision nutrition. Effortless performance.
        </p>
      </div>
    </section>
  );
}
