import { useCart } from "../context/cart-context";
import Link from "next/link";
import "./cart-icon.css";
import { ShoppingCart } from "lucide-react";
import { useLanguage } from "@/hooks/LanguageContext";

// Add CSS for font
const cartIconStyles = {
  fontFamily: '"FiraGo", sans-serif',
};

export function CartIcon() {
  const { items } = useCart();
  const { t } = useLanguage();
  const itemCount = items.reduce((acc, item) => acc + item.qty, 0);

  return (
    <div className="cart-icon-wrapper" style={cartIconStyles}>
      <Link href="/cart" className="cart-icon-container">
        <ShoppingCart
          size={20}
          className="shopping-cart-icon"
          style={{ marginRight: "5px" }}
        />
        <span className="cart-text">{t("cart.title")}</span>
        {itemCount > 0 && <span className="cartIconsSpan">{itemCount}</span>}
      </Link>
    </div>
  );
}
