import type { NextConfig } from "next";
import path from "path";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  turbopack: {
    // Keep this app as the root so /public assets aren't resolved from a parent folder
    root: path.join(__dirname),
  },
};

export default withNextIntl(nextConfig);
