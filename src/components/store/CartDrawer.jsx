import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { PRODUCT, buildShopifyCheckoutUrl, SHOPIFY_VARIANT_ID } from "@/lib/shopify";

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQty, onRemove }) {
  const total = cartItems.reduce((sum, item) => sum + PRODUCT.price * item.qty, 0);
  const totalQty = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const handleCheckout = () => {
    const url = buildShopifyCheckoutUrl(SHOPIFY_VARIANT_ID, totalQty);
    window.open(url, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/70 z-40" />
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "tween", duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border z-50 flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <span className="font-mono text-sm tracking-ultrawide text-foreground">YOUR CART</span>
                {totalQty > 0 && <span className="bg-primary text-primary-foreground text-xs font-mono w-5 h-5 flex items-center justify-center rounded-full">{totalQty}</span>}
              </div>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4">
                  <ShoppingBag className="w-12 h-12 text-muted-foreground/30" />
                  <p className="font-mono text-sm text-muted-foreground tracking-wide">YOUR CART IS EMPTY</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item, i) => (
                    <div key={i} className="flex gap-4 border border-border p-4">
                      <img src={PRODUCT.images[0]} alt={PRODUCT.name} className="w-20 h-20 object-cover" />
                      <div className="flex-1">
                        <p className="font-display font-bold text-sm text-foreground">{PRODUCT.name}</p>
                        <p className="font-mono text-xs text-muted-foreground mt-1">SIZE US {item.size}</p>
                        <p className="font-mono text-sm text-primary mt-2">${(PRODUCT.price * item.qty).toFixed(2)}</p>
                        <div className="flex items-center gap-3 mt-3">
                          <button onClick={() => onUpdateQty(i, item.qty - 1)} className="w-7 h-7 border border-border flex items-center justify-center hover:border-primary transition-colors"><Minus className="w-3 h-3" /></button>
                          <span className="font-mono text-sm w-4 text-center">{item.qty}</span>
                          <button onClick={() => onUpdateQty(i, item.qty + 1)} className="w-7 h-7 border border-border flex items-center justify-center hover:border-primary transition-colors"><Plus className="w-3 h-3" /></button>
                          <button onClick={() => onRemove(i)} className="ml-auto font-mono text-xs text-muted-foreground hover:text-destructive transition-colors">REMOVE</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-border space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-muted-foreground tracking-ultrawide">SUBTOTAL</span>
                  <span className="font-display font-bold text-xl text-foreground">${total.toFixed(2)}</span>
                </div>
                <p className="font-mono text-xs text-muted-foreground">Shipping & taxes calculated at checkout</p>
                <button onClick={handleCheckout} className="w-full font-mono text-sm tracking-ultrawide bg-primary text-primary-foreground py-4 hover:bg-primary/90 transition-all duration-300 ember-glow">
                  CHECKOUT ON SHOPIFY →
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}