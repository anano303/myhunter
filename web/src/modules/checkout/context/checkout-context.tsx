"use client";

import { createContext, useContext, useState, useEffect, useRef } from "react";

const CHECKOUT_STORAGE_KEY = "myhunter_checkout_data";

interface CheckoutContextType {
  shippingAddress: ShippingAddress | null;
  paymentMethod: string | null;
  isLoaded: boolean;
  setShippingAddress: (address: ShippingAddress) => void;
  setPaymentMethod: (method: string) => void;
  clearCheckout: () => void;
}

interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
}

interface CheckoutStorageData {
  shippingAddress: ShippingAddress | null;
  paymentMethod: string | null;
  timestamp: number;
}

const CheckoutContext = createContext<CheckoutContextType | null>(null);

// localStorage helper functions
const saveToStorage = (data: CheckoutStorageData) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(CHECKOUT_STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("Error saving checkout data to localStorage:", error);
    }
  }
};

const loadFromStorage = (): CheckoutStorageData | null => {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(CHECKOUT_STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored) as CheckoutStorageData;
        // Check if data is not older than 24 hours
        const ONE_DAY = 24 * 60 * 60 * 1000;
        if (Date.now() - data.timestamp < ONE_DAY) {
          return data;
        } else {
          // Clear expired data
          localStorage.removeItem(CHECKOUT_STORAGE_KEY);
        }
      }
    } catch (error) {
      console.error("Error loading checkout data from localStorage:", error);
    }
  }
  return null;
};

const clearStorage = () => {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(CHECKOUT_STORAGE_KEY);
    } catch (error) {
      console.error("Error clearing checkout data from localStorage:", error);
    }
  }
};

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const [shippingAddress, setShippingAddressState] =
    useState<ShippingAddress | null>(null);
  const [paymentMethod, setPaymentMethodState] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const isLoadingRef = useRef(true); // Track if we're in the loading phase

  // Load from localStorage on mount
  useEffect(() => {
    const stored = loadFromStorage();
    if (stored) {
      if (stored.shippingAddress) {
        setShippingAddressState(stored.shippingAddress);
      }
      if (stored.paymentMethod) {
        setPaymentMethodState(stored.paymentMethod);
      }
    }
    // Use requestAnimationFrame to ensure state updates are processed
    requestAnimationFrame(() => {
      isLoadingRef.current = false;
      setIsInitialized(true);
    });
  }, []);

  // Save to localStorage when state changes (but only after loading phase)
  useEffect(() => {
    // Skip saving during initial load
    if (isLoadingRef.current) {
      return;
    }
    // Only save if we have at least some data
    if (shippingAddress || paymentMethod) {
      saveToStorage({
        shippingAddress,
        paymentMethod,
        timestamp: Date.now(),
      });
    }
  }, [shippingAddress, paymentMethod]);

  const setShippingAddress = (address: ShippingAddress) => {
    setShippingAddressState(address);
    // Save immediately to localStorage for navigation resilience
    saveToStorage({
      shippingAddress: address,
      paymentMethod,
      timestamp: Date.now(),
    });
  };

  const setPaymentMethod = (method: string) => {
    setPaymentMethodState(method);
    // Save immediately to localStorage for navigation resilience
    saveToStorage({
      shippingAddress,
      paymentMethod: method,
      timestamp: Date.now(),
    });
  };

  const clearCheckout = () => {
    setShippingAddressState(null);
    setPaymentMethodState(null);
    clearStorage();
  };

  return (
    <CheckoutContext.Provider
      value={{
        shippingAddress,
        paymentMethod,
        isLoaded: isInitialized,
        setShippingAddress,
        setPaymentMethod,
        clearCheckout,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }
  return context;
}
