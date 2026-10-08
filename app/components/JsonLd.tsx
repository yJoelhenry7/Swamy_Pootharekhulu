import {
  BRAND_NAME,
  BRAND_TAGLINE,
  GOOGLE_BUSINESS_URL,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_URL,
  OG_IMAGE_WIDTH,
  PHONE_TEL,
  SHOP_IMAGE_SRC,
  SITE_URL,
  STAFF_1_SRC,
  STAFF_2_SRC,
  WHATSAPP_NUMBER,
} from "../utils/brand";

export default function JsonLd() {
  const shopImage = `${SITE_URL}${SHOP_IMAGE_SRC}`;
  const staff1 = `${SITE_URL}${STAFF_1_SRC}`;
  const staff2 = `${SITE_URL}${STAFF_2_SRC}`;
  const productHero = `${SITE_URL}/products/putharekulu/SSP_Bellam_organic_dry_fruits_Putharekulu.png`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "FoodEstablishment"],
    "@id": `${SITE_URL}/#business`,
    name: BRAND_NAME,
    alternateName: [
      "Swamy Putharekulu",
      "Swamy Pootharekulu",
      BRAND_TAGLINE,
    ],
    description:
      "Authentic Atreyapuram Pootharekulu — organic dry fruits, chocolate, kova, karampodi and more from ₹20 per piece. Live hygienic preparation with 100% pure ghee. Traditional sweets & hot snacks. Serving Andhra Pradesh & Telangana.",
    url: SITE_URL,
    telephone: PHONE_TEL,
    image: [OG_IMAGE_URL, shopImage, staff1, staff2, `${SITE_URL}/logo.png`],
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.png`,
      width: "500",
      height: "500",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "# 2-153/2, Canal Road, Uchhili",
      addressLocality: "Atreyapuram",
      addressRegion: "Andhra Pradesh",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "16.8336517",
      longitude: "81.7803688",
    },
    hasMap: GOOGLE_BUSINESS_URL,
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
        ],
        opens: "09:00",
        closes: "20:00",
      },
    ],
    priceRange: "₹20–₹500",
    servesCuisine: ["Indian", "Andhra", "Telugu"],
    paymentAccepted: "Cash, UPI, Bank Transfer, WhatsApp Pay",
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
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: PHONE_TEL,
        contactType: "customer service",
        availableLanguage: ["English", "Telugu", "Hindi"],
        areaServed: "IN",
      },
      {
        "@type": "ContactPoint",
        telephone: PHONE_TEL,
        contactType: "sales",
        availableLanguage: ["English", "Telugu"],
        areaServed: "IN",
        url: `https://wa.me/${WHATSAPP_NUMBER}`,
      },
    ],
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: "20",
      highPrice: "500",
      offerCount: "25",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/en#products`,
    },
  };

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: BRAND_NAME,
    url: SITE_URL,
    inLanguage: ["en-IN", "te-IN"],
    publisher: {
      "@id": `${SITE_URL}/#business`,
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
        item: `${SITE_URL}/en`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: `${SITE_URL}/en#products`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "About",
        item: `${SITE_URL}/en#about`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Founders",
        item: `${SITE_URL}/en#founders`,
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Location",
        item: `${SITE_URL}/en#location`,
      },
      {
        "@type": "ListItem",
        position: 6,
        name: "Contact",
        item: `${SITE_URL}/en#contact`,
      },
    ],
  };

  const productStructuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Bellam Organic Dry Fruits Pootharekulu",
    description:
      "Premium Atreyapuram pootharekulu with organic jaggery and rich dry fruits — pack of 12 from Swamy Putharekulu",
    image: [productHero, OG_IMAGE_URL],
    brand: {
      "@type": "Brand",
      name: BRAND_NAME,
    },
    category: "Sweets",
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/en#products`,
      priceCurrency: "INR",
      price: "500",
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: BRAND_NAME,
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "150",
      bestRating: "5",
      worstRating: "1",
    },
  };

  const shareImageStructuredData = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl: OG_IMAGE_URL,
    url: OG_IMAGE_URL,
    width: OG_IMAGE_WIDTH,
    height: OG_IMAGE_HEIGHT,
    caption: `${BRAND_NAME} — ${BRAND_TAGLINE}`,
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
          __html: JSON.stringify(websiteStructuredData),
        }}
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(shareImageStructuredData),
        }}
      />
    </>
  );
}
