"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  HiOutlineSparkles,
  HiOutlineCake,
  HiOutlineHeart,
  HiOutlineGift,
  HiOutlineTruck,
  HiOutlineShieldCheck,
  HiOutlineCube,
} from "react-icons/hi2";
import { GiTempleGate, GiPartyPopper } from "react-icons/gi";
import { useTranslations } from "next-intl";
import FolkSectionBackground from "./FolkSectionBackground";

const iconWell =
  "inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 bg-[var(--ivory)] text-[var(--deep)] border border-[var(--bronze)]/35 shadow-sm";

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const t = useTranslations("features");

  const categories = [
    {
      icon: <HiOutlineSparkles className="w-8 h-8" strokeWidth={1.5} />,
      title: t("sankrantiTitle"),
      description: t("sankrantiDesc"),
    },
    {
      icon: <HiOutlineCake className="w-8 h-8" strokeWidth={1.5} />,
      title: t("birthdayTitle"),
      description: t("birthdayDesc"),
    },
    {
      icon: <HiOutlineHeart className="w-8 h-8" strokeWidth={1.5} />,
      title: t("weddingTitle"),
      description: t("weddingDesc"),
    },
    {
      icon: <HiOutlineGift className="w-8 h-8" strokeWidth={1.5} />,
      title: t("corporateTitle"),
      description: t("corporateDesc"),
    },
    {
      icon: <GiPartyPopper className="w-8 h-8" />,
      title: t("festivalTitle"),
      description: t("festivalDesc"),
    },
    {
      icon: <GiTempleGate className="w-8 h-8" />,
      title: t("templeTitle"),
      description: t("templeDesc"),
    },
  ];

  const benefits = [
    {
      icon: <HiOutlineTruck className="w-7 h-7" strokeWidth={1.5} />,
      title: t("fastDeliveryTitle"),
      description: t("fastDeliveryDesc"),
    },
    {
      icon: <HiOutlineShieldCheck className="w-7 h-7" strokeWidth={1.5} />,
      title: t("premiumQualityTitle"),
      description: t("premiumQualityDesc"),
    },
    {
      icon: <HiOutlineCube className="w-7 h-7" strokeWidth={1.5} />,
      title: t("customOrdersTitle"),
      description: t("customOrdersDesc"),
    },
  ];

  return (
    <section id="features" ref={ref} className="relative py-24 overflow-hidden">
      <FolkSectionBackground variant="gold" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block px-6 py-2 bg-[var(--ivory)] border border-[var(--bronze)]/40 rounded-full text-[var(--deep)] text-sm font-semibold tracking-wider mb-4"
          >
            {t("tag")}
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--deep)] mb-6 font-serif">
            {t("title")}
          </h2>
          <p className="text-xl text-[var(--ink)]/70 max-w-3xl mx-auto">
            {t("description")}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 items-stretch">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group cursor-pointer h-full"
            >
              <div className="relative flex h-full flex-col bg-white/90 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-[var(--bronze)]/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--ivory)]/0 to-[var(--gold)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative flex flex-1 flex-col">
                  <div className={iconWell}>{category.icon}</div>

                  <h3 className="text-2xl font-bold text-[var(--deep)] mb-3 group-hover:text-[var(--bronze)] transition-colors duration-300">
                    {category.title}
                  </h3>
                  <p className="flex-1 text-[var(--ink)]/65 leading-relaxed">
                    {category.description}
                  </p>

                  <motion.div
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                    className="h-1 bg-gradient-to-r from-[var(--bronze)] to-[var(--gold)] mt-6 rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-[var(--deep)] to-[var(--deep-soft)] rounded-3xl p-8 md:p-12 shadow-2xl border border-[var(--bronze)]/30"
        >
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="flex items-start gap-4 text-[var(--cream)]"
              >
                <div className="flex-shrink-0 w-14 h-14 bg-[var(--ivory)]/15 border border-[var(--gold)]/40 rounded-xl flex items-center justify-center text-[var(--gold)]">
                  {benefit.icon}
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-white">
                    {benefit.title}
                  </h4>
                  <p className="text-[var(--cream)]/85">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-16"
        >
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#contact"
            className="inline-block rounded-full bg-[var(--deep)] px-12 py-4 font-sans text-lg font-semibold text-[var(--cream)] shadow-[0_10px_24px_rgba(61,46,26,0.22)] transition-all duration-300 hover:bg-[var(--bronze)]"
          >
            {t("orderButton")}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
