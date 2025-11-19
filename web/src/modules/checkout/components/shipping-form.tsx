"use client";

import { useForm, Controller } from "react-hook-form";
import { apiClient } from "@/lib/api-client";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useCheckout } from "../context/checkout-context";
import { getCountries } from "@/lib/countries";
import { useUser } from "@/modules/auth/hooks/use-user";
import { useEffect } from "react";

import "./shipping-form.css";

interface ShippingFormData {
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
}

export function ShippingForm() {
  const { setShippingAddress } = useCheckout();
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useUser();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      router.push("/login?redirect=/checkout/shipping");
    }
  }, [user, router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<ShippingFormData>();

  const onSubmit = async (data: ShippingFormData) => {
    if (!user) {
      router.push("/login?redirect=/checkout/shipping");
      return;
    }

    try {
      const response = await apiClient.post("/cart/shipping", data);
      const shippingAddress = response.data;
      setShippingAddress(shippingAddress);
      router.push("/checkout/payment");
    } catch (error) {
      console.log(error);
      
      // Check if it's a 401 authentication error
      if ((error as any)?.response?.status === 401) {
        toast({
          title: "ავტორიზაცია საჭიროა",
          description: "გთხოვთ ჯერ შეხვიდეთ სისტემაში",
          variant: "destructive",
        });
        router.push("/login?redirect=/checkout/shipping");
        return;
      }
      
      toast({
        title: "Error saving shipping details",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  // Don't render form if not authenticated
  if (!user) {
    return null;
  }

  return (
    <div className="shipping-form-card">
      <div className="shipping-form-header">
        <h1>Shipping Address</h1>
        <p>Enter your shipping details</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="shipping-form">
        <div className="shipping-form-field">
          <label htmlFor="address">Street Address</label>
          <input
            id="address"
            {...register("address", { required: "Address is required" })}
            placeholder="123 Main St"
          />
          {errors.address && (
            <p className="error-text">{errors.address.message}</p>
          )}
        </div>

        <div className="shipping-form-field">
          <label htmlFor="city">City</label>
          <input
            id="city"
            {...register("city", { required: "City is required" })}
            placeholder="New York"
          />
          {errors.city && <p className="error-text">{errors.city.message}</p>}
        </div>

        <div className="shipping-form-field">
          <label htmlFor="postalCode">Postal Code</label>
          <input
            id="postalCode"
            {...register("postalCode", { required: "Postal code is required" })}
            placeholder="10001"
          />
          {errors.postalCode && (
            <p className="error-text">{errors.postalCode.message}</p>
          )}
        </div>

        <div className="shipping-form-field">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            id="phoneNumber"
            type="tel"
            {...register("phoneNumber", {
              required: "Phone number is required",
              pattern: {
                value: /^[\+]?[1-9][\d]{0,15}$/,
                message: "Please enter a valid phone number",
              },
            })}
            placeholder="+995 555 123 456"
          />
          {errors.phoneNumber && (
            <p className="error-text">{errors.phoneNumber.message}</p>
          )}
        </div>

        <div className="shipping-form-field">
          <label htmlFor="country">Country</label>
          <Controller
            name="country"
            control={control}
            rules={{ required: "Country is required" }}
            render={({ field }) => (
              <select {...field} defaultValue="">
                <option value="" disabled>
                  Select a country
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
          Continue to Payment
        </button>
      </form>
    </div>
  );
}
