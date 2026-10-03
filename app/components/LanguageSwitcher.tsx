"use client";

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { MdLanguage } from 'react-icons/md';
import { useTransition } from 'react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'te' : 'en';
    const segments = pathname?.split('/') ?? [];
    // pathname is like /en or /en/cart or /te/cart
    if (segments.length > 1 && (segments[1] === 'en' || segments[1] === 'te')) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    const nextPath = segments.join('/') || `/${newLocale}`;

    startTransition(() => {
      router.push(nextPath);
      router.refresh();
    });
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
      disabled={isPending}
      className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-[var(--bronze)]/35 bg-[var(--ivory)] px-3 py-1.5 font-sans text-sm font-semibold text-[var(--deep)] transition-all duration-300 hover:bg-[var(--deep)] hover:text-[var(--cream)] disabled:opacity-50"
      aria-label="Switch language"
    >
      <MdLanguage className="w-4 h-4" />
      <span>{locale === 'en' ? 'తెలుగు' : 'English'}</span>
    </motion.button>
  );
}
