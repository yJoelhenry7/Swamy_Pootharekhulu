"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FaShoppingCart } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslations, useLocale } from 'next-intl';
import { useCart } from '../context/CartContext';
import { LOGO_SRC } from '../utils/brand';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('nav');
  const locale = useLocale();
  const { getTotalItems } = useCart();
  const cartItemCount = getTotalItems();

  const navItems = [
    { name: t('home'), href: "#home" },
    { name: t('products'), href: "#products" },
    { name: t('about'), href: "#about" },
    { name: t('occasions'), href: "#features" },
    { name: t('founders'), href: "#founders" },
    { name: t('location'), href: "#location" },
    { name: t('contact'), href: "#contact" },
  ];

  const linkClass = "text-[var(--ink)] hover:text-[var(--gold)]";

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed w-full z-50 transition-all duration-300 bg-white/95 backdrop-blur-md shadow-md border-b border-[var(--gold)]/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-shrink-0"
          >
            <a href="#home" className="flex items-center">
              <div className="relative h-28 w-56 md:h-24 md:w-64">
                <Image
                  src={LOGO_SRC}
                  alt="Swamy Putharekulu"
                  fill
                  className="object-contain drop-shadow-lg"
                  priority
                  unoptimized
                  sizes="(max-width: 768px) 224px, 256px"
                />
              </div>
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1 items-center justify-end gap-2 xl:gap-3 min-w-0">
            <div className="flex items-center gap-0.5 xl:gap-1">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  href={item.href}
                  className={`${linkClass} whitespace-nowrap px-2 xl:px-2.5 py-2 text-sm xl:text-base font-medium transition-colors duration-300 relative group`}
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--gold)] transition-all duration-300 group-hover:w-full"></span>
                </motion.a>
              ))}
            </div>
            <div className="flex items-center gap-2 xl:gap-3 shrink-0 pl-1">
              <LanguageSwitcher />
              <Link
                href={`/${locale}/cart`}
                className={`flex items-center gap-1.5 ${linkClass} transition-colors duration-300 p-1.5`}
                aria-label={t('cart')}
              >
                <FaShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="bg-[var(--gold)] text-white text-xs font-bold rounded-full px-2 py-0.5 min-w-[22px] text-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>
              <a
                href="#contact"
                className="inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-[var(--deep)] px-4 xl:px-5 py-2 font-sans text-sm font-semibold leading-none text-[var(--cream)] shadow-md transition-all duration-300 hover:bg-[var(--bronze)] hover:shadow-lg"
              >
                {t('orderNow')}
              </a>
            </div>
          </div>

          {/* Mobile / tablet menu button */}
          <div className="lg:hidden flex items-center gap-2">
            <a
              href="#contact"
              className="inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-[var(--deep)] px-4 py-2 font-sans text-sm font-semibold leading-none text-[var(--cream)] shadow-md transition-all duration-300 hover:bg-[var(--bronze)]"
            >
              {t('orderNow')}
            </a>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className={`${linkClass} p-2 transition-colors duration-300`}
              aria-label="Menu"
            >
              {isOpen ? (
                <HiX className="h-8 w-8" />
              ) : (
                <HiMenuAlt3 className="h-8 w-8" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white/98 backdrop-blur-md border-t border-[var(--gold)]/20"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-[var(--ink)] hover:text-[var(--gold)] hover:bg-[var(--gold-50)] block px-3 py-3 text-base font-medium transition-all duration-300 rounded-lg"
                >
                  {item.name}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="px-3 py-2"
              >
                <LanguageSwitcher />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, delay: 0.45 }}
                className="px-3 py-2"
              >
                <Link
                  href={`/${locale}/cart`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 text-[var(--ink)] hover:text-[var(--gold)] transition-colors duration-300"
                >
                  <FaShoppingCart className="h-5 w-5" />
                  <span>{t('cart')}</span>
                  {cartItemCount > 0 && (
                    <span className="bg-[var(--gold)] text-white text-sm font-bold rounded-full px-2.5 py-0.5 min-w-[24px] text-center">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
              </motion.div>
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="mx-3 mt-4 inline-flex w-[calc(100%-1.5rem)] items-center justify-center whitespace-nowrap rounded-full bg-[var(--deep)] px-5 py-3 text-center font-sans text-base font-semibold leading-none text-[var(--cream)] transition-all duration-300 hover:bg-[var(--bronze)]"
              >
                {t('orderNow')}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
