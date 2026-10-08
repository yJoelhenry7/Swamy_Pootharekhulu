"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from 'next-intl';
import { useCart } from '../context/CartContext';
import { useProductLabels } from '../hooks/useProductLabels';
import { FaShoppingCart, FaMinus, FaPlus } from 'react-icons/fa';
import Link from 'next/link';
import FolkSectionBackground from './FolkSectionBackground';

export default function Products() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [selectedCategory, setSelectedCategory] = useState("All");
  const t = useTranslations('products');
  const locale = useLocale();
  const { getProductName, getProductDescription } = useProductLabels();
  const { items, addToCart, updateQuantity, removeFromCart } = useCart();

  const products = [
    // Putharekulu — flagship → classics → premium sweets → savory → special
    {
      id: "bellamOrganicDryFruits",
      category: "Premium",
      image: "/products/putharekulu/SSP_Bellam_organic_dry_fruits_Putharekulu.png",
      price: "₹500",
      packKey: "pack12" as const,
    },
    {
      id: "jaggeryDryFruits",
      category: "Classic",
      image: "/products/putharekulu/bellam_dry_fruits_putharekhulu.png",
      price: "₹200",
    },
    {
      id: "sugarDryFruits",
      category: "Classic",
      image: "/products/putharekulu/sugar_dry_fruits_putharekhulu.png",
      price: "₹250",
    },
    {
      id: "chocolate",
      category: "Premium",
      image: "/products/putharekulu/choclate_putharekhulu.png",
      price: "₹450",
    },
    {
      id: "kova",
      category: "Premium",
      image: "/products/putharekulu/kova_putharekhulu.png",
      price: "₹450",
    },
    {
      id: "horlicksBoost",
      category: "Premium",
      image: "/products/putharekulu/horlicks_and_boost_putharekhulu.png",
      price: "₹450",
    },
    {
      id: "karampodi",
      category: "Premium",
      image: "/products/putharekulu/karampodi_putharekhulu.png",
      price: "₹300",
    },
    {
      id: "samosa",
      category: "Premium",
      image: "/products/putharekulu/samosa_putharekhulu.png",
      price: "₹450",
    },
    {
      id: "sugarFree",
      category: "Special",
      image: "/products/putharekulu/diet_sugar_putharekhulu.png",
      price: "₹500",
    },
    // Sweets & Hot — sweets first, then savory/hot (paths match public/products/sweets and hot)
    {
      id: "organicBellamGavvalu",
      category: "Sweets & Hot",
      image: "/products/sweets and hot/Organic_Bellam_gavalu.png",
      price: "₹350",
    },
    {
      id: "bellamKommulu",
      category: "Sweets & Hot",
      image: "/products/sweets and hot/bellam_kommulu.png",
      price: "₹450",
    },
    {
      id: "bellamBoondi",
      category: "Sweets & Hot",
      image: "/products/sweets and hot/Bellam boondi.png",
      price: "₹450",
    },
    {
      id: "bellamMukkalu",
      category: "Sweets & Hot",
      image: "/products/sweets and hot/Bellam Mukkalu.png",
      price: "₹350",
    },
    {
      id: "sunnundalu",
      category: "Sweets & Hot",
      image: "/products/sweets and hot/sunnundalu.png",
      price: "₹450",
    },
    {
      id: "nuvulaVundalu",
      category: "Sweets & Hot",
      image: "/products/sweets and hot/Nuvula_vundalu.png",
      price: "₹350",
    },
    {
      id: "verusenagaUndalu",
      category: "Sweets & Hot",
      image: "/products/sweets and hot/Verusenaga_Undalu.png",
      price: "₹350",
    },
    {
      id: "atchu",
      category: "Sweets & Hot",
      image: "/products/sweets and hot/Atchu.png",
      price: "₹350",
    },
    {
      id: "chegodilu",
      category: "Sweets & Hot",
      image: "/products/sweets and hot/chegodilu.png",
      price: "₹450",
    },
    {
      id: "karamVerusenagalu",
      category: "Sweets & Hot",
      image: "/products/sweets and hot/Karam Verusenagalu.png",
      price: "₹450",
    },
    {
      id: "karamMixture",
      category: "Sweets & Hot",
      image: "/products/sweets and hot/Karam Mixture.png",
      price: "₹350",
    },
    {
      id: "masalaMixture",
      category: "Sweets & Hot",
      image: "/products/sweets and hot/Masala_Mixture.png",
      price: "₹350",
    },
    {
      id: "atukuluMixture",
      category: "Sweets & Hot",
      image: "/products/sweets and hot/Atukulu Mixture.png",
      price: "₹350",
    },
    {
      id: "janthikalu",
      category: "Sweets & Hot",
      image: "/products/sweets and hot/janthikalu.png",
      price: "₹350",
    },
    {
      id: "masalaPapad",
      category: "Sweets & Hot",
      image: "/products/sweets and hot/Masala Papad.png",
      price: "₹350",
    },
    {
      id: "sannaSev",
      category: "Sweets & Hot",
      image: "/products/sweets and hot/Sanna Sev.png",
      price: "₹350",
    },
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : selectedCategory === "Putharekulu"
        ? products.filter((p) => p.category !== "Sweets & Hot")
        : products.filter((p) => p.category === selectedCategory);

  const categoryLabelKeys: Record<string, string> = {
    Classic: "categoryClassic",
    Premium: "categoryPremium",
    Special: "categorySpecial",
    "Sweets & Hot": "categorySweetsAndHot",
  };

  const filterCategories = [
    { id: "All", labelKey: "categoryAll" },
    { id: "Putharekulu", labelKey: "categoryPutharekulu" },
    { id: "Classic", labelKey: "categoryClassic" },
    { id: "Premium", labelKey: "categoryPremium" },
    { id: "Special", labelKey: "categorySpecial" },
    { id: "Sweets & Hot", labelKey: "categorySweetsAndHot" },
  ] as const;

  // Get quantity of a product in cart
  const getProductQuantity = (productId: string): number => {
    const cartItem = items.find(item => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  const handleAddToCart = (product: typeof products[0]) => {
    const priceNumber = parseInt(product.price.replace('₹', ''));
    addToCart({
      id: product.id,
      name: getProductName(product.id),
      price: priceNumber,
      image: product.image,
    });
  };

  const handleIncrement = (product: typeof products[0]) => {
    const currentQty = getProductQuantity(product.id);
    if (currentQty === 0) {
      handleAddToCart(product);
    } else if (currentQty < 10) {
      updateQuantity(product.id, currentQty + 1);
    }
  };

  const handleDecrement = (productId: string) => {
    const currentQty = getProductQuantity(productId);
    if (currentQty === 1) {
      removeFromCart(productId);
    } else if (currentQty > 1) {
      updateQuantity(productId, currentQty - 1);
    }
  };

  const putharekuluProducts = filteredProducts.filter((p) => p.category !== "Sweets & Hot");
  const sweetsHotProducts = filteredProducts.filter((p) => p.category === "Sweets & Hot");
  const showFamilyBands = selectedCategory === "All";

  const productGroups = showFamilyBands
    ? [
        {
          key: "putharekulu",
          titleKey: "categoryPutharekulu" as const,
          items: putharekuluProducts,
        },
        {
          key: "sweetsHot",
          titleKey: "categorySweetsAndHot" as const,
          items: sweetsHotProducts,
        },
      ].filter((g) => g.items.length > 0)
    : [
        {
          key: "filtered",
          titleKey: null as null,
          items: filteredProducts,
        },
      ];

  const renderProductCard = (product: (typeof products)[0], index: number) => {
    const qty = getProductQuantity(product.id);
    const categoryLabelKey = categoryLabelKeys[product.category];
    const categoryLabel = categoryLabelKey
      ? t(categoryLabelKey)
      : product.category;

    return (
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.4) }}
        className="group relative flex h-full flex-col items-center text-center"
      >
        {/* Soft vertical divider between columns (hidden on last col via parent) */}
        <span
          data-v-divider
          aria-hidden
          className="pointer-events-none absolute -right-3 top-[18%] hidden h-[55%] w-px bg-gradient-to-b from-transparent via-[var(--bronze)]/45 to-transparent sm:block"
        />

        {/* Ivory plate */}
        <div className="relative mb-5 w-full max-w-[240px]">
          <div className="absolute left-1/2 top-[88%] h-4 w-[70%] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse,rgba(61,46,26,0.16)_0%,transparent_70%)] blur-md" />
          <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ duration: 0.35 }}
            className="relative mx-auto aspect-square w-full overflow-hidden rounded-full border-[3px] border-[var(--gold)]/55 bg-[#fffdf8] shadow-[0_14px_34px_rgba(61,46,26,0.12)]"
          >
            <Image
              src={product.image}
              alt={getProductName(product.id)}
              fill
              className="object-cover object-center scale-[1.06]"
              sizes="240px"
              unoptimized
            />
          </motion.div>
        </div>

        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bronze)]">
          {categoryLabel}
        </p>
        <h3 className="font-serif text-xl font-semibold leading-snug text-[var(--deep)] transition-colors group-hover:text-[var(--bronze)]">
          {getProductName(product.id)}
        </h3>
        <p className="mt-2 line-clamp-2 min-h-[2.6rem] px-1 text-sm leading-relaxed text-[var(--ink)]/65">
          {getProductDescription(product.id)}
        </p>

        <div className="mb-4 mt-3">
          <p className="font-serif text-2xl font-semibold text-[var(--deep)]">
            {product.price}
          </p>
          <p className="text-xs text-[var(--ink)]/50">
            {product.category === "Sweets & Hot"
              ? t("perKg")
              : t(
                  "packKey" in product && product.packKey
                    ? product.packKey
                    : "pack"
                )}
          </p>
        </div>

        <div className="mt-auto flex w-full max-w-[240px] flex-col gap-2">
          {qty > 0 ? (
            <>
              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => handleDecrement(product.id)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--bronze)]/35 bg-[var(--ivory)] text-[var(--deep)] transition hover:bg-[var(--deep)] hover:text-[var(--cream)]"
                  aria-label="Decrease quantity"
                >
                  <FaMinus className="h-3.5 w-3.5" />
                </button>
                <span className="min-w-[2.5rem] font-serif text-xl font-semibold text-[var(--deep)]">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => handleIncrement(product)}
                  disabled={qty >= 10}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--bronze)]/35 bg-[var(--ivory)] text-[var(--deep)] transition hover:bg-[var(--deep)] hover:text-[var(--cream)] disabled:opacity-40"
                  aria-label="Increase quantity"
                >
                  <FaPlus className="h-3.5 w-3.5" />
                </button>
              </div>
              <Link
                href={`/${locale}/cart`}
                className="text-sm font-semibold text-[var(--bronze)] underline-offset-4 transition hover:text-[var(--deep)] hover:underline"
              >
                {t("viewCart")}
              </Link>
            </>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => handleAddToCart(product)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--deep)] px-5 py-2.5 font-sans text-sm font-semibold text-[var(--cream)] shadow-[0_8px_20px_rgba(61,46,26,0.18)] transition hover:bg-[var(--bronze)]"
            >
              <FaShoppingCart className="h-3.5 w-3.5" />
              {t("addToCart")}
            </motion.button>
          )}
        </div>

        {/* Soft horizontal accent between stacked items (mobile) */}
        <span
          data-h-divider
          aria-hidden
          className="mt-10 h-px w-16 bg-gradient-to-r from-transparent via-[var(--bronze)]/50 to-transparent sm:hidden"
        />
      </motion.div>
    );
  };

  return (
    <section
      id="products"
      ref={ref}
      className="relative py-24 overflow-hidden"
    >
      <FolkSectionBackground variant="cream" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
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
            className="mb-4 inline-block rounded-full border border-[var(--bronze)]/40 bg-[var(--ivory)] px-6 py-2 text-sm font-semibold tracking-wider text-[var(--deep)]"
          >
            {t('sectionTag')}
          </motion.span>
          <h2 className="mb-6 font-serif text-4xl font-semibold text-[var(--deep)] md:text-5xl lg:text-6xl">
            {t('title')}
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-[var(--ink)]/70">
            {t('description')}
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16 flex flex-wrap justify-center gap-3"
        >
          {filterCategories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`rounded-full px-5 py-2.5 font-sans text-sm font-semibold transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-[var(--deep)] text-[var(--cream)] shadow-md"
                  : "border border-[var(--bronze)]/30 bg-white/80 text-[var(--deep)] hover:border-[var(--bronze)]"
              }`}
            >
              {t(category.labelKey)}
            </motion.button>
          ))}
        </motion.div>

        {/* Soft plate product groups */}
        <div className="space-y-16">
          {productGroups.map((group) => (
            <div key={group.key}>
              {group.titleKey && (
                <div className="mb-10 flex flex-col items-center text-center">
                  <h3 className="font-serif text-2xl font-semibold tracking-wide text-[var(--deep)] md:text-3xl">
                    {t(group.titleKey)}
                  </h3>
                  <span
                    aria-hidden
                    className="mt-3 h-[2px] w-20 rounded-full bg-gradient-to-r from-[var(--gold)] via-[var(--bronze)] to-[var(--gold)]"
                  />
                </div>
              )}

              <div
                className={[
                  "grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
                  // Hide vertical rules on last column of each row
                  "sm:[&>*:nth-child(2n)_[data-v-divider]]:hidden",
                  "lg:[&>*:nth-child(2n)_[data-v-divider]]:block",
                  "lg:[&>*:nth-child(3n)_[data-v-divider]]:hidden",
                  "xl:[&>*:nth-child(3n)_[data-v-divider]]:block",
                  "xl:[&>*:nth-child(4n)_[data-v-divider]]:hidden",
                  // Hide horizontal accent on last card (mobile stack)
                  "[&>*:last-child_[data-h-divider]]:hidden",
                ].join(" ")}
              >
                {group.items.map((product, index) => (
                  <div key={product.id} className="relative">
                    {renderProductCard(product, index)}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="mb-6 text-lg text-[var(--ink)]/70">
            {t('bulkOrderText')}
          </p>
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="#contact"
            className="inline-block rounded-full bg-[var(--deep)] px-10 py-3.5 font-sans text-lg font-semibold text-[var(--cream)] shadow-[0_10px_24px_rgba(61,46,26,0.2)] transition hover:bg-[var(--bronze)]"
          >
            {t('catalogButton')}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

