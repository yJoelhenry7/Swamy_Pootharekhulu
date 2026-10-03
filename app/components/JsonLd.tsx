import {
  BRAND_NAME,
  GOOGLE_BUSINESS_URL,
  PHONE_TEL,
  WHATSAPP_NUMBER,
} from "../utils/brand";

const SITE_URL = "https://www.swamyputharekulu.com";

export default function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": SITE_URL,
    name: BRAND_NAME,
    alternateName: [
      "Swamy Putharekulu",
      "Atreyapuram's Golden Leaf Pootharekulu",
    ],
    description:
      "Authentic Atreyapuram Pootharekulu — 15 delicious varieties starting from ₹20 per piece. Live hygienic preparation with 100% pure ghee. Serving Andhra Pradesh & Telangana.",
    url: SITE_URL,
    telephone: PHONE_TEL,
    image: `${SITE_URL}/logo.png`,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.png`,
      width: "512",
      height: "512",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Atreyapuram",
      addressRegion: "Andhra Pradesh",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "16.8336517",
      longitude: "81.7803688",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "09:00",
        closes: "20:00",
      },
    ],
    priceRange: "₹20+",
    servesCuisine: "Indian",
    paymentAccepted: "Cash, UPI, Bank Transfer",
    currenciesAccepted: "INR",
    areaServed: [
      { "@type": "State", name: "Andhra Pradesh" },
      { "@type": "State", name: "Telangana" },
    ],
    founder: {
      "@type": "Person",
      name: "Swamy",
    },
    sameAs: [GOOGLE_BUSINESS_URL, `https://wa.me/${WHATSAPP_NUMBER}`],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: PHONE_TEL,
      contactType: "Customer Service",
      availableLanguage: ["English", "Telugu", "Hindi"],
      areaServed: "IN",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: "20",
      highPrice: "599",
      offerCount: "15",
    },
  };

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: `${SITE_URL}/#products`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "About",
        item: `${SITE_URL}/#about`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Founders",
        item: `${SITE_URL}/#founders`,
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Location",
        item: `${SITE_URL}/#location`,
      },
      {
        "@type": "ListItem",
        position: 6,
        name: "Contact",
        item: `${SITE_URL}/#contact`,
      },
    ],
  };

  const productStructuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Atreyapuram Pootharekulu",
    description:
      "Authentic paper-thin rice wafers with jaggery and ghee — Atreyapuram's Golden Leaf Pootharekulu from Swamy Putharekulu",
    image: `${SITE_URL}/products/pootharekulu.png`,
    brand: {
      "@type": "Brand",
      name: BRAND_NAME,
    },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/#products`,
      priceCurrency: "INR",
      price: "20",
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: BRAND_NAME,
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "150",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productStructuredData),
        }}
      />
    </>
  );
}
