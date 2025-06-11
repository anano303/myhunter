"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { X } from "lucide-react"; // Added X icon for close button
import { motion, AnimatePresence } from "framer-motion";
import "./productDetails.css";
import { Product } from "@/types";
import { ShareButtons } from "@/components/share-buttons/share-buttons";
import { useLanguage } from "@/hooks/LanguageContext";
import { ProductReviews } from "./product-reviews";
import { ReviewForm } from "./review-form";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useCart } from "@/modules/cart/context/cart-context";

// Custom AddToCartButton component that uses the cart context
function AddToCartButton({
  productId,
  countInStock = 0,
  className = "",
  selectedSize = "",
  selectedColor = "",
  selectedAgeGroup = "",
  quantity = 1,
  disabled = false,
}: {
  productId: string;
  countInStock?: number;
  className?: string;
  selectedSize?: string;
  selectedColor?: string;
  selectedAgeGroup?: string;
  quantity?: number;
  disabled?: boolean;
}) {
  const [pending, setPending] = useState(false);
  const { addToCart } = useCart();
  const { t } = useLanguage();

  const handleClick = async () => {
    setPending(true);
    try {
      // Add variant info including ageGroup if available
      await addToCart(
        productId,
        quantity,
        selectedSize,
        selectedColor,
        selectedAgeGroup
      );
      toast({
        title: "პროდუქტი დაემატა",
        description: "პროდუქტი წარმატებით დაემატა კალათაში",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to add product to cart",
        variant: "destructive",
      });
    } finally {
      setPending(false);
    }
  };

  if (countInStock === 0 || disabled) {
    return (
      <button
        className={`add-to-cart-button out-of-stock ${className}`}
        disabled
      >
        {t("shop.outOfStock") || "არ არის მარაგში"}
      </button>
    );
  }

  return (
    <button
      className={`add-to-cart-button ${className}`}
      onClick={handleClick}
      disabled={pending}
    >
      {pending ? (
        <Loader2 className="animate-spin" />
      ) : (
        t("cart.addToCart") || "კალათაში დამატება"
      )}
    </button>
  );
}

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"description" | "reviews">(
    "description"
  );
  const [showReviewForm, setShowReviewForm] = useState(false);

  const availableQuantity = useMemo(() => {
    // Calculate available quantity based on selected attributes
    let stock = product.countInStock || 0;

    // If product has variants, adjust stock based on selected attributes
    if (product.variants && product.variants.length > 0) {
      const variant = product.variants.find(
        (v) =>
          v.size === selectedSize &&
          v.color === selectedColor &&
          v.ageGroup === selectedAgeGroup
      );
      stock = variant ? variant.stock : 0;
    }

    return stock;
  }, [selectedSize, selectedColor, selectedAgeGroup, product]);

  const { t, language } = useLanguage();

  // Display name and description based on selected language
  const displayName =
    language === "en" && product.nameEn ? product.nameEn : product.name;

  const displayDescription =
    language === "en" && product.descriptionEn
      ? product.descriptionEn
      : product.description;

  const isOutOfStock = product.countInStock === 0;

  // Initialize default selections based on product data
  useEffect(() => {
    // Set default size if sizes array exists
    if (product.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    }

    // Set default color if colors array exists
    if (product.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0]);
    }

    // Set default age group if ageGroups array exists
    if (product.ageGroups && product.ageGroups.length > 0) {
      setSelectedAgeGroup(product.ageGroups[0]);
    }
  }, [product]);

  // Function to open fullscreen image
  const openFullscreen = () => {
    setIsFullscreenOpen(true);
  };

  // Function to close fullscreen image
  const closeFullscreen = () => {
    setIsFullscreenOpen(false);
  };

  const handleReviewSuccess = () => {
    setShowReviewForm(false);
    toast({
      title: "შეფასება დაემატა",
      description: "თქვენი შეფასება წარმატებით დაემატა",
    });
    // Refresh the page to show the new review
    window.location.reload();
  };

  return (
    <div className="container">
      <div className="grid">
        {/* Title Section - Now on the left side above the image */}
        <div className="product-title-section">
          <h1 className="product-title">{displayName}</h1>
          {product.brand && (
            <div className="brand-badge">
              {product.brandLogo ? (
                <Image
                  src={product.brandLogo}
                  alt={product.brand}
                  width={24}
                  height={24}
                  className="brand-logo"
                />
              ) : (
                product.brand
              )}
            </div>
          )}
        </div>

        {/* Main Image Section */}
        <div className="image-section">
          <div className="image-container">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="image-wrapper"
                onClick={openFullscreen} // Add click handler to open fullscreen
              >
                <Image
                  src={product.images[currentImageIndex]}
                  alt={displayName}
                  fill
                  quality={90}
                  priority
                  className="details-image"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Thumbnails - Below the main image on the left side */}
        <div className="thumbnail-container">
          {product.images.map((image, index) => (
            <motion.button
              key={image}
              onClick={() => setCurrentImageIndex(index)}
              className={`thumbnail ${
                index === currentImageIndex ? "active" : ""
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src={image}
                alt={`${displayName} view ${index + 1}`}
                fill
                className="object-cover"
              />
            </motion.button>
          ))}
        </div>
        <div>
          <div className="rating-container">
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  className={`star-icon ${
                    star <= Math.round(product.rating) ? "filled" : ""
                  }`}
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
            <span
              className="review-count"
              onClick={() => setActiveTab("reviews")}
            >
              ({product.numReviews} შეფასება)
            </span>
          </div>
          <ShareButtons
            url={typeof window !== "undefined" ? window.location.href : ""}
            title={`Check out ${displayName} by ${product.brand} on MyHunter`}
          />
        </div>
        {/* Product Info Section - On the right side */}
        <div className="product-info-details">
          <div className="price-section">
            <span className="price">{product.price} ლარი </span>
          </div>

          {!isOutOfStock && (
            <div className="product-options-container">
              {/* Age Group Selector - only show if product has age groups */}
              {product.ageGroups && product.ageGroups.length > 0 && (
                <div className="select-container">
                  <select
                    className="option-select"
                    value={selectedAgeGroup}
                    onChange={(e) => setSelectedAgeGroup(e.target.value)}
                    disabled={isOutOfStock || product.ageGroups.length === 0}
                  >
                    {product.ageGroups.map((ageGroup) => (
                      <option key={ageGroup} value={ageGroup}>
                        {ageGroup}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Size Selector - only show if product has sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="select-container">
                  <select
                    className="option-select"
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    disabled={isOutOfStock || product.sizes.length === 0}
                  >
                    <option value=""></option>
                    {product.sizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Color selector - only show if product has colors */}
              {product.colors && product.colors.length > 0 && (
                <div className="select-container">
                  <select
                    className="option-select2"
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    disabled={isOutOfStock || product.colors.length === 0}
                  >
                    <option value="">აირჩიეთ ფერი</option>
                    {product.colors.map((color) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Quantity Selector */}
              {availableQuantity > 0 && (
                <div className="select-container">
                  <select
                    className="option-select"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    disabled={availableQuantity <= 0}
                  >
                    {Array.from(
                      { length: availableQuantity },
                      (_, i) => i + 1
                    ).map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Stock Status */}
              {availableQuantity <= 0 && (
                <div className="out-of-stock-message">
                  {t("shop.outOfStock") || "არ არის მარაგში"}
                </div>
              )}
            </div>
          )}

          <div className="tabs">
            <div className="tabs-list">
              <button
                className={`tabs-trigger ${
                  activeTab === "description" ? "active" : ""
                }`}
                onClick={() => setActiveTab("description")}
              >
                აღწერა
              </button>
              <button
                className={`tabs-trigger ${
                  activeTab === "reviews" ? "active" : ""
                }`}
                onClick={() => setActiveTab("reviews")}
              >
                შეფასებები ({product.numReviews})
              </button>
            </div>

            <div
              className={`tab-content ${
                activeTab === "description" ? "active" : ""
              }`}
            >
              <div className="product-description">
                {displayDescription || "ამ პროდუქტს არ აქვს აღწერა"}
              </div>
            </div>

            <div
              className={`tab-content ${
                activeTab === "reviews" ? "active" : ""
              }`}
            >
              <div className="reviews-container">
                <ProductReviews product={product} />

                {!showReviewForm ? (
                  <button
                    className="add-review-button"
                    onClick={() => setShowReviewForm(true)}
                  >
                    დაამატე შეფასება
                  </button>
                ) : (
                  <div className="review-form-container">
                    <h3 className="review-form-title">დაამატე შეფასება</h3>
                    <ReviewForm
                      productId={product._id}
                      onSuccess={handleReviewSuccess}
                    />
                    <button
                      className="cancel-review-button"
                      onClick={() => setShowReviewForm(false)}
                    >
                      გაუქმება
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <AddToCartButton
            productId={product._id}
            countInStock={availableQuantity}
            className="custom-style-2"
            selectedSize={selectedSize}
            selectedColor={selectedColor}
            selectedAgeGroup={selectedAgeGroup}
            quantity={quantity}
            disabled={
              availableQuantity <= 0 ||
              (product.sizes && product.sizes.length > 0 && !selectedSize) ||
              (product.colors && product.colors.length > 0 && !selectedColor) ||
              (product.ageGroups &&
                product.ageGroups.length > 0 &&
                !selectedAgeGroup)
            }
          />

          {/* Fullscreen Image Modal */}
          {isFullscreenOpen && (
            <div className="fullscreen-modal" onClick={closeFullscreen}>
              <button
                className="fullscreen-close"
                onClick={(e) => {
                  e.stopPropagation();
                  closeFullscreen();
                }}
              >
                <X />
              </button>
              <div
                className="fullscreen-image-container"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={product.images[currentImageIndex]}
                  alt={displayName}
                  width={1200}
                  height={1200}
                  quality={100}
                  className="fullscreen-image"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
