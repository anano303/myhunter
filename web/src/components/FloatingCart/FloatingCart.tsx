"use client";

import { useState, useRef, useEffect } from "react";
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

  // Drag functionality states
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(() => {
    // Load saved position from localStorage or use default
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("floating-cart-position");
      if (saved) {
        return JSON.parse(saved);
      }
    }
    return { bottom: 120, left: 20 };
  });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLDivElement>(null);

  // Save position to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("floating-cart-position", JSON.stringify(position));
  }, [position]);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only left click
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - (window.innerWidth - position.left - 60),
      y: e.clientY - (window.innerHeight - position.bottom - 60),
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;

    // Convert to bottom/left positioning and constrain to viewport
    const left = Math.max(
      0,
      Math.min(window.innerWidth - 60, window.innerWidth - newX - 60)
    );
    const bottom = Math.max(
      0,
      Math.min(window.innerHeight - 60, window.innerHeight - newY - 60)
    );

    setPosition({ bottom, left });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch drag handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const touch = e.touches[0];
    setDragStart({
      x: touch.clientX - (window.innerWidth - position.left - 60),
      y: touch.clientY - (window.innerHeight - position.bottom - 60),
    });
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();

    const touch = e.touches[0];
    const newX = touch.clientX - dragStart.x;
    const newY = touch.clientY - dragStart.y;

    // Convert to bottom/left positioning and constrain to viewport
    const left = Math.max(
      0,
      Math.min(window.innerWidth - 60, window.innerWidth - newX - 60)
    );
    const bottom = Math.max(
      0,
      Math.min(window.innerHeight - 60, window.innerHeight - newY - 60)
    );

    setPosition({ bottom, left });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Add global event listeners for drag
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleTouchEnd);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [isDragging, dragStart]);

  // Click handler - only open if not dragging
  const handleClick = () => {
    if (!isDragging) {
      setIsOpen(!isOpen);
    }
  };

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
        ref={buttonRef}
        className={`floating-cart-button ${isOpen ? "open" : ""} ${
          isDragging ? "dragging" : ""
        }`}
        style={{
          bottom: `${position.bottom}px`,
          left: `${position.left}px`,
        }}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        title={t("cart.dragToMove") || "გადაიტანეთ სხვა ადგილზე"}
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
