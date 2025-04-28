import React, { useState, FormEvent, useEffect, useRef } from 'react';
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
    clientSecret: string;
    paymentIntentId: string | null;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSuccess, onCancel, email, birthDetails, clientSecret, paymentIntentId }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setIsProcessing(true);
        setErrorMessage('');

        if (!stripe || !elements || !paymentIntentId) {
            setErrorMessage('Payment system not ready. Please try again.');
            setIsProcessing(false);
            return;
        }

        // Save data to sessionStorage before starting payment
        const dataToSave = {
            ...birthDetails,
            email,
            paymentIntentId
        };
        console.log('Saving to sessionStorage before payment:', dataToSave);
        sessionStorage.setItem('birthDetails', JSON.stringify(dataToSave));

        // Trigger form validation and wallet collection
        const { error: submitError } = await elements.submit();
        if (submitError) {
            console.log("submit error")
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
                console.error('Payment confirmation error:', error);
                setErrorMessage(error.message || 'An error occurred while processing your payment.');
                setIsProcessing(false);
                return;
            }

        } catch (err) {
            console.error('Payment error:', err);
            setErrorMessage('An error occurred while processing your payment. Please try again.');
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
    const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const paymentIntentCreated = useRef(false);

    useEffect(() => {
        const createPaymentIntent = async () => {
            // If we already have a payment intent or one is being created, don't create a new one
            if (clientSecret && paymentIntentId || paymentIntentCreated.current) {
                return;
            }

            paymentIntentCreated.current = true;
            setIsLoading(true);
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

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to create payment intent');
                }

                const { clientSecret: newClientSecret, paymentIntentId: newPaymentIntentId } = await response.json();
                setClientSecret(newClientSecret);
                setPaymentIntentId(newPaymentIntentId);
                console.log('Payment Intent created:', newPaymentIntentId);
            } catch (err) {
                console.error('Error creating payment intent:', err);
                setError('Failed to initialize payment form. Please try again.');
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
        mode: 'payment',
        currency: 'usd',
        amount: 699,
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
            />
        </Elements>
    );
}; 