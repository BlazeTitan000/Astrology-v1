import React, { useState, useEffect } from 'react';
import { Input } from "../../ui/input";
import { MapPin, Mail } from "lucide-react";
import { StepProps } from '../types';

export const LocationStep: React.FC<StepProps> = ({ question, errors, onValueChange, values }) => {
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleLocationChange = (value: string) => {
        onValueChange('birthplace', value);
        setShowSuggestions(true);

        if (value.length < 3) {
            setSuggestions([]);
            return;
        }

        const fetchAddresses = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${value}`
                );
                const data = await response.json();
                setSuggestions(data);
            } catch (error) {
                console.error("Error fetching address suggestions:", error);
            }
            setLoading(false);
        };

        const debounceTimeout = setTimeout(fetchAddresses, 300);
        return () => clearTimeout(debounceTimeout);
    };

    const handleSuggestionSelect = (item: any) => {
        onValueChange('birthplace', item.display_name);
        setSuggestions([]);
        setShowSuggestions(false);
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-2xl font-medium leading-8 tracking-[0px] font-libre-bodoni">
                    {question.title}
                </h2>
                <p className="text-sm leading-5 tracking-[0.25px] text-gray-300 font-playfair">
                    {question.description}
                </p>
            </div>
            <div className="flex justify-center pt-4">
                <img
                    src={question.image}
                    alt={`${question.title} illustration`}
                    className="h-20 object-contain"
                />
            </div>
            <div className="space-y-4">
                <div className="pt-2 relative">
                    <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10">
                            <MapPin size={20} />
                        </div>
                        <Input
                            type="text"
                            value={values.birthplace}
                            onChange={(e) => handleLocationChange(e.target.value)}
                            placeholder="Enter your birthplace"
                            className={`bg-[rgba(40,40,70,1)] border ${errors.birthplace ? 'border-red-500' : 'border-gray-700'} text-white p-3 pl-10 rounded-lg focus:ring-2 focus:ring-[rgba(66,104,165,1)] font-playfair`}
                            aria-label="Birthplace"
                        />
                        {showSuggestions && suggestions.length > 0 && (
                            <ul className="absolute w-full bg-[rgba(40,40,70,1)] border border-[rgba(66,104,165,1)] rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto z-[9999]">
                                {suggestions.map((item) => (
                                    <li
                                        key={item.place_id}
                                        className="p-3 hover:bg-[rgba(50,50,80,1)] border-b border-[rgba(66,104,165,1)] cursor-pointer text-white transition duration-150 font-playfair"
                                        onClick={() => handleSuggestionSelect(item)}
                                    >
                                        {item.display_name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    {loading && (
                        <p className="text-sm text-gray-400 mt-1 font-playfair absolute left-0">Loading suggestions...</p>
                    )}
                </div>
                {errors.birthplace && (
                    <p className="text-red-500 text-sm">{errors.birthplace}</p>
                )}
                <div className="pt-2 relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Mail size={20} />
                    </div>
                    <Input
                        type="email"
                        value={values.email}
                        onChange={(e) => onValueChange('email', e.target.value)}
                        placeholder="Enter your email"
                        className={`bg-[rgba(40,40,70,1)] border ${errors.email ? 'border-red-500' : 'border-gray-700'} text-white p-3 pl-10 rounded-lg focus:ring-2 focus:ring-[rgba(66,104,165,1)] font-playfair`}
                        aria-label="Email"
                    />
                </div>
                {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                )}
            </div>
        </div>
    );
}; 