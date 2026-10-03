import { useLocale } from 'next-intl';
import en from '../../messages/en.json';
import te from '../../messages/te.json';

type ProductEntry = {
  name: string;
  description: string;
};

type ProductCatalog = Record<string, ProductEntry | string>;

const catalogs: Record<string, ProductCatalog> = {
  en: en.products,
  te: te.products,
};

function getProductEntry(
  catalog: ProductCatalog,
  id: string
): ProductEntry | undefined {
  const entry = catalog[id];
  if (
    entry &&
    typeof entry === 'object' &&
    'name' in entry &&
    'description' in entry
  ) {
    return entry;
  }
  return undefined;
}

export function useProductLabels() {
  const locale = useLocale();
  const catalog = catalogs[locale] ?? catalogs.en;

  const getProductName = (id: string) =>
    getProductEntry(catalog, id)?.name ?? id;

  const getProductDescription = (id: string) =>
    getProductEntry(catalog, id)?.description ?? '';

  return { getProductName, getProductDescription };
}
