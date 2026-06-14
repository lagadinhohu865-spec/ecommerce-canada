# Ecommerce Canada — Kinetic Armor Store

A high-conversion single-product store for the **ARMOR SNEAKER** — a steel toe safety shoe.

## Stack
- React + Vite
- Tailwind CSS (Industrial Futurism dark theme)
- Framer Motion
- Shopify Checkout Integration

## Setup

### 1. Configure Shopify
Edit `src/lib/shopify.js`:
```js
export const SHOPIFY_STORE = "your-store.myshopify.com"; // your Shopify domain
export const SHOPIFY_VARIANT_ID = "YOUR_VARIANT_ID";    // product variant ID
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run dev server
```bash
npm run dev
```

## Structure
```
src/
  lib/shopify.js               # Shopify config & checkout URL builder
  pages/Home.jsx               # Main store page
  components/
    store/
      StoreNavbar.jsx          # Sticky nav with cart badge
      ProductSection.jsx       # Product gallery, size picker, add to cart
      CartDrawer.jsx           # Slide-out cart with Shopify checkout
    landing/
      AnatomySection.jsx       # Product feature breakdown
      SpecsSection.jsx         # Technical specifications grid
      FieldTestSection.jsx     # Customer reviews carousel
      Footer.jsx               # Newsletter + footer
```

## Design System
- **Background:** `#0F1113` (carbon dark)
- **Accent:** `#FF4D00` (burnt orange)
- **Heading font:** Space Grotesk
- **Body font:** Inter
- **Mono font:** JetBrains Mono
