# Venkateswara Traditional Foods - Landing Page

A beautiful, modern landing page for Atreyapuram Pootharekulu and traditional Andhra Pradesh sweets. Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

**SV Traditional Foods | Worldwide Door Delivery**

## Business Information

- **Business Name**: Venkateswara Traditional Foods
- **Specialty**: Atreyapuram Pootharekulu & Traditional Andhra Sweets
- **Owner**: SV Traditional Foods
- **Phone/WhatsApp**: +91 85009 04835
- **Instagram**: [@venkateswara.traditional.foods](https://www.instagram.com/venkateswara.traditional.foods)
- **YouTube**: [@atreyapuramputharekulu4835](https://youtube.com/@atreyapuramputharekulu4835)
- **Location**: Atreyapuram, Andhra Pradesh
- **Service**: 📦 Worldwide Door Delivery

## Features

✨ **Beautiful Animations** - Smooth, professional animations using Framer Motion
🎨 **Burgundy & Gold Theme** - Elegant color scheme matching traditional aesthetics
📱 **Fully Mobile Responsive** - Perfect experience on all devices
🛍️ **WhatsApp Business Integration** - Direct ordering through WhatsApp
🍬 **Product Showcase** - Beautiful grid layout with category filtering
⚡ **Fast & Optimized** - Built with Next.js 16 and Turbopack

## Sections

1. **Hero Section** - Eye-catching landing with stats, CTAs, and international shipping badge
2. **Products Section** - Showcase of 16 traditional sweets with prices, pack sizes, and category filters
3. **About Section** - Story and heritage of traditional Andhra sweets with FSSAI certification
4. **Features Section** - Sankranti Delights, Corporate Gifting, Wedding Orders, and more occasions
5. **Special Offers** - Dedicated section for Gift Hampers and Corporate Gifting with detailed packages
6. **Contact Section** - WhatsApp Business integration and contact information
7. **Footer** - Quick links, popular sweets, social media, and company information

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd ar-traditional-sweets
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Customization

### WhatsApp Business Number

The website is configured with Venkateswara Traditional Foods' WhatsApp Business number.

**Current number**: `918500904835` (SV Traditional Foods)

To update, modify in these files:
- `app/components/Contact.tsx`
- `app/components/Footer.tsx`
- `app/components/SpecialOffers.tsx`

```typescript
const whatsappNumber = "918500904835"; // Format: country code + number
```

### Contact Information

All contact details are set to:
- **Phone**: +91 85009 04835
- **Email**: venkateswara.foods@gmail.com
- **Location**: Atreyapuram, Andhra Pradesh
- **Google Maps**: https://share.google/S7EGg1Pm9Sq9ffpg4

### Social Media Links

Configured in `app/components/Footer.tsx`:
- **Instagram**: https://www.instagram.com/venkateswara.traditional.foods
- **YouTube**: https://youtube.com/@atreyapuramputharekulu4835
- **WhatsApp**: https://wa.me/918500904835

### Products

Modify the products array in `app/components/Products.tsx` to add/remove sweets:

```typescript
const products = [
  {
    name: "Sweet Name",
    description: "Description",
    category: "Category",
    image: "🎂", // Emoji or replace with actual images
  },
  // Add more products...
];
```

### Colors

The color theme is defined in `app/globals.css`. You can customize:
- Burgundy/Maroon shades: `--burgundy-*` and `--maroon`
- Gold shades: `--gold-*` and `--gold`

### Content

- **Hero Section**: Edit `app/components/Hero.tsx`
- **About Section**: Edit `app/components/About.tsx`
- **Features Section**: Edit `app/components/Features.tsx`

## Build for Production

```bash
npm run build
npm start
```

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: React Icons

## Project Structure

```
ar-traditional-sweets/
├── app/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Products.tsx
│   │   ├── About.tsx
│   │   ├── Features.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
├── package.json
└── README.md
```

## Features Breakdown

### Animations
- Smooth scroll behavior
- Fade-in animations on scroll
- Hover effects on cards and buttons
- Floating background elements
- Staggered children animations

### Mobile Responsive
- Hamburger menu for mobile
- Responsive grid layouts
- Touch-friendly buttons
- Optimized spacing for all screen sizes

### WhatsApp Integration
- Direct catalog link
- Pre-filled message
- Easy ordering process
- Multiple contact points

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is created for SV Traditional Sweets.

## Support

For orders and inquiries:
- **WhatsApp**: [+91 85009 04835](https://wa.me/918500904835)
- **Email**: venkateswara.foods@gmail.com
- **Instagram**: [@venkateswara.traditional.foods](https://www.instagram.com/venkateswara.traditional.foods)
- **YouTube**: [@atreyapuramputharekulu4835](https://youtube.com/@atreyapuramputharekulu4835)

---

Made with ❤️ in Atreyapuram, Andhra Pradesh
**SV Traditional Foods | Venkateswara Traditional Foods**
