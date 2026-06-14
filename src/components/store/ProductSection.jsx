import React, { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Star, Check } from "lucide-react";
import { PRODUCT } from "@/lib/shopify";

export default function ProductSection({ onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (!selectedSize) return;
    onAddToCart({ size: selectedSize, qty });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const discount = Math.round((1 - PRODUCT.price / PRODUCT.originalPrice) * 100);

  return (
    <section id="product" className="min-h-screen pt-20 pb-16 blueprint-grid">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start pt-8">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="sticky top-24">
            <div className="relative glitch-hover overflow-hidden aspect-square bg-card border border-border">
              <img src={PRODUCT.images[selectedImage]} alt={PRODUCT.name} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 bg-primary text-primary-foreground font-mono text-xs px-2 py-1 tracking-wide">-{discount}%</div>
            </div>
            <div className="grid grid-cols-4 gap-2 mt-2">
              {PRODUCT.images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImage(i)}
                  className={`aspect-square overflow-hidden border-2 transition-all ${selectedImage === i ? "border-primary" : "border-border hover:border-muted-foreground"}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-primary fill-primary" />)}
              <span className="font-mono text-xs text-muted-foreground ml-1">(127 reviews)</span>
            </div>
            <div>
              <p className="font-mono text-xs tracking-megawide text-primary mb-2">// KINETIC PROTECTION</p>
              <h1 className="font-display font-bold text-4xl lg:text-5xl text-foreground leading-none">{PRODUCT.name}</h1>
              <p className="font-mono text-xs text-muted-foreground tracking-ultrawide mt-2">{PRODUCT.subtitle}</p>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="font-display font-bold text-4xl text-foreground">${PRODUCT.price.toFixed(2)}</span>
              <span className="font-mono text-base text-muted-foreground line-through">${PRODUCT.originalPrice.toFixed(2)}</span>
              <span className="font-mono text-xs bg-primary text-primary-foreground px-2 py-1">SAVE ${(PRODUCT.originalPrice - PRODUCT.price).toFixed(2)}</span>
            </div>
            <p className="font-mono text-xs text-muted-foreground -mt-4">or 4 interest-free payments of ${(PRODUCT.price / 4).toFixed(2)}</p>
            <div className="grid grid-cols-2 gap-2">
              {PRODUCT.features.map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <Check className="w-3 h-3 text-primary flex-shrink-0" />
                  <span className="font-mono text-xs text-muted-foreground">{f}</span>
                </div>
              ))}
            </div>
            <div className="w-full h-px bg-border" />
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="font-mono text-xs tracking-ultrawide text-foreground">SIZE (US)</p>
                {!selectedSize && <p className="font-mono text-xs text-primary">SELECT SIZE</p>}
              </div>
              <div className="grid grid-cols-4 gap-2">
                {PRODUCT.sizes.map((size) => (
                  <button key={size} onClick={() => setSelectedSize(size)}
                    className={`py-3 font-mono text-sm border transition-all duration-200 ${selectedSize === size ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-muted-foreground"}`}>
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <p className="font-mono text-xs tracking-ultrawide text-foreground">QTY</p>
              <div className="flex items-center border border-border">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-2 hover:text-primary transition-colors font-mono">−</button>
                <span className="px-4 py-2 font-mono text-sm border-x border-border">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-4 py-2 hover:text-primary transition-colors font-mono">+</button>
              </div>
            </div>
            <button onClick={handleAdd} disabled={!selectedSize}
              className={`w-full font-mono text-sm tracking-ultrawide py-4 transition-all duration-300 ${selectedSize ? added ? "bg-green-600 text-white" : "bg-primary text-primary-foreground hover:bg-primary/90 ember-glow" : "bg-muted text-muted-foreground cursor-not-allowed"}`}>
              {added ? "✓ ADDED TO CART" : selectedSize ? "ADD TO CART" : "SELECT A SIZE FIRST"}
            </button>
            <div className="flex gap-2 text-center">
              {[{ label: "WARRANTY", value: "12 MONTHS" }, { label: "SHIPPING", value: "FREE" }, { label: "RETURNS", value: "30 DAYS" }].map(({ label, value }) => (
                <div key={label} className="flex-1 border border-border p-3">
                  <p className="font-mono text-[10px] text-muted-foreground tracking-ultrawide">{label}</p>
                  <p className="font-display font-bold text-xs text-foreground mt-1">{value}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 p-3 border border-border/50 bg-muted/20">
              <Shield className="w-4 h-4 text-primary flex-shrink-0" />
              <p className="font-mono text-xs text-muted-foreground">Secure checkout powered by Shopify</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}