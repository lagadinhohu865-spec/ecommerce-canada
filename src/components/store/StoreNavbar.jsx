import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X } from "lucide-react";

export default function StoreNavbar({ cartCount, onCartOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const navLinks = [
    { label: "PRODUCT", href: "#product" },
    { label: "SPECS", href: "#specs" },
    { label: "REVIEWS", href: "#reviews" },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-sm border-b border-border" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary ember-pulse" />
              <span className="font-display font-bold text-lg tracking-wider text-foreground">KINETIC ARMOR</span>
            </div>
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button key={link.label} onClick={() => scrollTo(link.href)}
                  className="font-mono text-xs tracking-ultrawide text-muted-foreground hover:text-primary transition-colors duration-200">
                  {link.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <button onClick={onCartOpen} className="relative flex items-center gap-2 font-mono text-xs tracking-ultrawide text-foreground hover:text-primary transition-colors">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-mono w-4 h-4 flex items-center justify-center rounded-full">{cartCount}</span>
                )}
                <span className="hidden sm:inline">CART</span>
              </button>
              <button className="lg:hidden text-foreground" onClick={() => setMobileOpen(true)}>
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background z-40 flex flex-col p-8">
            <div className="flex justify-end">
              <button onClick={() => setMobileOpen(false)}><X className="w-6 h-6 text-foreground" /></button>
            </div>
            <div className="flex flex-col gap-8 mt-16">
              {navLinks.map((link) => (
                <button key={link.label} onClick={() => scrollTo(link.href)}
                  className="font-display font-bold text-3xl text-left text-foreground hover:text-primary transition-colors">
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}