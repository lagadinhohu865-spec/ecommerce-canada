import React, { useState } from "react";
import StoreNavbar from "@/components/store/StoreNavbar";
import ProductSection from "@/components/store/ProductSection";
import CartDrawer from "@/components/store/CartDrawer";
import AnatomySection from "@/components/landing/AnatomySection";
import SpecsSection from "@/components/landing/SpecsSection";
import FieldTestSection from "@/components/landing/FieldTestSection";
import Footer from "@/components/landing/Footer";

export default function Home() {
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const totalQty = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const handleAddToCart = ({ size, qty }) => {
    setCartItems((prev) => {
      const existing = prev.findIndex((i) => i.size === size);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = { ...updated[existing], qty: updated[existing].qty + qty };
        return updated;
      }
      return [...prev, { size, qty }];
    });
    setCartOpen(true);
  };

  const handleUpdateQty = (index, newQty) => {
    if (newQty <= 0) { handleRemove(index); return; }
    setCartItems((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], qty: newQty };
      return updated;
    });
  };

  const handleRemove = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-background">
      <StoreNavbar cartCount={totalQty} onCartOpen={() => setCartOpen(true)} />
      <ProductSection onAddToCart={handleAddToCart} />
      <section id="specs">
        <AnatomySection />
        <SpecsSection />
      </section>
      <section id="reviews">
        <FieldTestSection />
      </section>
      <Footer />
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemove={handleRemove}
      />
    </div>
  );
}