import React, { useState, FormEvent, useEffect } from 'react';
import {
    PaymentElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';
import './CustomCheckout.css';

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
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSuccess, onCancel, email, birthDetails }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setIsProcessing(true);
        setErrorMessage('');

        if (!stripe || !elements) {
            return;
        }

        try {
            // Confirm the payment with the payment element
            const result = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${window.location.origin}/loading`,
                    payment_method_data: {
                        billing_details: {
                            email: email,
                            name: birthDetails.name,
                        },
                    },
                },
            });

            if (result.error) {
                setErrorMessage(result.error.message || 'An error occurred while processing your payment.');
                setIsProcessing(false);
                return;
            }

            // If we get here, the payment was successful
            // Store payment and birth details in session storage
            const paymentIntentId = (result as any).paymentIntent?.id;
            sessionStorage.setItem('birthDetails', JSON.stringify({
                ...birthDetails,
                email,
                paymentIntentId
            }));

            // Navigate to loading page
            navigate('/loading');
        } catch (err) {
            console.error('Payment error:', err);
            setErrorMessage('An error occurred while processing your payment.');
            setIsProcessing(false);
        }
    };

    return (
        <div className="checkout-container translate-y-[100px] mb-20 pb-20">
            <div className="checkout-card">
                <div className="checkout-header">
                    <h2>Complete Your Order</h2>
                    <div className="price-display">
                        <div className="original-price">$14.99</div>
                        <div className="discount-arrow">→</div>
                        <div className="final-price">$6.99</div>
                    </div>
                </div>

                <div className="order-summary">
                    <h3>Order Summary</h3>
                    <div className="summary-item">
                        <span>Personalized Astrology Report</span>
                        <span>$6.99</span>
                    </div>
                    <div className="savings-info">
                        <span>You save</span>
                        <span className="savings-amount">$8.00</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-section">
                        <label>Payment Method</label>
                        <PaymentElement
                            options={{
                                layout: {
                                    type: 'tabs',
                                    defaultCollapsed: false,
                                },
                            }}
                        />
                    </div>

                    {errorMessage && <div className="error-message">{errorMessage}</div>}

                    <button
                        type="submit"
                        disabled={!stripe || isProcessing}
                        className="pay-button"
                    >
                        {isProcessing ? 'Processing...' : 'Pay $6.99'}
                    </button>

                    <button
                        type="button"
                        onClick={onCancel}
                        className="cancel-button"
                    >
                        Cancel
                    </button>
                </form>

                <div className="secure-badge">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0110 0v4"></path>
                    </svg>
                    <span>Secure Payment</span>
                </div>
            </div>
        </div>
    );
};

export const CustomCheckout: React.FC<CheckoutFormProps> = ({ email, birthDetails, onSuccess, onCancel }) => {
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const createPaymentIntent = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/create-payment-intent`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        amount: 699, // $6.99 in cents
                        currency: 'usd',
                        email,
                        metadata: {
                            ...birthDetails,
                            email
                        }
                    }),
                });

                const { clientSecret } = await response.json();
                setClientSecret(clientSecret);
            } catch (err) {
                console.error('Error creating payment intent:', err);
                setError('Failed to initialize payment form. Please try again.');
            }
        };

        createPaymentIntent();
    }, [email, birthDetails]);

    if (error) {
        return (
            <div className="checkout-container translate-y-[100px] mb-20 pb-20">
                <div className="checkout-card">
                    <div className="error-message">{error}</div>
                </div>
            </div>
        );
    }

    if (!clientSecret) {
        return (
            <div className="checkout-container translate-y-[100px] mb-20 pb-20">
                <div className="checkout-card">
                    <div className="loading text-white">Loading payment form...</div>
                </div>
            </div>
        );
    }

    const options = {
        clientSecret,
        appearance: {
            theme: 'stripe' as const,
        },
    } as const;

    return (
        <Elements stripe={stripePromise} options={options}>
            <CheckoutForm
                email={email}
                birthDetails={birthDetails}
                onSuccess={onSuccess}
                onCancel={onCancel}
            />
        </Elements>
    );
}; 