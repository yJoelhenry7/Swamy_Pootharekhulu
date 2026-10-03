# -*- coding: utf-8 -*-
from pathlib import Path

content = r'''import { CartItem } from '../context/CartContext';

interface DeliveryLocation {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  landmark?: string;
}

const WHATSAPP_NUMBER = '918500904835';

export function formatWhatsAppMessage(
  items: CartItem[],
  delivery: DeliveryLocation,
  locale: string
): string {
  const isEnglish = locale === 'en';

  const packageIcon = "🎁";
  const locationIcon = "🏠";

  let message = isEnglish
    ? "*Hello! I'd like to order from SV Traditional Foods:*\n\n"
    : "*PLACEHOLDER_TE_HEADER*\n\n";

  message += isEnglish
    ? `${packageIcon} *ORDER DETAILS:*\n`
    : `${packageIcon} *PLACEHOLDER_TE_ORDER:*\n`;

  items.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    message += `${index + 1}. ${item.name} x ${item.quantity} - ₹${itemTotal}\n`;
  });

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  message += isEnglish
    ? `\n*Total Items:* ${totalItems}\n`
    : `\n*PLACEHOLDER_TE_TOTAL_ITEMS:* ${totalItems}\n`;

  message += isEnglish
    ? `*Total Amount:* ₹${totalPrice}\n\n`
    : `*PLACEHOLDER_TE_TOTAL_AMOUNT:* ₹${totalPrice}\n\n`;

  message += isEnglish
    ? `${locationIcon} *DELIVERY ADDRESS:*\n`
    : `${locationIcon} *PLACEHOLDER_TE_ADDRESS:*\n`;

  message += isEnglish
    ? `*Name:* ${delivery.fullName}\n`
    : `*PLACEHOLDER_TE_NAME:* ${delivery.fullName}\n`;

  message += isEnglish
    ? `*Phone:* ${delivery.phone}\n`
    : `*PLACEHOLDER_TE_PHONE:* ${delivery.phone}\n`;

  message += isEnglish
    ? `*Address:* ${delivery.address}\n`
    : `*PLACEHOLDER_TE_ADDR:* ${delivery.address}\n`;

  message += isEnglish
    ? `*City:* ${delivery.city}\n`
    : `*PLACEHOLDER_TE_CITY:* ${delivery.city}\n`;

  message += isEnglish
    ? `*Pincode:* ${delivery.pincode}\n`
    : `*PLACEHOLDER_TE_PIN:* ${delivery.pincode}\n`;

  if (delivery.landmark) {
    message += isEnglish
      ? `*Landmark:* ${delivery.landmark}\n`
      : `*PLACEHOLDER_TE_LANDMARK:* ${delivery.landmark}\n`;
  }

  message += isEnglish
    ? "\n_Please confirm availability and delivery charges. Thank you!_"
    : "\n_PLACEHOLDER_TE_FOOTER_";

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}
'''

replacements = {
    "PLACEHOLDER_TE_HEADER": "\u0c28\u0c2e\u0c38\u0c4d\u0c15\u0c3e\u0c30\u0c02! \u0c28\u0c47\u0c28\u0c41 SV \u0c38\u0c3e\u0c02\u0c2a\u0c4d\u0c30\u0c26\u0c3e\u0c2f \u0c06\u0c39\u0c3e\u0c30\u0c3e\u0c32 \u0c28\u0c41\u0c02\u0c21\u0c3f \u0c06\u0c30\u0c4d\u0c21\u0c30\u0c4d \u0c1a\u0c47\u0c2f\u0c3e\u0c32\u0c28\u0c41\u0c15\u0c41\u0c02\u0c1f\u0c41\u0c28\u0c4d\u0c28\u0c3e\u0c28\u0c41:",
    "PLACEHOLDER_TE_ORDER": "\u0c06\u0c30\u0c4d\u0c21\u0c30\u0c4d \u0c35\u0c3f\u0c35\u0c30\u0c3e\u0c32\u0c41",
    "PLACEHOLDER_TE_TOTAL_ITEMS": "\u0c2e\u0c4a\u0c24\u0c4d\u0c24\u0c02 \u0c35\u0c38\u0c4d\u0c24\u0c41\u0c35\u0c41\u0c32\u0c41",
    "PLACEHOLDER_TE_TOTAL_AMOUNT": "\u0c2e\u0c4a\u0c24\u0c4d\u0c24\u0c02 \u0c2e\u0c4a\u0c24\u0c4d\u0c24\u0c02",
    "PLACEHOLDER_TE_ADDRESS": "\u0c21\u0c46\u0c32\u0c3f\u0c35\u0c30\u0c40 \u0c1a\u0c3f\u0c30\u0c41\u0c28\u0c3e\u0c2e\u0c3e",
    "PLACEHOLDER_TE_NAME": "\u0c2a\u0c47\u0c30\u0c41",
    "PLACEHOLDER_TE_PHONE": "\u0c2b\u0c4b\u0c28\u0c4d",
    "PLACEHOLDER_TE_ADDR": "\u0c1a\u0c3f\u0c30\u0c41\u0c28\u0c3e\u0c2e\u0c3e",
    "PLACEHOLDER_TE_CITY": "\u0c28\u0c17\u0c30\u0c02",
    "PLACEHOLDER_TE_PIN": "\u0c2a\u0c3f\u0c28\u0c4d\u200c\u0c15\u0c4b\u0c21\u0c4d",
    "PLACEHOLDER_TE_LANDMARK": "\u0c32\u0c4d\u0c2f\u0c3e\u0c02\u0c21\u0c4d\u200c\u0c2e\u0c3e\u0c30\u0c4d\u0c15\u0c4d",
    "PLACEHOLDER_TE_FOOTER": "\u0c26\u0c2f\u0c1a\u0c47\u0c38\u0c3f \u0c32\u0c2d\u0c4d\u0c2f\u0c24 \u0c2e\u0c30\u0c3f\u0c2f\u0c41 \u0c21\u0c46\u0c32\u0c3f\u0c35\u0c30\u0c40 \u0c1b\u0c3e\u0c30\u0c4d\u0c1c\u0c40\u0c32\u0c28\u0c41 \u0c28\u0c3f\u0c30\u0c4d\u0c27\u0c3e\u0c30\u0c3f\u0c02\u0c1a\u0c02\u0c21\u0c3f. \u0c27\u0c28\u0c4d\u0c2f\u0c35\u0c3e\u0c26\u0c3e\u0c32\u0c41!",
}

for key, value in replacements.items():
    content = content.replace(key, value)

out = Path(__file__).resolve().parents[1] / "app" / "utils" / "formatWhatsAppMessage.ts"
out.write_text(content, encoding="utf-8")
print("ok", out.exists(), "fffd" , "\ufffd" in content)
