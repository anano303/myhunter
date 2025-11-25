"use client";

import { useCheckout } from "../context/checkout-context";

import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/lib/api-client";
import { TAX_RATE } from "@/config/constants";
import { useLanguage } from "@/hooks/LanguageContext";
import { useUser } from "@/modules/auth/hooks/use-user";
import { useEffect, useState } from "react";
import { getAccessToken } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import "./order-review.css";
import { useCart } from "@/modules/cart/context/cart-context";

// Helper function to check if image is from Cloudinary
const isCloudinaryImage = (src: string) =>
  src.includes("cloudinary") || src.includes("res.cloudinary.com");

export function OrderReview() {
  const { shippingAddress: shippingDetails, paymentMethod } = useCheckout();
  const { items, clearCart } = useCart();
  const router = useRouter();
  const { toast } = useToast();
  const { language, t } = useLanguage();
  const { user, isLoading } = useUser();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [hasAccessToken, setHasAccessToken] = useState<boolean | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    setHasAccessToken(Boolean(getAccessToken()));
  }, [isMounted]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isMounted) return;
    if (hasAccessToken === null) return;
    if (!hasAccessToken) {
      router.push("/login?redirect=/checkout/review");
    }
  }, [hasAccessToken, isMounted, router]);

  const itemsPrice = items.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const shippingPrice: number = itemsPrice > 100 ? 0 : 0;
  const taxPrice = Number((itemsPrice * TAX_RATE).toFixed(2));
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const handlePlaceOrder = async () => {
    if (isLoading || hasAccessToken === null) {
      return;
    }

    if (!user || hasAccessToken === false) {
      router.push("/login?redirect=/checkout/review");
      return;
    }

    if (isPlacingOrder) return; // Prevent double submission

    setIsPlacingOrder(true);

    try {
      const orderItems = items.map((item) => ({
        name: item.name,
        nameEn: item.nameEn,
        qty: item.qty,
        image: item.image,
        price: item.price,
        productId: item.productId,
        size: item.size,
        color: item.color,
        ageGroup: item.ageGroup,
      }));

      const response = await apiClient.post("/orders", {
        orderItems,
        shippingDetails,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      await clearCart();
      router.push(`/orders/${response.data._id}`);
    } catch (error) {
      console.log(error);

      // Check if it's a 401 authentication error
      if ((error as any)?.response?.status === 401) {
        toast({
          title: t("auth.authenticationRequired"),
          description: t("auth.pleaseLogin"),
          variant: "destructive",
        });
        router.push("/login?redirect=/checkout/review");
        return;
      }

      toast({
        title: t("checkout.errorPlacingOrder"),
        description: t("checkout.pleaseTryAgain"),
        variant: "destructive",
      });
    } finally {
      setIsPlacingOrder(false);
    }
  };

  // Don't render if not authenticated
  if (!isMounted || isLoading || hasAccessToken === null) {
    return null;
  }

  if (!user || hasAccessToken === false) {
    return null;
  }

  return (
    <div className="order-review-grid">
      <div className="order-details col-span-8 space-y-6">
        {/* Shipping Address */}
        <div className="card p-6">
          <h2 className="section-title">{t("checkout.shipping")}</h2>
          <p className="address-details">
            <strong>{t("checkout.address")}: </strong>
            {shippingDetails?.address}, {shippingDetails?.city},{" "}
            {shippingDetails?.postalCode}, {shippingDetails?.country}
          </p>
          <p className="address-details">
            <strong>{t("checkout.phone")}: </strong>
            {shippingDetails?.phoneNumber}
          </p>
        </div>

        {/* Payment Method */}
        <div className="card p-6">
          <h2 className="section-title">{t("checkout.payment")}</h2>
          <p className="payment-method">
            <strong>{t("checkout.method")}: </strong>
            {paymentMethod}
          </p>
        </div>

        {/* Order Items */}
        <div className="card p-6">
          <h2 className="section-title">{t("checkout.orderItems")}</h2>
          <div className="order-items space-y-4">
            {items.map((item) => {
              // Display name based on selected language
              const displayName =
                language === "en" && item.nameEn ? item.nameEn : item.name;

              return (
                <div
                  key={`${item.productId}-${item.color ?? "c"}-${
                    item.size ?? "s"
                  }-${item.ageGroup ?? "a"}`}
                  className="order-item flex items-center space-x-4"
                >
                  <div className="image-container relative h-20 w-20">
                    {isCloudinaryImage(item.image) ? (
                      <img
                        src={item.image}
                        alt={displayName}
                        className="object-cover rounded-md"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <Image
                        src={item.image}
                        alt={displayName}
                        fill
                        className="object-cover rounded-md"
                      />
                    )}
                  </div>
                  <div className="order-item-details flex-1">
                    <Link
                      href={`/products/${item.productId}`}
                      className="item-name font-medium hover:underline"
                    >
                      {displayName}
                    </Link>
                    <p className="item-price text-sm text-muted-foreground">
                      {item.qty} x {item.price} ₾ = {item.qty * item.price} ₾
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="order-summary col-span-4">
        <div className="card p-6">
          <h2 className="section-title">{t("checkout.orderSummary")}</h2>
          <div className="summary-details space-y-4">
            <div className="summary-row flex justify-between">
              <span className="summary-label text-muted-foreground">
                {t("checkout.items")}
              </span>
              <span>{itemsPrice.toFixed(2)} ₾</span>
            </div>
            <div className="summary-row flex justify-between">
              <span className="summary-label text-muted-foreground">
                {t("checkout.shippingCost")}
              </span>
              <span>
                {shippingPrice === 0
                  ? t("checkout.free")
                  : `${shippingPrice.toFixed(2)}₾`}
              </span>
            </div>
            <div className="summary-row flex justify-between">
              <span className="summary-label text-muted-foreground">
                {t("checkout.tax")}
              </span>
              <span>{taxPrice.toFixed(2)} ₾</span>
            </div>
            <div className="separator" />
            <div className="summary-row flex justify-between font-medium">
              <span>{t("checkout.total")}</span>
              <span>{totalPrice.toFixed(2)} ₾</span>
            </div>
            <button
              className="place-order-button w-full"
              onClick={handlePlaceOrder}
              disabled={isPlacingOrder}
            >
              {isPlacingOrder
                ? t("checkout.placingOrder")
                : t("checkout.placeOrder")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
