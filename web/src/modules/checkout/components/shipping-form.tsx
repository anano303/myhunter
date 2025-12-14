"use client";

import { useForm, Controller } from "react-hook-form";
import { apiClient } from "@/lib/api-client";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useCheckout } from "../context/checkout-context";
import { getCountries } from "@/lib/countries";
import { useUser } from "@/modules/auth/hooks/use-user";
import { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/LanguageContext";

import "./shipping-form.css";

interface ShippingFormData {
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
}

export function ShippingForm() {
  const { setShippingAddress, setPaymentMethod } = useCheckout();
  const router = useRouter();
  const { toast } = useToast();
  const { user, isLoading } = useUser();
  const { t, language } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Redirect to login if not authenticated and auth state is loaded
  useEffect(() => {
    if (!isMounted || isLoading) return;
    if (!user) {
      router.push("/login?redirect=/checkout/shipping");
    }
  }, [user, isLoading, isMounted, router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<ShippingFormData>();

  const onSubmit = async (data: ShippingFormData) => {
    if (isLoading) {
      return;
    }

    if (!user) {
      router.push("/login?redirect=/checkout/shipping");
      return;
    }

    try {
      const response = await apiClient.post("/cart/shipping", data);
      const shippingAddress = response.data;
      setShippingAddress(shippingAddress);

      // Auto-set payment method to BOG
      setPaymentMethod("BOG");

      // Go directly to review
      router.push("/checkout/review");
    } catch (error) {
      console.log(error);

      // Check if it's a 401 authentication error
      if ((error as any)?.response?.status === 401) {
        toast({
          title: t("auth.authenticationRequired"),
          description: t("auth.pleaseLogin"),
          variant: "destructive",
        });
        router.push("/login?redirect=/checkout/shipping");
        return;
      }

      toast({
        title: t("checkout.errorSavingShipping"),
        description: t("checkout.pleaseTryAgain"),
        variant: "destructive",
      });
    }
  };

  // Don't render form if not authenticated
  if (!isMounted || isLoading) {
    return null;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="shipping-form-card">
      <div className="shipping-form-header">
        <h1>{t("checkout.shippingAddress")}</h1>
        <p>{t("checkout.enterShippingDetails")}</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="shipping-form">
        <div className="shipping-form-field">
          <label htmlFor="address">{t("checkout.streetAddress")}</label>
          <input
            id="address"
            {...register("address", {
              required: t("checkout.addressRequired"),
            })}
            placeholder={t("checkout.addressPlaceholder")}
          />
          {errors.address && (
            <p className="error-text">{errors.address.message}</p>
          )}
        </div>

        <div className="shipping-form-field">
          <label htmlFor="city">{t("checkout.city")}</label>
          <input
            id="city"
            {...register("city", { required: t("checkout.cityRequired") })}
            placeholder={t("checkout.cityPlaceholder")}
          />
          {errors.city && <p className="error-text">{errors.city.message}</p>}
          <p className="shipping-info-text">
            {language === "ge"
              ? "მიწოდება: თბილისი - 8₾, რეგიონები - 15₾"
              : "Delivery: Tbilisi - 8₾, Regions - 15₾"}
          </p>
        </div>

        <div className="shipping-form-field">
          <label htmlFor="postalCode">{t("checkout.postalCode")}</label>
          <input
            id="postalCode"
            {...register("postalCode")}
            placeholder={t("checkout.postalCodePlaceholder")}
          />
          {errors.postalCode && (
            <p className="error-text">{errors.postalCode.message}</p>
          )}
        </div>

        <div className="shipping-form-field">
          <label htmlFor="phoneNumber">{t("checkout.phoneNumber")}</label>
          <input
            id="phoneNumber"
            type="tel"
            {...register("phoneNumber", {
              required: t("checkout.phoneNumberRequired"),
              pattern: {
                value: /^[\+]?[1-9][\d]{0,15}$/,
                message: t("checkout.validPhoneNumber"),
              },
            })}
            placeholder={t("checkout.phoneNumberPlaceholder")}
          />
          {errors.phoneNumber && (
            <p className="error-text">{errors.phoneNumber.message}</p>
          )}
        </div>

        <div className="shipping-form-field">
          <label htmlFor="country">{t("checkout.country")}</label>
          <Controller
            name="country"
            control={control}
            rules={{ required: t("checkout.countryRequired") }}
            render={({ field }) => (
              <select {...field} defaultValue="">
                <option value="" disabled>
                  {t("checkout.selectCountry")}
                </option>
                {getCountries().map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.country && (
            <p className="error-text">{errors.country.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="shipping-form-button"
          disabled={isSubmitting}
        >
          {t("checkout.continueToPayment")}
        </button>
      </form>
    </div>
  );
}
