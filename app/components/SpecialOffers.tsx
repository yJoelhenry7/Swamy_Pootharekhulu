"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { FaWhatsapp, FaMinus, FaPlus } from "react-icons/fa";
import {
  HiOutlineGift,
  HiOutlineBuildingOffice2,
  HiOutlineTruck,
  HiOutlineChatBubbleLeftRight,
  HiOutlineGlobeAsiaAustralia,
  HiOutlinePhone,
} from "react-icons/hi2";
import { useTranslations } from "next-intl";
import { PHONE_DISPLAY } from "../utils/brand";
import {
  getTeluguContactWhatsAppUrl,
  getTeluguHamperWhatsAppUrl,
} from "../utils/formatWhatsAppMessage";
import FolkSectionBackground from "./FolkSectionBackground";

const HAMPER_ITEM_IDS = [
  "dryFruitPutharekulu",
  "kova",
  "chocolate",
  "boost",
  "samosa",
] as const;

type HamperItemId = (typeof HAMPER_ITEM_IDS)[number];

export default function SpecialOffers() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const t = useTranslations("offers");

  const [hamperQuantities, setHamperQuantities] = useState<Record<HamperItemId, number>>({
    dryFruitPutharekulu: 0,
    kova: 0,
    chocolate: 0,
    boost: 0,
    samosa: 0,
  });

  const updateHamperQuantity = (id: HamperItemId, delta: number) => {
    setHamperQuantities((prev) => ({
      ...prev,
      [id]: Math.min(5, Math.max(0, prev[id] + delta)),
    }));
  };

  const buildHamperWhatsAppUrl = (quantities: Record<HamperItemId, number>): string =>
    getTeluguHamperWhatsAppUrl(quantities, HAMPER_ITEM_IDS);

  const hamperFeatures = [
    t("featurePackaging"),
    t("featureGreeting"),
    t("featureCustom"),
  ];

  const corporateFeatures = [
    t("corpFeature1"),
    t("corpFeature2"),
    t("corpFeature3"),
  ];

  return (
    <section
      id="special-offers"
      ref={ref}
      className="relative py-24 overflow-hidden"
    >
      <FolkSectionBackground variant="cream" />

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

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            whileHover={{ y: -10 }}
            className="group"
          >
            <div className="bg-white/95 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-[var(--bronze)]/25">
              <div className="bg-gradient-to-r from-[var(--deep)] to-[var(--deep-soft)] p-8 text-[var(--cream)] relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[var(--gold)]/10 rounded-full blur-2xl" />
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-[var(--ivory)]/10 border border-[var(--gold)]/35 rounded-2xl mb-4 text-[var(--gold)]">
                    <HiOutlineGift className="w-10 h-10" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-3xl font-bold mb-2 text-white">{t("giftHampers")}</h3>
                  <p className="text-[var(--cream)]/90 text-lg">{t("giftHampersDesc")}</p>
                </div>
              </div>

              <div className="p-8">
                <p className="text-sm text-gray-600 mb-4">{t("giftHampersHint")}</p>

                <div className="space-y-4 mb-6">
                  {HAMPER_ITEM_IDS.map((id) => (
                    <div
                      key={id}
                      className="flex items-center justify-between gap-3 py-2 border-b border-gray-100 last:border-0"
                    >
                      <span className="text-gray-800 font-medium text-sm sm:text-base flex-1">
                        {t(id)}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateHamperQuantity(id, -1)}
                          disabled={hamperQuantities[id] === 0}
                          className="flex items-center justify-center w-8 h-8 bg-[var(--maroon)] text-white rounded-lg hover:bg-[var(--burgundy-800)] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                          aria-label={`Decrease ${t(id)}`}
                        >
                          <FaMinus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center font-bold text-[var(--maroon)]">
                          {hamperQuantities[id]}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateHamperQuantity(id, 1)}
                          disabled={hamperQuantities[id] >= 5}
                          className="flex items-center justify-center w-8 h-8 bg-[var(--maroon)] text-white rounded-lg hover:bg-[var(--burgundy-800)] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                          aria-label={`Increase ${t(id)}`}
                        >
                          <FaPlus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 mb-6">
                  {hamperFeatures.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-[var(--gold)]/20 rounded-full flex items-center justify-center">
                        <span className="text-[var(--gold)] text-sm">✓</span>
                      </div>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={buildHamperWhatsAppUrl(hamperQuantities)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-[var(--maroon)] text-white text-center py-4 rounded-xl font-bold hover:bg-[var(--burgundy-800)] transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {t("orderHamper")}
                </motion.a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ y: -10 }}
            className="group"
          >
            <div className="bg-white/95 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-[var(--bronze)]/25">
              <div className="bg-gradient-to-r from-[var(--deep-soft)] to-[var(--deep)] p-8 text-[var(--cream)] relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[var(--gold)]/10 rounded-full blur-2xl" />
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-[var(--ivory)]/10 border border-[var(--gold)]/35 rounded-2xl mb-4 text-[var(--gold)]">
                    <HiOutlineBuildingOffice2 className="w-10 h-10" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-3xl font-bold mb-2 text-white">{t("corporateTitle")}</h3>
                  <p className="text-[var(--cream)]/90 text-lg">{t("corporateDesc")}</p>
                </div>
              </div>

              <div className="p-8">
                <div className="space-y-4 mb-6">
                  {corporateFeatures.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-[var(--gold)]/20 rounded-full flex items-center justify-center">
                        <span className="text-[var(--gold)] text-sm">✓</span>
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-6 mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-sm text-gray-600">{t("startingFrom")}</span>
                    <span className="text-3xl font-bold text-[var(--maroon)]">
                      ₹25,000
                    </span>
                  </div>
                </div>

                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={getTeluguContactWhatsAppUrl()}
                  className="block w-full bg-[var(--maroon)] text-white text-center py-4 rounded-xl font-bold hover:bg-[var(--burgundy-800)] transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {t("inquire")}
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-[var(--deep)] via-[var(--deep-soft)] to-[var(--deep)] rounded-2xl p-8 md:p-12 shadow-2xl border border-[var(--bronze)]/30"
        >
          <div className="grid md:grid-cols-3 gap-8 text-[var(--cream)] text-center">
            <motion.div whileHover={{ scale: 1.05 }} className="space-y-3">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--ivory)]/10 border border-[var(--gold)]/35 rounded-full text-[var(--gold)]">
                <HiOutlineGift className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <h4 className="text-xl font-bold text-white">{t("packagingTitle")}</h4>
              <p className="text-[var(--cream)]/85">{t("packagingDesc")}</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="space-y-3">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--ivory)]/10 border border-[var(--gold)]/35 rounded-full text-[var(--gold)]">
                <HiOutlineTruck className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <h4 className="text-xl font-bold text-white">{t("panIndiaTitle")}</h4>
              <p className="text-[var(--cream)]/85">{t("panIndiaDesc")}</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="space-y-3">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--ivory)]/10 border border-[var(--gold)]/35 rounded-full text-[var(--gold)]">
                <HiOutlineChatBubbleLeftRight className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <h4 className="text-xl font-bold text-white">{t("supportTitle")}</h4>
              <p className="text-[var(--cream)]/85">{t("supportDesc")}</p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="inline-block bg-[var(--ivory)] border border-[var(--bronze)]/35 rounded-2xl px-8 py-6">
            <p className="text-[var(--deep)] text-lg font-semibold mb-2 flex items-center justify-center gap-2">
              <HiOutlineGlobeAsiaAustralia className="w-6 h-6 text-[var(--bronze)]" strokeWidth={1.5} />
              {t("internationalOrders")}
            </p>
            <p className="text-[var(--ink)]/70 mb-3">{t("worldwideDelivery")}</p>
            <p className="text-[var(--deep)] font-bold flex items-center justify-center gap-2">
              <HiOutlinePhone className="w-4 h-4 text-[var(--bronze)]" strokeWidth={1.5} />
              {PHONE_DISPLAY}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
