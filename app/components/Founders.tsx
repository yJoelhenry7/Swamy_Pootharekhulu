"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  HiOutlineUserGroup,
  HiOutlineShieldCheck,
} from "react-icons/hi2";
import FolkSectionBackground from "./FolkSectionBackground";

export default function Founders() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const t = useTranslations("founders");

  return (
    <section
      id="founders"
      ref={ref}
      className="relative py-24 overflow-hidden"
    >
      <FolkSectionBackground variant="gold" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
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

        <div className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-10 lg:gap-14 items-center max-w-6xl mx-auto mb-12">
          {/* Founder portrait */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-[var(--bronze)]/30 shadow-[0_24px_50px_rgba(61,46,26,0.16)]">
              <Image
                src="/founder.png"
                alt={t("founder1Name")}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 90vw, 480px"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--deep)]/85 via-[var(--deep)]/35 to-transparent px-6 pb-6 pt-20">
                <p className="font-serif text-2xl font-semibold text-white">
                  {t("founder1Name")}
                </p>
                <p className="mt-1 text-sm font-medium tracking-wide text-[var(--gold)]">
                  {t("founder1Role")}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Founder + team copy */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-2xl border border-[var(--bronze)]/20 bg-white/90 p-6 md:p-8 shadow-md"
            >
              <h3 className="font-serif text-2xl md:text-3xl font-semibold text-[var(--deep)]">
                {t("founder1Name")}
              </h3>
              <p className="mt-1 font-semibold text-[var(--bronze)]">
                {t("founder1Role")}
              </p>
              <p className="mt-4 text-[var(--ink)]/70 leading-relaxed text-base md:text-lg">
                {t("founder1Bio")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-2xl border border-[var(--bronze)]/20 bg-white/90 p-6 md:p-8 shadow-md"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border border-[var(--bronze)]/35 bg-[var(--ivory)] text-[var(--deep)]">
                  <HiOutlineUserGroup className="h-7 w-7" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-[var(--deep)]">
                    {t("founder2Name")}
                  </h3>
                  <p className="mt-1 font-semibold text-[var(--bronze)]">
                    {t("founder2Role")}
                  </p>
                  <p className="mt-3 text-[var(--ink)]/70 leading-relaxed">
                    {t("founder2Bio")}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-[var(--bronze)]/35 bg-[var(--ivory)] px-6 py-3 font-semibold text-[var(--deep)]">
            <HiOutlineShieldCheck
              className="h-6 w-6 text-[var(--bronze)]"
              strokeWidth={1.5}
            />
            {t("highlight")}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
