"use client";

import { motion } from "framer-motion";
import { FaWhatsapp, FaHeart } from "react-icons/fa";
import { MdPhone, MdLocationOn } from "react-icons/md";
import { useTranslations } from 'next-intl';
import {
  GOOGLE_BUSINESS_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
} from "../utils/brand";
import { getTeluguContactWhatsAppUrl } from "../utils/formatWhatsAppMessage";
import FolkSectionBackground from "./FolkSectionBackground";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const tProducts = useTranslations('products');

  const quickLinks = [
    { name: tNav('home'), href: "#home" },
    { name: tNav('products'), href: "#products" },
    { name: tNav('about'), href: "#about" },
    { name: tNav('founders'), href: "#founders" },
    { name: tNav('location'), href: "#location" },
    { name: tNav('contact'), href: "#contact" },
  ];

  const popularSweets = [
    tProducts('traditional.name'),
    tProducts('karampodi.name'),
    tProducts('chocolate.name'),
    tProducts('kova.name'),
    tProducts('sugarFree.name'),
  ];

  return (
    <footer className="relative text-[var(--ink)] overflow-hidden border-t border-[var(--gold)]/30">
      <FolkSectionBackground variant="gold" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold text-[var(--gold)] mb-1 font-serif">
              {t('brand')}
            </h3>
            <p className="text-[var(--ink)]/60 text-sm mb-4">
              {t('brandSubtitle')}
            </p>
            <p className="text-[var(--ink)]/80 mb-4 leading-relaxed">
              {t('tagline')}
            </p>
            <p className="text-[var(--gold-700)] font-semibold mb-6">
              {t('deliveryLine')}
            </p>
            <motion.a
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              href={getTeluguContactWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-[var(--gold)] text-white rounded-full inline-flex items-center justify-center hover:bg-[var(--gold-600)] transition-all duration-300 shadow-lg"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-xl font-bold text-[var(--gold)] mb-6">
              {t('quickLinks')}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-[var(--ink)]/75 hover:text-[var(--gold)] transition-colors duration-300 inline-flex items-center group"
                  >
                    <span className="mr-2 group-hover:mr-3 transition-all duration-300">
                      →
                    </span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-xl font-bold text-[var(--gold)] mb-6">
              {t('products')}
            </h4>
            <ul className="space-y-3">
              {popularSweets.map((sweet, index) => (
                <li key={index}>
                  <a
                    href="#products"
                    className="text-[var(--ink)]/75 hover:text-[var(--gold)] transition-colors duration-300 inline-flex items-center group"
                  >
                    <span className="mr-2 text-[var(--gold)]">✦</span>
                    {sweet}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-xl font-bold text-[var(--gold)] mb-6">
              {t('contactUs')}
            </h4>
            <div className="space-y-4">
              <a
                href={`tel:${PHONE_TEL}`}
                className="flex items-center gap-3 text-[var(--ink)]/75 hover:text-[var(--gold)] transition-colors duration-300"
              >
                <MdPhone className="w-5 h-5 text-[var(--gold)]" />
                <span>{PHONE_DISPLAY}</span>
              </a>
              <a
                href={GOOGLE_BUSINESS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[var(--ink)]/75 hover:text-[var(--gold)] transition-colors duration-300"
              >
                <MdLocationOn className="w-5 h-5 text-[var(--gold)]" />
                <span>{t('location')}</span>
              </a>
              <div className="pt-4">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={getTeluguContactWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#20BA5A] transition-all duration-300 shadow-lg"
                >
                  <FaWhatsapp className="w-5 h-5" />
                  {t('orderWhatsApp')}
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-[var(--gold)]/25 pt-8 mt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[var(--ink)]/60 text-sm text-center md:text-left">
              © {currentYear} {t('brand')}. {t('rights')}
            </p>
            <p className="text-[var(--ink)]/60 text-sm flex items-center gap-2">
              {t('madeWith')}{" "}
              <FaHeart className="text-[var(--gold)] animate-pulse" />{" "}
              {t('madeIn')}
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
