"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import "./page.css";

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    const orderIdParam = searchParams.get("orderId");
    setOrderId(orderIdParam);
  }, [searchParams]);

  return (
    <div className="checkout-success-container">
      <div className="heartLast">
        <div className="success-card">
          {/* <Image src="/heartLast.png" alt="heartLogo" className="heartLast" width={500} height={700}/> */}

          <h1 className="success-title">გადახდა წარმატებით დასრულდა!</h1>
          <div className="success-icon-container">
            <Image
              src="/ok.png"
              alt="Success Icon"
              width={30}
              height={30}
              className="success-icon"
            />
          </div>

          <p className="success-description">პიიიიიიიიიიპ!</p>

          {orderId && (
            <div className="order-info">
              <p className="order-info-text">
                <span className="order-info-label">შეკვეთის ნომერი:</span>{" "}
                {orderId}
              </p>
            </div>
          )}

          <div className="buttons-container">
            <Link href={`/orders/${orderId}`} className="btn-primary">
              შეკვეთის დეტალების ნახვა
            </Link>

            <Link href="/shop" className="btn-secondary">
              სხვა პროდუქტების ნახვა
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutSuccessContent />
    </Suspense>
  );
}
