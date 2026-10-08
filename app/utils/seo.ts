import type { Metadata } from "next";
import {
  BRAND_NAME,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_PATH,
  OG_IMAGE_TYPE,
  OG_IMAGE_URL,
  OG_IMAGE_WIDTH,
  PHONE_DISPLAY,
  PHONE_TEL,
  SITE_URL,
} from "./brand";

type SeoCopy = {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  twitterTitle: string;
  twitterDescription: string;
  ogImageAlt: string;
  siteName: string;
};

export function buildOgImage(alt: string) {
  return {
    url: OG_IMAGE_URL,
    secureUrl: OG_IMAGE_URL,
    width: OG_IMAGE_WIDTH,
    height: OG_IMAGE_HEIGHT,
    alt,
    type: OG_IMAGE_TYPE,
  };
}

export function buildSiteMetadata(
  seo: SeoCopy,
  locale: string,
  path = `/${locale}`
): Metadata {
  const pageUrl = `${SITE_URL}${path}`;
  const ogLocale = locale === "te" ? "te_IN" : "en_IN";
  const keywords = seo.keywords
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);
  const ogImage = buildOgImage(seo.ogImageAlt);

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
    generator: "Next.js",
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
      determiner: "the",
      images: [ogImage],
      phoneNumbers: [PHONE_TEL],
      countryName: "India",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.twitterTitle,
      description: seo.twitterDescription,
      images: [
        {
          url: OG_IMAGE_URL,
          width: OG_IMAGE_WIDTH,
          height: OG_IMAGE_HEIGHT,
          alt: seo.ogImageAlt,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
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
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
      shortcut: ["/favicon.ico"],
    },
    manifest: "/site.webmanifest",
    appleWebApp: {
      capable: true,
      title: BRAND_NAME,
      statusBarStyle: "default",
    },
    other: {
      "og:image": OG_IMAGE_URL,
      "og:image:secure_url": OG_IMAGE_URL,
      "og:image:type": OG_IMAGE_TYPE,
      "og:image:width": String(OG_IMAGE_WIDTH),
      "og:image:height": String(OG_IMAGE_HEIGHT),
      "og:image:alt": seo.ogImageAlt,
      "twitter:image": OG_IMAGE_URL,
      "twitter:image:alt": seo.ogImageAlt,
      "theme-color": "#fffaf0",
      "msapplication-TileColor": "#3d2e1a",
      "geo.region": "IN-AP",
      "geo.placename": "Atreyapuram",
      "ICBM": "16.8336517, 81.7803688",
      "contact": PHONE_DISPLAY,
      "telephone": PHONE_DISPLAY,
    },
  };
}
