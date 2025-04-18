import React from 'react';
import { Input } from "../../ui/input";
import { User } from "lucide-react";
import { StepProps } from '../types';

export const NameStep: React.FC<StepProps> = ({ question, errors, onValueChange, values }) => {
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
            <div className="pt-2 relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/3 text-gray-400">
                    <User size={20} />
                </div>
                <Input
                    type="text"
                    value={values.name}
                    onChange={(e) => onValueChange('name', e.target.value)}
                    placeholder={question.placeholder}
                    className={`bg-[rgba(40,40,70,1)] border ${errors.name ? 'border-red-500' : 'border-gray-700'} text-white p-3 pl-10 rounded-lg focus:ring-2 focus:ring-[rgba(66,104,165,1)] font-playfair`}
                    aria-label="Your name"
                />
            </div>
            {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
            )}
        </div>
    );
}; 