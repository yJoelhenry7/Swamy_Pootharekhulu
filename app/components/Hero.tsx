"use client";

import { motion, AnimatePresence } from "framer-motion";
import { HiArrowDown, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { MdVerified } from "react-icons/md";
import { useTranslations } from "next-intl";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import FolkSectionBackground from "./FolkSectionBackground";

function useIsCompact() {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setCompact(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return compact;
}

const HERO_SWEETS: { key: string; src: string; nameKey: string }[] = [
  {
    key: "chocolate",
    src: "/products/putharekulu/choclate_putharekhulu.png",
    nameKey: "chocolate.name",
  },
  {
    key: "dryFruit",
    src: "/products/putharekulu/bellam_dry_fruits_putharekhulu.png",
    nameKey: "jaggeryDryFruits.name",
  },
  {
    key: "kova",
    src: "/products/putharekulu/kova_putharekhulu.png?v=20261003",
    nameKey: "kova.name",
  },
  {
    key: "karampodi",
    src: "/products/putharekulu/karampodi_putharekhulu.png",
    nameKey: "karampodi.name",
  },
  {
    key: "samosa",
    src: "/products/putharekulu/samosa_putharekhulu.png",
    nameKey: "samosa.name",
  },
  {
    key: "sugarFree",
    src: "/products/putharekulu/diet_sugar_putharekhulu.png",
    nameKey: "sugarFree.name",
  },
  {
    key: "boost",
    src: "/products/putharekulu/horlicks_and_boost_putharekhulu.png",
    nameKey: "horlicksBoost.name",
  },
  {
    key: "sugarDry",
    src: "/products/putharekulu/sugar_dry_fruits_putharekhulu.png",
    nameKey: "sugarDryFruits.name",
  },
];

function getCircularOffset(index: number, active: number, total: number) {
  let offset = index - active;
  const half = total / 2;
  if (offset > half) offset -= total;
  if (offset < -half) offset += total;
  return offset;
}

/** Arc positions: active in front-center, neighbors spaced out on a gentle path */
function getOrbitPose(offset: number, compact: boolean) {
  const abs = Math.abs(offset);
  const angleDeg = offset * (compact ? 52 : 58);
  const rad = (angleDeg * Math.PI) / 180;
  const radiusX = compact ? 132 : 195;
  const radiusY = compact ? 28 : 40;

  return {
    x: Math.sin(rad) * radiusX,
    y: (1 - Math.cos(rad)) * radiusY + (abs === 0 ? 0 : abs * 4),
    scale: abs === 0 ? 1 : abs === 1 ? 0.78 : 0.58,
    opacity: abs === 0 ? 1 : abs === 1 ? 0.7 : 0.32,
    rotateY: offset * (compact ? -12 : -16),
    zIndex: 30 - abs * 10,
    filter: abs === 0 ? "none" : abs === 1 ? "none" : "blur(0.6px)",
  };
}

export default function Hero() {
  const t = useTranslations("hero");
  const tProducts = useTranslations("products");
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const compact = useIsCompact();
  const total = HERO_SWEETS.length;

  const goNext = useCallback(() => {
    setActive((prev) => (prev + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setActive((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(goNext, 4200);
    return () => clearInterval(id);
  }, [paused, goNext]);

  const activeSweet = HERO_SWEETS[active];
  const itemSize = compact ? 200 : 268;

  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex items-center overflow-hidden pt-24 pb-12 md:pt-28 md:pb-16"
    >
      <FolkSectionBackground variant="gold" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-6 lg:px-8 xl:gap-10">
        {/* Left — brand + legacy */}
        <motion.div
          initial={{ opacity: 0, x: -36 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="order-1 text-center lg:text-left"
        >
          <span className="mb-4 inline-block rounded-full border border-[var(--bronze)]/40 bg-[var(--ivory)]/70 px-5 py-2 font-sans text-xs font-semibold tracking-[0.16em] text-[var(--deep)] sm:text-sm">
            {t("tagline")}
          </span>

          <h1 className="font-serif text-4xl font-semibold leading-[1.15] text-[var(--deep)] sm:text-5xl md:text-6xl lg:text-[3.6rem] xl:text-7xl">
            {t("title")}
          </h1>

          <p className="mt-3 font-serif text-2xl font-medium italic text-[var(--bronze)] sm:text-3xl md:text-[2.1rem]">
            {t("legacy")}
          </p>

          <p className="mx-auto mt-5 max-w-xl font-sans text-base font-normal leading-relaxed text-[var(--ink)]/75 sm:text-lg lg:mx-0">
            {t("legacyQuote")}
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="#products"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-[var(--bronze)] bg-transparent px-8 py-3.5 font-sans text-base font-semibold text-[var(--deep)] transition hover:bg-[var(--ivory)] sm:w-auto"
            >
              {t("exploreButton")}
              <HiArrowDown className="h-5 w-5" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="#contact"
              className="inline-flex w-full items-center justify-center rounded-full bg-[var(--deep)] px-8 py-3.5 font-sans text-base font-semibold text-[var(--cream)] shadow-[0_10px_24px_rgba(61,46,26,0.22)] transition hover:bg-[var(--bronze)] sm:w-auto"
            >
              {t("orderButton")}
            </motion.a>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-5 text-sm font-semibold text-[var(--maroon)] sm:gap-7 lg:justify-start">
            <span className="inline-flex items-center gap-2">
              <MdVerified className="h-5 w-5 text-[var(--gold)]" />
              {t("varieties")}
            </span>
            <span className="inline-flex items-center gap-2">
              <MdVerified className="h-5 w-5 text-[var(--gold)]" />
              {t("pureFresh")}
            </span>
            <span className="inline-flex items-center gap-2">
              <MdVerified className="h-5 w-5 text-[var(--gold)]" />
              {t("customers")}
            </span>
          </div>
        </motion.div>

        {/* Right — framed circular stage */}
        <motion.div
          initial={{ opacity: 0, x: 36 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.12 }}
          className="order-2 flex justify-center lg:justify-end"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div className="relative w-full max-w-[420px] sm:max-w-[520px] md:max-w-[580px] lg:max-w-[620px]">
            {/* Soft glow — blends into hero */}
            <div
              className="pointer-events-none absolute left-1/2 top-[40%] h-[75%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.2)_0%,transparent_70%)] blur-3xl"
              aria-hidden="true"
            />

            {/* Subtle orbit guide */}
            <svg
              className="pointer-events-none absolute left-1/2 top-[40%] h-[72%] w-[92%] -translate-x-1/2 -translate-y-1/2 text-[var(--bronze)] opacity-[0.16]"
              viewBox="0 0 400 280"
              fill="none"
              aria-hidden="true"
            >
              <ellipse
                cx="200"
                cy="150"
                rx="175"
                ry="78"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeDasharray="4 14"
              />
            </svg>

            {/* Orbit stage — roomy so circles don't feel cramped */}
            <div
              className="relative mx-auto h-[340px] w-full sm:h-[400px] md:h-[460px]"
              style={{ perspective: "1600px" }}
            >
              {/* Soft floor shadow */}
              <div
                className="absolute bottom-[12%] left-1/2 h-5 w-[52%] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse,rgba(61,46,26,0.18)_0%,transparent_72%)] blur-md"
                aria-hidden="true"
              />

              {HERO_SWEETS.map((sweet, index) => {
                const offset = getCircularOffset(index, active, total);
                const abs = Math.abs(offset);
                // Keep only center + one neighbor each side for open spacing
                if (abs > 1) return null;

                const pose = getOrbitPose(offset, compact);
                const isActive = offset === 0;

                return (
                  <motion.button
                    key={sweet.key}
                    type="button"
                    onClick={() => setActive(index)}
                    className="absolute left-1/2 top-[44%] origin-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2"
                    style={{
                      width: itemSize,
                      height: itemSize,
                      marginLeft: -itemSize / 2,
                      marginTop: -itemSize / 2,
                      transformStyle: "preserve-3d",
                    }}
                    animate={{
                      x: pose.x,
                      y: pose.y,
                      scale: pose.scale,
                      opacity: pose.opacity,
                      rotateY: pose.rotateY,
                      zIndex: pose.zIndex,
                      filter: pose.filter,
                    }}
                    transition={{ type: "spring", stiffness: 260, damping: 30 }}
                    aria-label={tProducts(sweet.nameKey)}
                    aria-current={isActive ? "true" : undefined}
                  >
                    <div
                      className={`relative h-full w-full overflow-hidden rounded-full transition-shadow duration-300 ${
                        isActive
                          ? "border-[5px] border-[var(--gold)] shadow-[0_20px_50px_rgba(138,107,31,0.28)]"
                          : "border-[3px] border-[var(--gold)]/35 shadow-[0_12px_28px_rgba(61,46,26,0.12)]"
                      }`}
                    >
                      <Image
                        src={sweet.src}
                        alt={tProducts(sweet.nameKey)}
                        fill
                        className="object-contain object-center p-1"
                        sizes="(max-width: 768px) 200px, 280px"
                        priority={index < 3}
                        unoptimized
                      />
                    </div>

                    {isActive && (
                      <motion.span
                        layoutId="hero-active-dot"
                        className="absolute -bottom-2 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[var(--gold)] shadow-[0_0_14px_rgba(201,168,76,0.85)]"
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Name + controls */}
            <div className="relative z-10 mt-1 flex flex-col items-center gap-3 px-4 pb-2 pt-2">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeSweet.key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28 }}
                  className="min-h-[1.75rem] text-center font-serif text-lg font-semibold tracking-wide text-[var(--deep)] sm:min-h-[2rem] sm:text-xl md:text-2xl"
                >
                  {tProducts(activeSweet.nameKey)}
                </motion.p>
              </AnimatePresence>

              <div className="flex items-center gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={goPrev}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--gold)]/45 bg-white/90 text-[var(--maroon)] shadow-sm transition hover:border-[var(--gold)] hover:bg-[var(--gold)] hover:text-white sm:h-11 sm:w-11"
                  aria-label={t("prevSweet")}
                >
                  <HiChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>

                <div className="flex items-center gap-1.5">
                  {HERO_SWEETS.map((sweet, index) => (
                    <button
                      key={sweet.key}
                      type="button"
                      onClick={() => setActive(index)}
                      className={`h-2 rounded-full transition-all ${
                        index === active
                          ? "w-6 bg-[var(--gold)] sm:w-7"
                          : "w-2 bg-[var(--gold)]/30 hover:bg-[var(--gold)]/55"
                      }`}
                      aria-label={tProducts(sweet.nameKey)}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={goNext}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--gold)]/45 bg-white/90 text-[var(--maroon)] shadow-sm transition hover:border-[var(--gold)] hover:bg-[var(--gold)] hover:text-white sm:h-11 sm:w-11"
                  aria-label={t("nextSweet")}
                >
                  <HiChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
