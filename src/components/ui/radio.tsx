import React from 'react';

interface RadioProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
    disabled?: boolean;
    name?: string;
    value: string;
}

export const Radio: React.FC<RadioProps> = ({ checked, onChange, label, disabled = false, name, value }) => {
    return (
        <label className="flex items-center space-x-2 cursor-pointer group">
            <div className="relative">
                <input
                    type="radio"
                    name={name}
                    value={value}
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                    disabled={disabled}
                    className="sr-only"
                />
                <div className={`
                    w-5 h-5 rounded-full border-2 transition-all duration-200
                    ${checked ? 'border-purple-500' : 'border-gray-300'}
                    ${disabled ? 'opacity-50 cursor-not-allowed' : 'group-hover:border-purple-400'}
                `}>
                    {checked && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                            <div className="absolute inset-0 rounded-full border-2 border-purple-300 animate-ping" style={{ animationDelay: '0.2s' }} />
                        </div>
                    )}
                </div>
            </div>
            {label && <span className="text-sm text-gray-700">{label}</span>}
        </label>
    );
}; 