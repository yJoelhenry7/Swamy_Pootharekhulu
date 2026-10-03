"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { FaMapMarkerAlt, FaPhone, FaExternalLinkAlt } from "react-icons/fa";
import {
  BRAND_NAME,
  GOOGLE_BUSINESS_URL,
  MAP_EMBED_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
} from "../utils/brand";
import FolkSectionBackground from "./FolkSectionBackground";

export default function LocationMap() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const t = useTranslations("location");

  return (
    <section
      id="location"
      ref={ref}
      className="relative py-24 overflow-hidden"
    >
      <FolkSectionBackground variant="cream" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block px-6 py-2 bg-[var(--gold)]/20 border border-[var(--gold)]/50 rounded-full text-[var(--maroon)] text-sm font-semibold tracking-wider mb-4"
          >
            {t("tag")}
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--maroon)] mb-6 font-serif">
            {t("title")}
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            {t("description")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="rounded-3xl overflow-hidden shadow-2xl border border-[var(--gold)]/30 bg-white"
        >
          <div className="relative w-full h-[360px] md:h-[480px]">
            <iframe
              title={`${BRAND_NAME} map`}
              src={MAP_EMBED_URL}
              className="absolute inset-0 w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-start gap-3 text-[var(--maroon)]">
              <FaMapMarkerAlt className="w-6 h-6 text-[var(--gold)] mt-1 flex-shrink-0" />
              <div>
                <p className="font-bold text-lg">{BRAND_NAME}</p>
                <p className="text-gray-700">{t("addressLabel")}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={GOOGLE_BUSINESS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[var(--gold)] text-white px-6 py-3 rounded-full font-semibold hover:bg-[var(--gold-600)] transition-all shadow-md"
              >
                <FaExternalLinkAlt className="w-4 h-4" />
                {t("openMaps")}
              </a>
              <a
                href={`tel:${PHONE_TEL}`}
                className="inline-flex items-center justify-center gap-2 bg-white text-[var(--maroon)] border-2 border-[var(--gold)] px-6 py-3 rounded-full font-semibold hover:bg-[var(--gold-50)] transition-all"
              >
                <FaPhone className="w-4 h-4" />
                {t("callUs")} · {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
