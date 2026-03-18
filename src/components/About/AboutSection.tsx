"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import aboutImg from "@/assets/3.jpg";
import { useTranslations } from "next-intl";
import { About, Statistic } from "@/types/homeApiTypes";
import { Check } from "lucide-react";

export default function AboutSection({ about, statistics }: { about: About, statistics: Statistic[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const statRefs = useRef<(HTMLDivElement | null)[]>([]);
  const t = useTranslations("home");

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
        toggleActions: "play none none reverse",
      },
      onComplete: () => {
        // ✅ RUN COUNTING LOGIC ONLY AFTER ALL ANIMATIONS
        statRefs.current.forEach((el, index) => {
          if (!el) return;

          const endValue = Number(el.dataset.value) || 0;
          let current = 0;

          // reset text hard
          el.innerText = `0${index === 3 ? "" : "+"}`;

          const duration = 2000; // total time in ms
          const stepTime = 20; // update interval
          const steps = duration / stepTime;
          const increment = endValue / steps;

          const counter = setInterval(() => {
            current += increment;

            if (current >= endValue) {
              current = endValue;
              clearInterval(counter);
            }

            el.innerText = Math.floor(current) + (index === 3 ? "" : "+");
          }, stepTime);
        });
      },
    });

    // Header
    tl.from(".about-header", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    tl.from(
      ".about-header-line",
      {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1,
        ease: "power3.out",
      },
      "-=0.5",
    );

    // Content
    tl.from(
      ".about-description",
      {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      },
      "-=0.5",
    );

    tl.from(
      ".about-content-right",
      {
        x: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      },
      "-=0.8",
    );

    // Value Tags
    tl.from(
      ".about-value-tag",
      {
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)",
      },
      "-=0.5",
    );

    // Divider
    tl.from(
      ".about-divider",
      {
        scaleX: 0,
        transformOrigin: "center",
        duration: 1.5,
        ease: "power3.inOut",
      },
      "-=0.5",
    );

    // Stats Container
    tl.from(
      ".about-stats-container",
      {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.3",
    );
  }, []);

  const values = [t("QUALITY"), t("CLARITY"), t("TIME SAVING")];

  return (
    <>
      <section
        id="about"
        ref={sectionRef}
        className="relative overflow-hidden pt-28 pb-20 px-6 md:px-12 lg:px-20"
      >
      <div className="relative max-w-7xl mx-auto">

        {/* ── CENTERED HEADER ── */}
        <div className="about-header text-center mb-10 xl:mb-20">
          <div className="inline-block mb-6">
            <span className="text-[#c9a750] text-xs font-bold tracking-[0.5em] uppercase">{t("About")}</span>
            <div className="about-header-line h-0.5 w-full bg-gradient-to-r from-transparent via-[#c9a750] to-transparent mt-2"></div>
          </div>
            <h2 className="text-[55px] md:text-[100px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#c9a750] via-[#b2913c] to-[#8c6d3b] leading-tight">
            {t("ABOUT_TITLE_PART1")}{" "}
              <span className="text-[#e6d5c0] animate-gradient">
              {t("ABOUT_TITLE_PART2")}
            </span>
          </h2>
        </div>

        {/* ── MAIN CONTENT GRID ── */}
        <div className="grid lg:grid-cols-2 gap-16 mb-10 xl:mb-20 items-center">

          {/* LEFT: Capability list + quote + specialisation */}
          <div className="about-description flex flex-col gap-10">
            {/* Bullet list – 2-col grid, last item full-width */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {about.badges?.map((point, i, arr) => (
                <div
                  key={i} 
                  className={`group flex items-center gap-4 p-4 rounded-xl border border-[#c9a750]/10 bg-[#1a1712] hover:border-[#c9a750]/35 transition-all duration-400 ${
                    i === arr.length - 1 && arr.length % 2 !== 0 ? "md:col-span-2" : ""
                  }`}
                >
                  <div className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center bg-[#c9a750]/8 text-[#c9a750] group-hover:bg-[#c9a750] group-hover:text-[#171410] transition-all duration-400">
                    <Check className="w-4 h-4" strokeWidth={2.5} />
                  </div>
                  <span className="text-[#e6d5c0]/80 text-sm font-semibold leading-snug group-hover:text-[#e6d5c0] transition-colors">{point}</span>
                </div>
              ))}
            </div>

            {/* Mindset quote */}
            <div className="relative pl-6 border-l-2 border-[#c9a750]">
              <p className="text-[#c9a750] text-xl md:text-2xl font-bold italic leading-snug">
                &ldquo;{t("Mindset Quote")}&rdquo;
              </p>
            </div>

            {/* Specialisation */}
            <div 
              className="text-[#e6d5c0]/60 text-base md:text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ __html: about.description }}
            />

            {/* Value Pills – refined */}
            <div className="flex flex-wrap gap-3 pt-2">
              {values.map((v) => (
                <span key={v} className="about-value-tag group flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#c9a750]/20 bg-[#c9a750]/5 text-[#c9a750] text-[11px] font-black tracking-[0.25em] uppercase hover:bg-[#c9a750] hover:text-[#171410] hover:border-[#c9a750] transition-all duration-400 cursor-default">
                  <span className="w-1 h-1 rounded-full bg-current"></span>
                  {v}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT: Image – stretched to match left height */}
          <div className="hidden lg:flex about-content-right self-stretch">
            <div className="relative w-full rounded-3xl overflow-hidden border border-[#c9a750]/20 group hover:border-[#c9a750]/50 transition-all duration-700 shadow-2xl min-h-[500px]">
              <Image
                src={about.image_url ?? aboutImg}
                alt={about.alt_image || "KOIA Execution"}
                fill
                className="object-cover brightness-90 group-hover:scale-105 group-hover:brightness-100 transition-all duration-[2000ms]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171410] via-[#171410]/20 to-transparent opacity-70 group-hover:opacity-40 transition-opacity duration-700"></div>
            </div>
          </div>
        </div>

        {/* ── DIVIDER ── */}
        <div className="about-divider h-px bg-gradient-to-r from-transparent via-[#c9a750]/40 to-transparent mb-20"></div>

        {/* ── STATS — untouched ── */}
        <div className="about-stats-container grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {statistics.map((stat, index) => (
            <div
              key={stat.id}
              className="about-stat-item group relative text-center py-10 px-4 md:px-8 bg-gradient-to-br from-[#1f1b16] to-[#171410] rounded-3xl border border-[#c9a750]/10 hover:border-[#c9a750]/40 transition-all duration-500 hover:shadow-2xl hover:shadow-[#c9a750]/5 overflow-hidden"
            >
              <span className="pointer-events-none absolute -bottom-6 -right-4 text-[9rem] font-black text-[#c9a750]/4 leading-none select-none group-hover:text-[#c9a750]/8 transition-colors">{stat.count}</span>

              <div className="relative z-10">
                <div
                  ref={(el) => { statRefs.current[index] = el; }}
                  data-value={stat.count}
                  className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#c9a750] via-[#b2913c] to-[#8c6d3b] mb-4"
                >
                  0+
                </div>
                <div className="h-px w-10 bg-[#c9a750] mx-auto mb-4 group-hover:w-16 transition-all duration-500"></div>
                <div className="text-[#e6d5c0]/60 text-xs md:text-sm font-bold uppercase tracking-widest leading-relaxed">
                  {stat.title}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── BOTTOM DIVIDER ── */}
        <div className="about-divider mt-20 h-px bg-gradient-to-r from-transparent via-[#c9a750]/20 to-transparent"></div>
      </div>
    </section>
      <style jsx>{`
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </>
  );
}

