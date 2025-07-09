import { useState } from "react";
import { StarIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/lib/api-client";
import "./ReviewForm.css";

interface ReviewFormProps {
  productId: string;
  onSuccess: () => void;
}

export function ReviewForm({ productId, onSuccess }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPurchaseError, setShowPurchaseError] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast({
        title: "Error",
        description: "Please select a rating",
        variant: "destructive",
      });
      return;
    }

    if (!comment.trim()) {
      toast({
        title: "Error",
        description: "Please enter a review comment",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await apiClient.put(`/products/${productId}/review`, {
        rating,
        comment,
      });

      toast({
        title: "Success",
        description: "Review submitted successfully",
      });

      setRating(0);
      setComment("");
      onSuccess();
    } catch (error: unknown) {
      let errorMessage = "Failed to submit review";
      let fullError = error;

      // Handle different error types
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (
        typeof error === "object" &&
        error !== null &&
        "response" in error
      ) {
        const axiosError = error as {
          response?: {
            data?: {
              message?: string;
              error?: string;
              statusCode?: number;
            };
            status?: number;
          };
        };

        // Try different error message fields
        errorMessage =
          axiosError.response?.data?.message ||
          axiosError.response?.data?.error ||
          errorMessage;

        fullError = axiosError.response?.data || error;
      }

      // Debug: log the error to see what we're getting
      console.log("Full error object:", fullError);
      console.log("Error message:", errorMessage);

      // Special handling for purchase requirement error
      const isPurchaseError =
        errorMessage === "You can only review products you have purchased" ||
        errorMessage.includes("You can only review") ||
        errorMessage.includes("Bad Request") ||
        (typeof fullError === "object" &&
          fullError !== null &&
          "statusCode" in fullError &&
          fullError.statusCode === 400) ||
        (typeof fullError === "object" &&
          fullError !== null &&
          "message" in fullError &&
          fullError.message ===
            "You can only review products you have purchased") ||
        // Add more broad detection
        errorMessage.includes("purchased") ||
        errorMessage.includes("only review") ||
        true; // TEMPORARY: Always show popup for testing

      console.log("Is purchase error?", isPurchaseError);

      if (isPurchaseError) {
        // Show both toast and custom popup
        toast({
          title: "შეზღუდული წვდომა / Access Restricted",
          description:
            "მხოლოდ ნაყიდი პროდუქტების შეფასება შეგიძლიათ / You can only review products you have purchased",
          variant: "destructive",
        });

        // Show custom popup
        setShowPurchaseError(true);
      } else {
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Purchase Error Popup */}
      {showPurchaseError && (
        <div
          className="error-popup-overlay"
          onClick={() => setShowPurchaseError(false)}
        >
          <div className="error-popup" onClick={(e) => e.stopPropagation()}>
            <div className="error-popup-header">
              <h3>⚠️ შეზღუდული წვდომა</h3>
              <button
                className="error-popup-close"
                onClick={() => setShowPurchaseError(false)}
              >
                ×
              </button>
            </div>
            <div className="error-popup-body">
              <p>მხოლოდ ნაყიდი პროდუქტების შეფასება შეგიძლიათ.</p>
              <p>
                <em>You can only review products you have purchased.</em>
              </p>
            </div>
            <div className="error-popup-footer">
              <button
                className="error-popup-button"
                onClick={() => setShowPurchaseError(false)}
              >
                გასაგებია / OK
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="review-info">
        <p className="review-info-text">
          📝 მხოლოდ ნაყიდი პროდუქტების შეფასება შეგიძლიათ
          <br />
          Only purchased products can be reviewed
        </p>
      </div>

      <form onSubmit={handleSubmit} className="review-form">
        <div className="review-section">
          <label className="review-label">Rating</label>
          <div className="review-stars">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                onMouseEnter={() => setHoveredRating(value)}
                onMouseLeave={() => setHoveredRating(0)}
                className="review-star-button"
              >
                <StarIcon
                  className={`review-star ${
                    value <= (hoveredRating || rating)
                      ? "filled-star"
                      : "empty-star"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="review-section">
          <label htmlFor="comment" className="review-label">
            Review
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review here..."
            className="review-textarea"
          />
        </div>

        <button type="submit" disabled={isSubmitting} className="review-submit">
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}
