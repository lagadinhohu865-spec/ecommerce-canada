export const SHOPIFY_STORE = "your-store.myshopify.com";
export const SHOPIFY_VARIANT_ID = "YOUR_VARIANT_ID";

export const PRODUCT = {
  name: "ARMOR SNEAKER",
  subtitle: "Steel Toe Safety Shoe",
  price: 89.99,
  originalPrice: 149.99,
  images: [
    "https://ae-pic-a1.aliexpress-media.com/kf/S98486d4f85eb41dfb353b1534ecec608n.jpg_960x960q75.jpg_.avif",
    "https://ae-pic-a1.aliexpress-media.com/kf/S5a22d938e4044b9996f6da38bf9ed31br.jpg_960x960q75.jpg_.avif",
    "https://ae-pic-a1.aliexpress-media.com/kf/S5c60285eac924c42b9c02a03913fddc0D.jpg_960x960q75.jpg_.avif",
    "https://ae-pic-a1.aliexpress-media.com/kf/S5f047e71400046eca29c819a7a8e0510Z.jpg_960x960q75.jpg_.avif",
  ],
  sizes: ["6", "7", "8", "9", "10", "11", "12", "13"],
  features: ["Steel Toe Cap", "Anti-Puncture Sole", "Slip-Resistant", "Shock Absorption"],
};

export function buildShopifyCheckoutUrl(variantId, quantity = 1) {
  return `https://${SHOPIFY_STORE}/cart/${variantId}:${quantity}`;
}