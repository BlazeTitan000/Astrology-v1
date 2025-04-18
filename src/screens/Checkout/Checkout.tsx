import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomCheckout } from '../../components/CustomCheckout/CustomCheckout';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';

interface BirthDetails {
    name: string;
    birthDate: string;
    birthTime: string | null;
    birthplace: string;
    email: string;
}

export const Checkout = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [birthDetails, setBirthDetails] = useState<BirthDetails | null>(null);

    useEffect(() => {
        // Check if we have birth details in session storage
        const storedDetails = sessionStorage.getItem('birthDetails');
        if (!storedDetails) {
            // If no birth details, redirect back to the form
            navigate('/');
            return;
        }

        try {
            const parsedDetails = JSON.parse(storedDetails) as BirthDetails;
            if (!parsedDetails.email) {
                navigate('/');
                return;
            }
            setBirthDetails(parsedDetails);
        } catch (error) {
            console.error('Error parsing birth details:', error);
            navigate('/');
        } finally {
            setIsLoading(false);
        }
    }, [navigate]);

    const handleSuccess = () => {
        // Success will be handled by the redirect URL in the Stripe checkout
    };

    const handleCancel = () => {
        navigate('/');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#1C1C3A] flex items-center justify-center">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

    if (!birthDetails) {
        return null;
    }

    return (
        <div className="min-h-screen bg-[#1C1C3A]">
            <Header />
            <CustomCheckout
                email={birthDetails.email}
                birthDetails={birthDetails}
                onSuccess={handleSuccess}
                onCancel={handleCancel}
            />
            <Footer />
        </div>
    );
}; 