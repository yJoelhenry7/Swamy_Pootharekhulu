import { Cormorant_Garamond, Source_Sans_3, Noto_Sans_Telugu } from "next/font/google";
import type { Viewport } from "next";
import "./globals.css";
import JsonLd from "../components/JsonLd";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { CartProvider } from "../context/CartContext";
import {
  BRAND_NAME,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_TYPE,
  OG_IMAGE_URL,
  OG_IMAGE_WIDTH,
  SITE_URL,
} from "../utils/brand";
import { buildSiteMetadata } from "../utils/seo";
import enMessages from "../../messages/en.json";
import teMessages from "../../messages/te.json";

const messageCatalogs = {
  en: enMessages,
  te: teMessages,
} as const;

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const sans = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const telugu = Noto_Sans_Telugu({
  variable: "--font-telugu",
  subsets: ["telugu"],
  weight: ["400", "500", "600", "700"],
});

const locales = ["en", "te"] as const;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fffaf0" },
    { media: "(prefers-color-scheme: dark)", color: "#3d2e1a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const catalog =
    messageCatalogs[locale as keyof typeof messageCatalogs] ??
    messageCatalogs.en;
  return buildSiteMetadata(catalog.seo, locale);
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as (typeof locales)[number])) notFound();

  const messages = await getMessages({ locale });

  return (
    <html
      lang={locale}
      className={`${display.variable} ${sans.variable} ${telugu.variable} h-full antialiased`}
    >
      <head>
        {/* Explicit absolute OG tags — WhatsApp uses these for link thumbnails */}
        <link rel="image_src" href={OG_IMAGE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={BRAND_NAME} />
        <meta property="og:url" content={`${SITE_URL}/${locale}`} />
        <meta property="og:image" content={OG_IMAGE_URL} />
        <meta property="og:image:secure_url" content={OG_IMAGE_URL} />
        <meta property="og:image:type" content={OG_IMAGE_TYPE} />
        <meta property="og:image:width" content={String(OG_IMAGE_WIDTH)} />
        <meta property="og:image:height" content={String(OG_IMAGE_HEIGHT)} />
        <meta property="og:image:alt" content={`${BRAND_NAME} — Atreyapuram Pootharekulu`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={OG_IMAGE_URL} />
        <JsonLd />
      </head>
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <CartProvider>{children}</CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
