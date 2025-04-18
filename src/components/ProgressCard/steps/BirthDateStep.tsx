import React from 'react';
import { Calendar, Clock } from "lucide-react";
import { Checkbox } from "../../ui/checkbox";
import { Label } from "../../ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../ui/select";
import { StepProps } from '../types';

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
const years = Array.from({ length: 100 }, (_, i) => (2025 - i).toString());
const hours = Array.from({ length: 24 }, (_, i) => (i < 10 ? `0${i}` : i.toString()));
const minutes = Array.from({ length: 60 }, (_, i) => (i < 10 ? `0${i}` : i.toString()));

export const BirthDateStep: React.FC<StepProps> = ({ question, errors, onValueChange, values }) => {
    const exactTimeUnknown = values.exactTimeUnknown === 'true';

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
            <div className="flex items-center gap-2 pt-2">
                <div className="flex gap-2 w-full">
                    <div className="w-full">
                        <Select value={values.birthMonth} onValueChange={(value) => onValueChange('birthMonth', value)}>
                            <SelectTrigger className={`bg-[rgba(40,40,70,1)] border ${errors.birthDate ? 'border-red-500' : 'border-gray-700'} text-white`}>
                                <SelectValue placeholder="Month" />
                            </SelectTrigger>
                            <SelectContent>
                                {months.map((month) => (
                                    <SelectItem key={month} value={month}>
                                        {month}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="w-full">
                        <Select value={values.birthDay} onValueChange={(value) => onValueChange('birthDay', value)}>
                            <SelectTrigger className={`bg-[rgba(40,40,70,1)] border ${errors.birthDate ? 'border-red-500' : 'border-gray-700'} text-white`}>
                                <SelectValue placeholder="Day" />
                            </SelectTrigger>
                            <SelectContent>
                                {days.map((day) => (
                                    <SelectItem key={day} value={day}>
                                        {day}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="w-full">
                        <Select value={values.birthYear} onValueChange={(value) => onValueChange('birthYear', value)}>
                            <SelectTrigger className={`bg-[rgba(40,40,70,1)] border ${errors.birthDate ? 'border-red-500' : 'border-gray-700'} text-white`}>
                                <SelectValue placeholder="Year" />
                            </SelectTrigger>
                            <SelectContent>
                                {years.map((year) => (
                                    <SelectItem key={year} value={year}>
                                        {year}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
            {errors.birthDate && (
                <p className="text-red-500 text-sm">{errors.birthDate}</p>
            )}
            <div className="pt-4">
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="exactTimeUnknown"
                        className="border-white"
                        checked={exactTimeUnknown}
                        onCheckedChange={(checked) => onValueChange('exactTimeUnknown', checked ? 'true' : 'false')}
                    />
                    <Label htmlFor="exactTimeUnknown" className="text-sm text-gray-300">
                        I don't know my exact birth time
                    </Label>
                </div>
                {!exactTimeUnknown && (
                    <div className="flex items-center gap-2 pt-4">
                        <div className="flex gap-2 w-full">
                            <div className="w-full">
                                <Select value={values.birthHour} onValueChange={(value) => onValueChange('birthHour', value)}>
                                    <SelectTrigger className={`bg-[rgba(40,40,70,1)] border ${errors.birthTime ? 'border-red-500' : 'border-gray-700'} text-white`}>
                                        <SelectValue placeholder="Hour" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {hours.map((hour) => (
                                            <SelectItem key={hour} value={hour}>
                                                {hour}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="w-full">
                                <Select value={values.birthMinute} onValueChange={(value) => onValueChange('birthMinute', value)}>
                                    <SelectTrigger className={`bg-[rgba(40,40,70,1)] border ${errors.birthTime ? 'border-red-500' : 'border-gray-700'} text-white`}>
                                        <SelectValue placeholder="Minute" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {minutes.map((minute) => (
                                            <SelectItem key={minute} value={minute}>
                                                {minute}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                )}
                {errors.birthTime && (
                    <p className="text-red-500 text-sm">{errors.birthTime}</p>
                )}
            </div>
        </div>
    );
}; 