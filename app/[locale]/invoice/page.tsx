import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import FolkSectionBackground from "../../components/FolkSectionBackground";
import InvoiceWorkspace from "../../components/invoice/InvoiceWorkspace";
import { BRAND_NAME, OG_IMAGE_URL, SITE_URL } from "../../utils/brand";
import { buildOgImage } from "../../utils/seo";
import enMessages from "../../../messages/en.json";
import teMessages from "../../../messages/te.json";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const seo =
    locale === "te" ? teMessages.invoice.seo : enMessages.invoice.seo;
  const siteSeo = locale === "te" ? teMessages.seo : enMessages.seo;

  return {
    title: seo.title,
    description: seo.description,
    robots: { index: false, follow: false },
    alternates: {
      canonical: `/${locale}/invoice`,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `${SITE_URL}/${locale}/invoice`,
      siteName: BRAND_NAME,
      images: [buildOgImage(siteSeo.ogImageAlt)],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [OG_IMAGE_URL],
    },
  };
}

export default async function InvoicePage() {
  return (
    <>
      <div className="print:hidden">
        <Navbar />
      </div>
      <main className="relative min-h-screen overflow-hidden pb-16 pt-28 print:bg-white print:pt-0 print:pb-0">
        <div className="print:hidden">
          <FolkSectionBackground variant="cream" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <InvoiceWorkspace />
        </div>
      </main>
      <div className="print:hidden">
        <Footer />
      </div>
    </>
  );
}
