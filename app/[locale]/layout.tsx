import { Cormorant_Garamond, Source_Sans_3, Noto_Sans_Telugu } from "next/font/google";
import "./globals.css";
import JsonLd from "../components/JsonLd";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { CartProvider } from '../context/CartContext';

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

const locales = ['en', 'te'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  return {
    title: "Swamy Putharekulu - Atreyapuram's Golden Leaf Pootharekulu",
    description: "Swamy Putharekulu — Authentic Atreyapuram Pootharekulu. 15 delicious varieties from ₹20/piece. Live hygienic preparation with 100% pure ghee. Bulk orders & live stall bookings across Andhra Pradesh & Telangana.",
    keywords: "Swamy Putharekulu, Atreyapuram Pootharekulu, Golden Leaf Pootharekulu, Andhra sweets, traditional sweets, paper thin sweet, Indian sweets, live preparation, pure ghee, pootharekulu online, dry fruit pootharekulu",
    authors: [{ name: "Swamy Putharekulu" }],
    creator: "Swamy Putharekulu",
    publisher: "Swamy Putharekulu",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL("https://www.swamyputharekulu.com"),
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title: "Swamy Putharekulu - Atreyapuram's Golden Leaf Pootharekulu",
      description: "Authentic Atreyapuram Pootharekulu — 15 varieties from ₹20/piece. Live hygienic preparation with 100% pure ghee. Serving Andhra Pradesh & Telangana.",
      url: "https://www.swamyputharekulu.com",
      siteName: "Swamy Putharekulu",
      images: [
        {
          url: "/logo.png",
          width: 1200,
          height: 630,
          alt: "Swamy Putharekulu - Atreyapuram Pootharekulu",
        },
      ],
      locale: locale === 'te' ? 'te_IN' : 'en_IN',
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Swamy Putharekulu - Atreyapuram's Golden Leaf Pootharekulu",
      description: "Authentic Atreyapuram Pootharekulu — 15 varieties from ₹20/piece. Live hygienic preparation with 100% pure ghee.",
      images: ["/logo.png"],
      creator: "@swamyputharekulu",
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
        { url: "/logo.png", type: "image/png" },
        { url: "/logo.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [
        { url: "/logo.png", sizes: "180x180", type: "image/png" },
      ],
    },
    manifest: "/site.webmanifest",
    verification: {
      google: "your-google-verification-code",
      yandex: "your-yandex-verification-code",
    },
  };
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  if (!locales.includes(locale as any)) notFound();
  
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
          <CartProvider>
            {children}
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
