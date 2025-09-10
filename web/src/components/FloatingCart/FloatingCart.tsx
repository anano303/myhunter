"use client";

import { useState } from "react";
import { ShoppingCart, X, Plus, Minus } from "lucide-react";
import { useCart } from "@/modules/cart/context/cart-context";
import { useLanguage } from "@/hooks/LanguageContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CartItem } from "@/types/cart";
import "./FloatingCart.css";

export function FloatingCart() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, removeItem, updateQuantity, totalItems } = useCart();
  const { t, language } = useLanguage();
  const router = useRouter();

  // Calculate total price from items
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handleGoToCart = () => {
    router.push("/cart");
    setIsOpen(false);
  };

  const handleGoToCheckout = () => {
    router.push("/checkout/shipping");
    setIsOpen(false);
  };

  const getLocalizedName = (item: CartItem) => {
    return language === "en" && item.nameEn ? item.nameEn : item.name;
  };

  if (totalItems === 0) {
    return null; // დავმალოთ თუ კალათი ცარიელია
  }

  return (
    <>
      {/* Floating Cart Button */}
      <div
        className={`floating-cart-button ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <ShoppingCart size={20} />
        {totalItems > 0 && <div className="cart-badge">{totalItems}</div>}
      </div>

      {/* Cart Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="floating-cart-backdrop"
            onClick={() => setIsOpen(false)}
          />

          {/* Cart Content */}
          <div className="floating-cart-content">
            <div className="cart-header">
              <h3>{t("cart.yourCart")}</h3>
              <button className="cart-close" onClick={() => setIsOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="cart-items-list">
              {items.map((item, index) => (
                <div
                  key={`${item.productId}-${item.size || ""}-${
                    item.color || ""
                  }-${item.ageGroup || ""}-${index}`}
                  className="cart-item-mini"
                >
                  <div className="item-image">
                    <Image
                      src={item.image}
                      alt={getLocalizedName(item)}
                      width={50}
                      height={50}
                      className="item-img"
                    />
                  </div>

                  <div className="item-details">
                    <div className="item-name">{getLocalizedName(item)}</div>
                    <div className="item-price">{item.price.toFixed(2)} ₾</div>

                    {/* Quantity Controls */}
                    <div className="quantity-controls">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.qty - 1,
                            item.size,
                            item.color,
                            item.ageGroup
                          )
                        }
                        disabled={item.qty <= 1}
                        className="qty-btn"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="quantity">{item.qty}</span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.qty + 1,
                            item.size,
                            item.color,
                            item.ageGroup
                          )
                        }
                        className="qty-btn"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>

                  <button
                    className="remove-item"
                    onClick={() =>
                      removeItem(
                        item.productId,
                        item.size,
                        item.color,
                        item.ageGroup
                      )
                    }
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="total-price">
                <strong>
                  {t("cart.total")}: {totalPrice.toFixed(2)} ₾
                </strong>
              </div>

              <div className="cart-actions">
                <button className="cart-btn view-cart" onClick={handleGoToCart}>
                  {t("cart.viewCart")}
                </button>
                <button
                  className="cart-btn checkout"
                  onClick={handleGoToCheckout}
                >
                  {t("cart.checkout")}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
