import React from 'react';

export const CosmicTransition: React.FC = () => {
    return (
        <div className="relative w-full h-48 overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-transparent" />

            {/* Main cosmic elements */}
            <div className="absolute inset-0 flex items-center justify-center">
                {/* Central cosmic portal */}
                <div className="relative w-64 h-64">
                    {/* Outer glow */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20 blur-2xl animate-pulse" />

                    {/* Portal rings */}
                    <div className="absolute inset-0 rounded-full border-2 border-purple-500/30 animate-spin-slow" />
                    <div className="absolute inset-4 rounded-full border-2 border-blue-500/30 animate-spin-slow-reverse" />
                    <div className="absolute inset-8 rounded-full border-2 border-purple-500/40 animate-spin-slow" />

                    {/* Portal center */}
                    <div className="absolute inset-12 rounded-full bg-gradient-to-r from-purple-500/30 to-blue-500/30 animate-pulse" />

                    {/* Floating cosmic particles */}
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={`particle-${i}`}
                            className="absolute w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"
                            style={{
                                top: '50%',
                                left: '50%',
                                transform: `rotate(${i * 18}deg) translate(80px) rotate(-${i * 18}deg)`,
                                animation: 'orbit 8s infinite',
                                animationDelay: `${i * 0.4}s`
                            }}
                        />
                    ))}

                    {/* Shooting stars */}
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={`shooting-${i}`}
                            className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animation: 'shoot 4s infinite',
                                animationDelay: `${i * 1}s`
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Floating cosmic dust */}
            <div className="absolute inset-0">
                {[...Array(30)].map((_, i) => (
                    <div
                        key={`dust-${i}`}
                        className="absolute w-1 h-1 bg-purple-300/50 rounded-full"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animation: 'float 12s infinite',
                            animationDelay: `${i * 0.4}s`
                        }}
                    />
                ))}
            </div>

            <style>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes spin-slow-reverse {
                    from { transform: rotate(360deg); }
                    to { transform: rotate(0deg); }
                }
                @keyframes orbit {
                    0% { transform: rotate(0deg) translate(80px) rotate(0deg); }
                    100% { transform: rotate(360deg) translate(80px) rotate(-360deg); }
                }
                @keyframes shoot {
                    0% { transform: translate(0, 0) scale(1); opacity: 0; }
                    10% { opacity: 1; }
                    20% { transform: translate(100px, -100px) scale(0.5); opacity: 0; }
                    100% { transform: translate(100px, -100px) scale(0.5); opacity: 0; }
                }
                @keyframes float {
                    0% { transform: translate(0, 0) scale(1); opacity: 0.2; }
                    50% { transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) scale(1.5); opacity: 0.8; }
                    100% { transform: translate(0, 0) scale(1); opacity: 0.2; }
                }
                .animate-spin-slow {
                    animation: spin-slow 20s linear infinite;
                }
                .animate-spin-slow-reverse {
                    animation: spin-slow-reverse 15s linear infinite;
                }
            `}</style>
        </div>
    );
}; 