import React, { useState, FormEvent, useEffect, useRef } from "react";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import "./CustomCheckout.css";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

interface BirthDetails {
  name: string;
  birthDate: string;
  birthTime: string | null;
  birthplace: string;
}

interface CheckoutFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  email: string;
  birthDetails: BirthDetails;
  clientSecret: string;
  paymentIntentId: string | null;
  discountedPrice: number; // Add discountedPrice
  setDiscountedPrice: React.Dispatch<React.SetStateAction<number>>;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  onSuccess,
  onCancel,
  email,
  birthDetails,
  clientSecret,
  paymentIntentId,
  discountedPrice,
  setDiscountedPrice,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [redeemCode, setRedeemCode] = useState("");
  const [isRedeemCodeValid, setIsRedeemCodeValid] = useState(false);
  const [redeemMessage, setRedeemMessage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const reportImages = [
    "/sample1.png",
    "/sample2.png",
    "/sample3.png",
    // Add more image paths as needed
  ];

  const [currentPage, setCurrentPage] = useState(0);

  const prevPage = () =>
    setCurrentPage((prev) => (prev === 0 ? reportImages.length - 1 : prev - 1));
  const nextPage = () =>
    setCurrentPage((prev) => (prev === reportImages.length - 1 ? 0 : prev + 1));

  const handleRedeemCode = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/validate-redeem-code`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code: redeemCode }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setIsRedeemCodeValid(true);
        setDiscountedPrice(3.5); // Apply 50% discount
        setRedeemMessage("Redeem code applied successfully!");
      } else {
        setDiscountedPrice(6.99); // Apply 50% discount
        setIsRedeemCodeValid(false);
        setRedeemMessage("Invalid redeem code.");
      }
    } catch (err) {
      console.error("Error validating redeem code:", err);
      setRedeemMessage("An error occurred. Please try again.");
    }
  };
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsProcessing(true);
    setErrorMessage("");

    if (!stripe || !elements || !paymentIntentId) {
      setErrorMessage("Payment system not ready. Please try again.");
      setIsProcessing(false);
      return;
    }

    // Save data to sessionStorage before starting payment
    const dataToSave = {
      ...birthDetails,
      email,
      paymentIntentId,
    };
    console.log("Saving to sessionStorage before payment:", dataToSave);
    sessionStorage.setItem("birthDetails", JSON.stringify(dataToSave));

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      console.log("submit error");
      return;
    }

    try {
      // Confirm the payment with the payment element
      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/loading`,
        },
      });

      if (error) {
        console.error("Payment confirmation error:", error);
        setErrorMessage(
          error.message || "An error occurred while processing your payment."
        );
        setIsProcessing(false);
        return;
      }
    } catch (err) {
      console.error("Payment error:", err);
      setErrorMessage(
        "An error occurred while processing your payment. Please try again."
      );
      setIsProcessing(false);
    }
  };
  const paypalSubmit = async () => {
    setIsProcessing(true);

    const dataToSave = {
      ...birthDetails,
      email,
    };
    console.log("Saving to sessionStorage before payment:", dataToSave);
    sessionStorage.setItem("birthDetails", JSON.stringify(dataToSave));

    // ${window.location.origin}/loading
  };

  return (
    <div className="checkout-container flex lg:flex-row flex-col justify-center items-center gap-8 translate-y-[100px] mb-20 pb-20">
      <div className="checkout-card">
        <div className="checkout-header">
          <h2>Complete Your Order</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <label>Payment Method</label>
            <PaymentElement
              options={{
                layout: {
                  type: "tabs",
                  defaultCollapsed: false,
                },
              }}
            />
          </div>

          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <div className="my-6">
            <PayPalScriptProvider
              options={{
                clientId:
                  "AbVQJjaB1MLHwyRS9Nq83N2eOY8jb0rzn97jilrMgTmIkO8MG1vfl6BZaoPhVrzu7WU2ZhbvQwuZNXsd",
              }}
            >
              <PayPalButtons
                style={{ layout: "horizontal" }}
                createOrder={(data, actions) =>
                  actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                      { amount: { value: "6.99", currency_code: "USD" } },
                    ],
                  })
                }
                onApprove={async (data, actions) => {
                  await actions.order?.capture();
                  paypalSubmit();
                }}
                onError={() => alert("PayPal payment failed")}
              />
            </PayPalScriptProvider>
          </div>

          <button
            type="submit"
            disabled={!stripe || isProcessing}
            className="pay-button"
          >
            {isProcessing ? "Processing..." : "Place Order"}
          </button>

          <button type="button" onClick={onCancel} className="cancel-button">
            Cancel
          </button>
        </form>

        <div className="secure-badge">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0110 0v4"></path>
          </svg>
          <span>Secure Payment</span>
        </div>
      </div>
      <div className="checkout-card">
        <div className="order-summary">
          <h3>Receive your report right away after payment</h3>

          <div className="summary-item flex flex-col items-center">
            <div className="relative w-64">
              <img
                src={reportImages[currentPage]}
                alt={`Report page ${currentPage + 1}`}
                className="w-48 mx-auto rounded cursor-zoom-in"
                onClick={() => {
                  setPreviewImage(reportImages[currentPage]);
                  setPreviewOpen(true);
                }}
              />
              <button
                type="button"
                onClick={prevPage}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-700 bg-opacity-70 text-white px-2 py-1 rounded-l"
                aria-label="Previous page"
              >
                &#8592;
              </button>
              <button
                type="button"
                onClick={nextPage}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-700 bg-opacity-70 text-white px-2 py-1 rounded-r"
                aria-label="Next page"
              >
                &#8594;
              </button>
            </div>
            <div className="mt-2 text-sm text-gray-400">
              Page {currentPage + 1} of {reportImages.length}
            </div>
          </div>

          <div className="summary-item">
            <span>SUBTOTAL</span>
            <span>$14.99</span>
          </div>
          <div className="summary-item">
            <span>DISCOUNT</span>
            <span>-$8.00</span>
          </div>
          <div className="summary-item text-3xl font-bold">
            <span>Today's Total</span>
            <span className="savings-amount">
              ${discountedPrice.toFixed(2)}
            </span>
          </div>
        </div>
        <div className="order-summary">
          <h3>Discount code? Enter here</h3>
          <div className="summary-item mb-8">
            <input
              type="text"
              placeholder="Coupon Code"
              value={redeemCode}
              onChange={(e) => setRedeemCode(e.target.value)}
              className="px-4 py-2 rounded-lg w-full text-gray-900"
            />
          </div>
          <div className="summary-item flex justify-center">
            <button
              type="button"
              onClick={handleRedeemCode}
              className="px-4 py-2 bg-gray-600 rounded-lg w-1/2"
            >
              Apply
            </button>
          </div>
          {redeemMessage && (
            <div
              className={`mt-2 ${
                isRedeemCodeValid ? "text-green-500" : "text-red-500"
              }`}
            >
              {redeemMessage}
            </div>
          )}
        </div>
      </div>
      {previewOpen && previewImage && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-80"
          onClick={() => setPreviewOpen(false)}
        >
          <img
            src={previewImage}
            alt="Preview"
            className="max-w-[90vw] max-h-[90vh] rounded shadow-2xl cursor-zoom-out transition-transform duration-200 hover:scale-105"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
          />
          <button
            className="absolute top-8 right-8 text-white text-3xl"
            onClick={() => setPreviewOpen(false)}
            aria-label="Close preview"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export const CustomCheckout: React.FC<CheckoutFormProps> = ({
  email,
  birthDetails,
  onSuccess,
  onCancel,
}) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [discountedPrice, setDiscountedPrice] = useState(6.99);
  const paymentIntentCreated = useRef(false);

  useEffect(() => {
    const createPaymentIntent = async () => {
      // If we already have a payment intent or one is being created, don't create a new one
      if ((clientSecret && paymentIntentId) || paymentIntentCreated.current) {
        return;
      }

      paymentIntentCreated.current = true;
      setIsLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/create-payment-intent`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              amount: Math.round(discountedPrice * 100), // $6.99 in cents
              currency: "usd",
              email,
              metadata: {
                ...birthDetails,
                email,
              },
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || "Failed to create payment intent"
          );
        }

        const {
          clientSecret: newClientSecret,
          paymentIntentId: newPaymentIntentId,
        } = await response.json();
        setClientSecret(newClientSecret);
        setPaymentIntentId(newPaymentIntentId);
        console.log("Payment Intent created:", newPaymentIntentId);
      } catch (err) {
        console.error("Error creating payment intent:", err);
        setError("Failed to initialize payment form. Please try again.");
        paymentIntentCreated.current = false;
      } finally {
        setIsLoading(false);
      }
    };

    createPaymentIntent();
  }, [email, birthDetails]); // Only recreate payment intent if email or birthDetails change

  if (error) {
    return (
      <div className="checkout-container translate-y-[100px] mb-20 pb-20">
        <div className="checkout-card">
          <div className="error-message">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="retry-button mt-4"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!clientSecret || isLoading) {
    return (
      <div className="checkout-container translate-y-[100px] mb-20 pb-20">
        <div className="checkout-card">
          <div className="loading text-white">Loading payment form...</div>
        </div>
      </div>
    );
  }

  const options = {
    mode: "payment",
    currency: "usd",
    amount: Math.round(discountedPrice * 100),
  } as const;

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm
        email={email}
        birthDetails={birthDetails}
        onSuccess={onSuccess}
        onCancel={onCancel}
        clientSecret={clientSecret!}
        paymentIntentId={paymentIntentId}
        discountedPrice={discountedPrice} // Pass discountedPrice as a prop
        setDiscountedPrice={setDiscountedPrice}
      />
    </Elements>
  );
};
