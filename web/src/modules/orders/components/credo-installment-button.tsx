"use client";

import React from "react";
import Image from "next/image";
import { getAccessToken } from "@/lib/auth";

interface CredoInstallmentButtonProps {
  orderId: string;
  items: Array<{
    productId: string;
    name: string;
    qty: number;
    price: number;
  }>;
}

export function CredoInstallmentButton({
  orderId,
  items,
}: CredoInstallmentButtonProps) {
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleCredoInstallment = async () => {
    if (isProcessing) return;

    setIsProcessing(true);

    try {
      if (!orderId || !items.length) {
        throw new Error("Invalid order data");
      }

      const token = getAccessToken();
      const products = items.map((item) => ({
        id: item.productId,
        title: item.name,
        amount: item.qty,
        price: item.price,
      }));

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/payments/credo/installment/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ orderId, products }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "კრედო განვადება ვერ შეიქმნა");
      }

      if (result?.success && result?.redirectUrl) {
        window.location.href = result.redirectUrl;
        return;
      }

      throw new Error("კრედო განვადების ბმული ვერ მოიძებნა");
    } catch (error) {
      console.error("Credo Installment Error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "განვადების მოთხოვნა ვერ მოხერხდა. გთხოვთ მოგვიანებით სცადოთ.";
      alert(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <button
      onClick={handleCredoInstallment}
      disabled={isProcessing}
      className="credo-installment-button"
    >
      <Image
        src="/dayavi.webp"
        alt="Credo განვადება"
        width={88}
        height={24}
        className="credo-installment-logo"
      />
      <span>{isProcessing ? "იტვირთება..." : "განვადება "}</span>
    </button>
  );
}
