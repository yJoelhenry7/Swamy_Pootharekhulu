import { BRAND_NAME, BRAND_TAGLINE, PHONE_DISPLAY, SITE_URL } from "./brand";

export type InvoiceUnit = "pack" | "kg" | "piece";

export type InvoicePaymentMethod = "cash" | "upi" | "bank" | "pending";

export type InvoiceOrderType =
  | "counter"
  | "whatsapp"
  | "stall"
  | "bulk"
  | "gift";

export type InvoiceLineItem = {
  id: string;
  name: string;
  unit: InvoiceUnit;
  quantity: number;
  rate: number;
};

export type InvoiceData = {
  invoiceNumber: string;
  invoiceDate: string;
  orderType: InvoiceOrderType;
  paymentMethod: InvoicePaymentMethod;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  customerCity: string;
  customerPincode: string;
  items: InvoiceLineItem[];
  packagingCharge: number;
  deliveryCharge: number;
  discount: number;
  notes: string;
};

export type InvoiceTotals = {
  subtotal: number;
  packagingCharge: number;
  deliveryCharge: number;
  discount: number;
  taxable: number;
  grandTotal: number;
};

export const SELLER = {
  name: BRAND_NAME,
  tagline: BRAND_TAGLINE,
  phone: PHONE_DISPLAY,
  website: SITE_URL.replace(/^https?:\/\//, ""),
  address: "Atreyapuram, Andhra Pradesh, India",
  hours: "Mon–Sat, 9:00 AM – 8:00 PM",
} as const;

export const PRODUCT_PRESETS: { name: string; unit: InvoiceUnit; rate: number }[] =
  [
    { name: "Karampodi Pootharekulu", unit: "pack", rate: 300 },
    { name: "Chocolate Pootharekulu", unit: "pack", rate: 450 },
    { name: "Jaggery Dry Fruits Pootharekulu", unit: "pack", rate: 300 },
    { name: "Sugar Dry Fruits Pootharekulu", unit: "pack", rate: 250 },
    { name: "Kova Pootharekulu", unit: "pack", rate: 450 },
    { name: "Samosa Pootharekulu", unit: "pack", rate: 450 },
    { name: "Horlicks & Boost Pootharekulu", unit: "pack", rate: 450 },
    { name: "Sugar Free Pootharekulu", unit: "pack", rate: 500 },
    { name: "Bellam Kommulu", unit: "kg", rate: 450 },
    { name: "Chegodilu", unit: "kg", rate: 450 },
    { name: "Bellam Boondi", unit: "kg", rate: 450 },
    { name: "Masala Mixture", unit: "kg", rate: 350 },
    { name: "Thokkudu Laddu", unit: "kg", rate: 450 },
  ];

export function createLineId() {
  return `item-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function createEmptyItem(): InvoiceLineItem {
  return {
    id: createLineId(),
    name: "",
    unit: "pack",
    quantity: 1,
    rate: 0,
  };
}

export function createDefaultInvoice(): InvoiceData {
  const today = new Date();
  const y = today.getFullYear();
  const m = String(today.getMonth() + 1).padStart(2, "0");
  const d = String(today.getDate()).padStart(2, "0");
  const seq = String(today.getHours() * 60 + today.getMinutes()).padStart(4, "0");

  return {
    invoiceNumber: `SP-${y}${m}${d}-${seq}`,
    invoiceDate: `${y}-${m}-${d}`,
    orderType: "whatsapp",
    paymentMethod: "upi",
    customerName: "",
    customerPhone: "",
    customerAddress: "",
    customerCity: "",
    customerPincode: "",
    items: [
      {
        id: createLineId(),
        name: "Karampodi Pootharekulu",
        unit: "pack",
        quantity: 1,
        rate: 300,
      },
    ],
    packagingCharge: 0,
    deliveryCharge: 0,
    discount: 0,
    notes: "",
  };
}

export function lineTotal(item: InvoiceLineItem): number {
  const qty = Number.isFinite(item.quantity) ? item.quantity : 0;
  const rate = Number.isFinite(item.rate) ? item.rate : 0;
  return Math.max(0, qty) * Math.max(0, rate);
}

export function calculateTotals(data: InvoiceData): InvoiceTotals {
  const subtotal = data.items.reduce((sum, item) => sum + lineTotal(item), 0);
  const packagingCharge = Math.max(0, data.packagingCharge || 0);
  const deliveryCharge = Math.max(0, data.deliveryCharge || 0);
  const discount = Math.max(0, data.discount || 0);
  const taxable = Math.max(0, subtotal + packagingCharge + deliveryCharge - discount);

  return {
    subtotal,
    packagingCharge,
    deliveryCharge,
    discount,
    taxable,
    grandTotal: taxable,
  };
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

export function formatDisplayDate(isoDate: string): string {
  if (!isoDate) return "—";
  const date = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return isoDate;
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}
