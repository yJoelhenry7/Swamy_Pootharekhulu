"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  HiOutlineHandRaised,
  HiOutlineSparkles,
  HiOutlineHeart,
  HiOutlineShieldCheck,
} from "react-icons/hi2";
import { GiLotus } from "react-icons/gi";
import { useTranslations } from "next-intl";
import FolkSectionBackground from "./FolkSectionBackground";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const t = useTranslations("about");

  const features = [
    {
      icon: <HiOutlineHandRaised className="w-9 h-9" strokeWidth={1.5} />,
      title: t("handcrafted"),
      description: t("handcraftedDesc"),
    },
    {
      icon: <HiOutlineSparkles className="w-9 h-9" strokeWidth={1.5} />,
      title: t("premiumIngredients"),
      description: t("premiumIngredientsDesc"),
    },
    {
      icon: <HiOutlineHeart className="w-9 h-9" strokeWidth={1.5} />,
      title: t("passion"),
      description: t("passionDesc"),
    },
    {
      icon: <HiOutlineShieldCheck className="w-9 h-9" strokeWidth={1.5} />,
      title: t("certified"),
      description: t("certifiedDesc"),
    },
  ];

  return (
    <section id="about" ref={ref} className="relative py-24 overflow-hidden">
      <FolkSectionBackground variant="warm" />

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
          <p className="text-xl text-[var(--ink)]/70 max-w-3xl mx-auto leading-relaxed">
            {t("story")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-[var(--deep)] font-serif">
              {t("heritage")}
            </h3>
            <div className="space-y-4 text-[var(--ink)]/70 text-lg leading-relaxed">
              <p>{t("story")}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-[var(--deep)] to-[var(--deep-soft)] rounded-3xl p-8 md:p-12 shadow-2xl border border-[var(--gold)]/25">
              <div className="relative space-y-6 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 mx-auto rounded-full bg-[var(--ivory)]/10 border border-[var(--gold)]/40 text-[var(--gold)]">
                  <GiLotus className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-4 font-serif">
                  {t("celebrating")}
                </h4>
                <p className="text-[var(--cream)]/90 text-lg">{t("story")}</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-[var(--deep)] text-center mb-12 font-serif">
            {t("whyChooseUs")}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white/90 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-[var(--bronze)]/20 text-center"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[var(--ivory)] text-[var(--deep)] border border-[var(--bronze)]/35 mb-6">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-[var(--deep)] mb-3">
                  {feature.title}
                </h4>
                <p className="text-[var(--ink)]/65 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
