import Stripe from 'stripe';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const STRIPE_SECRET_KEY = import.meta.env.VITE_STRIPE_SECRET_KEY;

if (!API_URL) {
    throw new Error('VITE_API_URL environment variable is not defined');
}

if (!STRIPE_SECRET_KEY) {
    throw new Error('VITE_STRIPE_SECRET_KEY environment variable is not defined');
}

const stripe = new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16'
});

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { name, birthDate, birthTime, birthplace, email, success_url, cancel_url } = req.body;

        // Create a Stripe checkout session with all available payment methods
        const session = await stripe.checkout.sessions.create({
            payment_method_types: [
                'card',
                'acss_debit',
                'affirm',
                'afterpay_clearpay',
                'alipay',
                'au_becs_debit',
                'bacs_debit',
                'bancontact',
                'blik',
                'boleto',
                'eps',
                'fpx',
                'giropay',
                'grabpay',
                'ideal',
                'klarna',
                'konbini',
                'link',
                'oxxo',
                'p24',
                'paynow',
                'pix',
                'promptpay',
                'sepa_debit',
                'sofort',
                'us_bank_account',
                'wechat_pay'
            ],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Astrology Report',
                            description: 'Personalized astrology report based on your birth details'
                        },
                        unit_amount: 1999, // $19.99 in cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: success_url,
            cancel_url: cancel_url,
            customer_email: email,
            metadata: {
                name,
                birthDate,
                birthTime: birthTime || 'unknown',
                birthplace,
                email
            },
            // Enable automatic tax calculation
            automatic_tax: { enabled: true },
            // Enable shipping address collection if needed
            shipping_address_collection: {
                allowed_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'IT', 'ES', 'JP', 'SG', 'IN']
            },
            // Enable customer portal for future payments
            customer_creation: 'always',
            // Enable payment method saving
            payment_method_options: {
                card: {
                    setup_future_usage: 'off_session'
                }
            }
        });

        res.status(200).json({ sessionId: session.id });
    } catch (error) {
        console.error('Error creating payment session:', error);
        res.status(500).json({ message: 'Error creating payment session' });
    }
} 