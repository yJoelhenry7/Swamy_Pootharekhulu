import { CartItem } from '../context/CartContext';
import { BRAND_NAME, WHATSAPP_NUMBER } from './brand';
import teMessages from '../../messages/te.json';

interface DeliveryLocation {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  landmark?: string;
}

const TE_CONTACT_WHATSAPP = teMessages.contact.whatsappMessage;
const TE_OFFERS = teMessages.offers;

export function getTeluguContactWhatsAppUrl(): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(TE_CONTACT_WHATSAPP)}`;
}

export function getTeluguHamperWhatsAppUrl(
  quantities: Record<string, number>,
  itemIds: readonly string[],
): string {
  const selected = itemIds.filter((id) => (quantities[id] ?? 0) > 0);
  const offers = TE_OFFERS as Record<string, string>;

  let message = `*${TE_OFFERS.whatsappHeader}*\n\n`;
  message += `🎁 *${TE_OFFERS.whatsappSelection}*\n`;

  if (selected.length === 0) {
    message += `_${TE_OFFERS.whatsappEmpty}_\n`;
  } else {
    selected.forEach((id, index) => {
      const label = offers[id] ?? id;
      message += `${index + 1}. ${label} x ${quantities[id]}\n`;
    });
  }

  message += `\n_${TE_OFFERS.whatsappFooter}_`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Prefill text is always Telugu so orders arrive in the shop language. */
export function formatWhatsAppMessage(
  items: CartItem[],
  delivery: DeliveryLocation,
  _locale?: string,
): string {
  let message =
    `*నమస్కారం! నేను ${BRAND_NAME} నుండి ఆర్డర్ చేయాలనుకుంటున్నాను:*\n\n`;
  message += `🎁 *ఆర్డర్ వివరాలు:*\n`;

  items.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    const teEntry = teMessages.products[item.id as keyof typeof teMessages.products];
    const teName =
      teEntry && typeof teEntry === "object" && "name" in teEntry
        ? teEntry.name
        : item.name;
    message += `${index + 1}. ${teName} x ${item.quantity} - ₹${itemTotal}\n`;
  });

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  message += `\n*మొత్తం వస్తువులు:* ${totalItems}\n`;
  message += `*మొత్తం ధర:* ₹${totalPrice}\n\n`;
  message += `🏠 *డెలివరీ చిరునామా:*\n`;
  message += `*పేరు:* ${delivery.fullName}\n`;
  message += `*ఫోన్:* ${delivery.phone}\n`;
  message += `*చిరునామా:* ${delivery.address}\n`;
  message += `*నగరం:* ${delivery.city}\n`;
  message += `*పిన్‌కోడ్:* ${delivery.pincode}\n`;

  if (delivery.landmark) {
    message += `*ల్యాండ్‌మార్క్:* ${delivery.landmark}\n`;
  }

  message += `\n_దయచేసి లభ్యత మరియు డెలివరీ ఛార్జీలను నిర్ధారించండి. ధన్యవాదాలు!_`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
