import React, { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Label } from "../ui/label";
import { ArrowRight, ArrowLeft, User, Calendar, MapPin, Mail, Clock } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

interface Question {
    title: string;
    description: string;
    placeholder: string;
    type: string;
    image: string;
    options?: string[];
}

interface ProgressCardProps {
    currentStep: number;
    totalSteps: number;
    question: Question;
    onNext: (details: Partial<BirthDetails>) => void;
    onPrevious: () => void;
}

interface BirthDetails {
    name: string;
    birthDate: string;
    birthTime: string | null;
    birthplace: string;
    email: string;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({ currentStep, totalSteps, question, onNext, onPrevious }) => {
    const [name, setName] = useState("");
    const [birthMonth, setBirthMonth] = useState("");
    const [birthDay, setBirthDay] = useState("");
    const [birthYear, setBirthYear] = useState("");
    const [birthHour, setBirthHour] = useState("");
    const [birthMinute, setBirthMinute] = useState("");
    const [exactTimeUnknown, setExactTimeUnknown] = useState(false);
    const [birthplace, setBirthplace] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateStep = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (currentStep === 1) {
            if (!name.trim()) {
                newErrors.name = "Name is required";
            }
        } else if (currentStep === 2) {
            if (!birthMonth || !birthDay || !birthYear) {
                newErrors.birthDate = "Please select your complete birth date";
            }
            if (!exactTimeUnknown && (!birthHour || !birthMinute)) {
                newErrors.birthTime = "Please select your birth time";
            }
        } else if (currentStep === 3) {
            if (!birthplace.trim()) {
                newErrors.birthplace = "Birthplace is required";
            }
            if (!email.trim()) {
                newErrors.email = "Email is required";
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                newErrors.email = "Please enter a valid email address";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        if (errors.name) {
            setErrors(prev => ({ ...prev, name: "" }));
        }
    };

    const handleNext = () => {
        if (!validateStep()) {
            return;
        }

        const details: Partial<BirthDetails> = {};

        if (currentStep === 1) {
            details.name = name;
        } else if (currentStep === 2) {
            details.birthDate = `${birthYear}-${birthMonth.padStart(2, '0')}-${birthDay.padStart(2, '0')}`;
            details.birthTime = exactTimeUnknown ? null : `${birthHour}:${birthMinute}`;
        } else if (currentStep === 3) {
            details.birthplace = birthplace;
            details.email = email;
        }

        onNext(details);
    };

    const handlePrevious = () => {
        onPrevious();
    };

    const getProgressValue = () => {
        return (currentStep / totalSteps) * 100;
    };

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
    const years = Array.from({ length: 100 }, (_, i) => (2025 - i).toString());
    const hours = Array.from({ length: 24 }, (_, i) => (i < 10 ? `0${i}` : i.toString()));
    const minutes = Array.from({ length: 60 }, (_, i) => (i < 10 ? `0${i}` : i.toString()));

    return (
        <div className="bg-[rgba(0,0,0,0)] z-10 flex mt-[-34px] w-5/6 mx-auto flex-col items-center pt-[39px] max-md:max-w-full">
            <div className="bg-[rgba(28,28,58,0.9)] min-w-[280px] mt-8 min-h-[550px] w-[560px] max-w-full overflow-hidden text-white font-normal rounded-[28px] max-md:mt-5 flex flex-col">
                <div className="flex-1 overflow-y-auto p-6 max-md:max-w-full max-md:px-5">
                    <div className="flex w-[561px] max-w-full flex-col gap-1">
                        <div className="flex justify-between text-white text-xs mb-1">
                            <span className="font-semibold">Step {currentStep}</span>
                            <span>Step {currentStep} of {totalSteps}</span>
                        </div>
                        <Progress value={getProgressValue()} className="h-2 bg-[#E8DEF8]" />
                    </div>
                    {/* Step 1: Name Input */}
                    {currentStep === 1 && (
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
                                    value={name}
                                    onChange={handleNameChange}
                                    placeholder={question.placeholder}
                                    className={`bg-[rgba(40,40,70,1)] border ${errors.name ? 'border-red-500' : 'border-gray-700'} text-white p-3 pl-10 rounded-lg focus:ring-2 focus:ring-[rgba(66,104,165,1)] font-playfair`}
                                    aria-label="Your name"
                                />

                            </div>
                            {errors.name && (
                                <p className="text-red-500 text-sm">{errors.name}</p>
                            )}
                        </div>
                    )}

                    {/* Step 2: Birth Date */}
                    {currentStep === 2 && (
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
                                        <Select value={birthMonth} onValueChange={setBirthMonth}>
                                            <SelectTrigger className={`bg-[rgba(40,40,70,1)] border ${errors.birthDate ? 'border-red-500' : 'border-gray-700'} text-white`}>
                                                <SelectValue placeholder="Month" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[rgba(40,40,70,1)] text-white border-[rgba(60,60,90,1)]">
                                                {months.map((month, index) => (
                                                    <SelectItem key={index} value={(index + 1).toString()}>
                                                        {month}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="w-1/4">
                                        <Select value={birthDay} onValueChange={setBirthDay}>
                                            <SelectTrigger className={`bg-[rgba(40,40,70,1)] border ${errors.birthDate ? 'border-red-500' : 'border-gray-700'} text-white`}>
                                                <SelectValue placeholder="Day" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[rgba(40,40,70,1)] text-white border-[rgba(60,60,90,1)]">
                                                {days.map((day) => (
                                                    <SelectItem key={day} value={day}>{day}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="w-1/4">
                                        <Select value={birthYear} onValueChange={setBirthYear}>
                                            <SelectTrigger className={`bg-[rgba(40,40,70,1)] border ${errors.birthDate ? 'border-red-500' : 'border-gray-700'} text-white`}>
                                                <SelectValue placeholder="Year" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[rgba(40,40,70,1)] text-white border-[rgba(60,60,90,1)]">
                                                {years.map((year) => (
                                                    <SelectItem key={year} value={year}>{year}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                            {errors.birthDate && (
                                <p className="text-red-500 text-sm mt-1">{errors.birthDate}</p>
                            )}

                            <div className="space-y-4 pt-2">
                                <div className="flex gap-2">
                                    <Select value={birthHour} onValueChange={setBirthHour} disabled={exactTimeUnknown}>
                                        <SelectTrigger className={`bg-[rgba(40,40,70,1)] border ${errors.birthTime ? 'border-red-500' : 'border-gray-700'} text-white`}>
                                            <SelectValue placeholder="00" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-[rgba(40,40,70,1)] text-white border-[rgba(60,60,90,1)]">
                                            {hours.map((hour) => (
                                                <SelectItem key={hour} value={hour}>{hour}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <Select value={birthMinute} onValueChange={setBirthMinute} disabled={exactTimeUnknown}>
                                        <SelectTrigger className={`bg-[rgba(40,40,70,1)] border ${errors.birthTime ? 'border-red-500' : 'border-gray-700'} text-white`}>
                                            <SelectValue placeholder="00" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-[rgba(40,40,70,1)] text-white border-[rgba(60,60,90,1)]">
                                            {minutes.map((min) => (
                                                <SelectItem key={min} value={min}>{min}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                {errors.birthTime && (
                                    <p className="text-red-500 text-sm mt-1">{errors.birthTime}</p>
                                )}

                                <div className="flex items-center space-x-2 pl-7">
                                    <Checkbox
                                        id="exact-time-unknown"
                                        checked={exactTimeUnknown}
                                        className="border-gray-100"
                                        onCheckedChange={(checked) => {
                                            setExactTimeUnknown(checked === true);
                                            if (checked) {
                                                setBirthHour("");
                                                setBirthMinute("");
                                            }
                                        }}
                                    />
                                    <Label
                                        htmlFor="exact-time-unknown"
                                        className="text-sm text-gray-300"
                                    >
                                        I don't know the exact time
                                    </Label>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Birth Place */}
                    {currentStep === 3 && (
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
                                    className="h-24 object-contain"
                                />
                            </div>
                            <div className="pt-2 space-y-4">
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                        <MapPin size={20} />
                                    </div>
                                    <Input
                                        type="text"
                                        value={birthplace}
                                        onChange={(e) => {
                                            setBirthplace(e.target.value);
                                            if (errors.birthplace) {
                                                setErrors(prev => ({ ...prev, birthplace: "" }));
                                            }
                                        }}
                                        placeholder={question.placeholder}
                                        className={`bg-[rgba(40,40,70,1)] border ${errors.birthplace ? 'border-red-500' : 'border-gray-700'} text-white p-3 pl-10 rounded-lg focus:ring-2 focus:ring-[rgba(66,104,165,1)]`}
                                        aria-label="Your birthplace"
                                    />
                                </div>

                                {errors.birthplace && (
                                    <p className="text-red-500 text-sm mt-1">{errors.birthplace}</p>
                                )}
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                        <Mail size={20} />
                                    </div>
                                    <Input
                                        type="email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            if (errors.email) {
                                                setErrors(prev => ({ ...prev, email: "" }));
                                            }
                                        }}
                                        placeholder="Email address"
                                        className={`bg-[rgba(40,40,70,1)] border ${errors.email ? 'border-red-500' : 'border-gray-700'} text-white p-3 pl-10 rounded-lg focus:ring-2 focus:ring-[rgba(66,104,165,1)]`}
                                        aria-label="Your email"
                                    />
                                </div>

                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                <div className="p-6 pt-0 border-t border-[rgba(255,255,255,0.1)]">
                    <div className="flex justify-center items-center gap-4 mt-6">
                        {currentStep > 1 && (
                            <Button
                                onClick={handlePrevious}
                                variant="outline"
                                className="bg-[rgba(40,40,70,0.5)] text-white border-none hover:bg-[rgba(40,40,70,0.7)] hover:text-purple-400 px-4 rounded-full font-playfair"
                            >
                                <ArrowLeft size={16} className="mr-1" />
                                Back
                            </Button>
                        )}

                        <Button
                            onClick={handleNext}
                            className={currentStep === totalSteps ? "bg-[#426CCCFA] rounded-full font-playfair" : "bg-[#65558F] rounded-full font-playfair"}
                        >
                            {currentStep === totalSteps ? "GENERATE" : "NEXT"}
                            {currentStep !== totalSteps && <ArrowRight size={16} className="ml-1" />}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
