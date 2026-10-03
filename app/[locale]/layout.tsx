import { Cormorant_Garamond, Source_Sans_3, Noto_Sans_Telugu } from "next/font/google";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import JsonLd from "../components/JsonLd";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { CartProvider } from "../context/CartContext";
import {
  BRAND_NAME,
  OG_IMAGE_PATH,
  PHONE_TEL,
  SITE_URL,
} from "../utils/brand";
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
}): Promise<Metadata> {
  const { locale } = await params;
  const catalog =
    messageCatalogs[locale as keyof typeof messageCatalogs] ?? messageCatalogs.en;
  const seo = catalog.seo;
  const path = `/${locale}`;
  const pageUrl = `${SITE_URL}${path}`;
  const ogLocale = locale === "te" ? "te_IN" : "en_IN";
  const keywords = seo.keywords
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: seo.title,
      template: `%s | ${BRAND_NAME}`,
    },
    description: seo.description,
    keywords,
    authors: [{ name: BRAND_NAME, url: SITE_URL }],
    creator: BRAND_NAME,
    publisher: BRAND_NAME,
    category: "food",
    applicationName: BRAND_NAME,
    referrer: "origin-when-cross-origin",
    formatDetection: {
      email: false,
      address: false,
      telephone: true,
    },
    alternates: {
      canonical: path,
      languages: {
        en: "/en",
        te: "/te",
        "x-default": "/en",
      },
    },
    openGraph: {
      type: "website",
      locale: ogLocale,
      alternateLocale: locale === "te" ? ["en_IN"] : ["te_IN"],
      url: pageUrl,
      siteName: seo.siteName,
      title: seo.ogTitle,
      description: seo.ogDescription,
      images: [
        {
          url: OG_IMAGE_PATH,
          secureUrl: `${SITE_URL}${OG_IMAGE_PATH}`,
          width: 1200,
          height: 630,
          alt: seo.ogImageAlt,
          type: "image/png",
        },
      ],
      phoneNumbers: [PHONE_TEL],
      countryName: "India",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.twitterTitle,
      description: seo.twitterDescription,
      images: [
        {
          url: OG_IMAGE_PATH,
          width: 1200,
          height: 630,
          alt: seo.ogImageAlt,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/logo.png", type: "image/png", sizes: "500x500" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
      shortcut: ["/favicon.ico"],
    },
    manifest: "/site.webmanifest",
    appleWebApp: {
      capable: true,
      title: BRAND_NAME,
      statusBarStyle: "default",
    },
  };
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
