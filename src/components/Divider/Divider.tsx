import React from 'react';

export const Divider: React.FC = () => {
    return (
        <div className="relative w-full h-32 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 relative">
                    {/* Outer glow */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-xl animate-pulse" />

                    {/* Outer circle */}
                    <div className="absolute inset-0 rounded-full border-2 border-purple-500/20 animate-pulse" />

                    {/* Middle circle */}
                    <div className="absolute inset-4 rounded-full border-2 border-blue-500/30 animate-pulse" style={{ animationDelay: '0.3s' }} />

                    {/* Inner circle */}
                    <div className="absolute inset-8 rounded-full border-2 border-purple-500/40 animate-pulse" style={{ animationDelay: '0.6s' }} />

                    {/* Stars */}
                    {[...Array(12)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"
                            style={{
                                top: '50%',
                                left: '50%',
                                transform: `rotate(${i * 30}deg) translate(48px) rotate(-${i * 30}deg)`,
                                animation: 'twinkle 3s infinite',
                                animationDelay: `${i * 0.2}s`
                            }}
                        />
                    ))}

                    {/* Floating particles */}
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={`particle-${i}`}
                            className="absolute w-1 h-1 bg-purple-300 rounded-full"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animation: 'float 8s infinite',
                                animationDelay: `${i * 1.5}s`
                            }}
                        />
                    ))}
                </div>
            </div>
            <style>{`
                @keyframes twinkle {
                    0%, 100% { opacity: 0.2; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.5); }
                }
                @keyframes float {
                    0% { transform: translate(0, 0) scale(1); opacity: 0.2; }
                    50% { transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) scale(1.5); opacity: 1; }
                    100% { transform: translate(0, 0) scale(1); opacity: 0.2; }
                }
            `}</style>
        </div>
    );
}; 