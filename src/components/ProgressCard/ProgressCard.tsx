import React, { useState } from "react";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { ProgressCardProps, BirthDetails } from './types';
import { NameStep } from './steps/NameStep';
import { BirthDateStep } from './steps/BirthDateStep';
import { LocationStep } from './steps/LocationStep';

export const ProgressCard: React.FC<ProgressCardProps> = ({ currentStep, totalSteps, question, onNext, onPrevious }) => {
    const [values, setValues] = useState<Record<string, string>>({
        name: "",
        birthMonth: "",
        birthDay: "",
        birthYear: "",
        birthHour: "",
        birthMinute: "",
        exactTimeUnknown: "false",
        birthplace: "",
        email: ""
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateStep = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (currentStep === 1) {
            if (!values.name.trim()) {
                newErrors.name = "Name is required";
            }
        } else if (currentStep === 2) {
            if (!values.birthMonth || !values.birthDay || !values.birthYear) {
                newErrors.birthDate = "Please select your complete birth date";
            }
            if (values.exactTimeUnknown === "false" && (!values.birthHour || !values.birthMinute)) {
                newErrors.birthTime = "Please select your birth time";
            }
        } else if (currentStep === 3) {
            if (!values.birthplace.trim()) {
                newErrors.birthplace = "Birthplace is required";
            }
            if (!values.email.trim()) {
                newErrors.email = "Email is required";
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
                newErrors.email = "Please enter a valid email address";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleValueChange = (field: string, value: string) => {
        setValues(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: "" }));
        }
    };

    const handleNext = () => {
        if (!validateStep()) {
            return;
        }

        const details: Partial<BirthDetails> = {};

        if (currentStep === 1) {
            details.name = values.name;
        } else if (currentStep === 2) {
            details.birthDate = `${values.birthYear}-${values.birthMonth.padStart(2, '0')}-${values.birthDay.padStart(2, '0')}`;
            details.birthTime = values.exactTimeUnknown === "true" ? null : `${values.birthHour}:${values.birthMinute}`;
        } else if (currentStep === 3) {
            details.birthplace = values.birthplace;
            details.email = values.email;
        }

        onNext(details);
    };

    const handlePrevious = () => {
        onPrevious();
    };

    const getProgressValue = () => {
        return (currentStep / totalSteps) * 100;
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <NameStep question={question} errors={errors} onValueChange={handleValueChange} values={values} />;
            case 2:
                return <BirthDateStep question={question} errors={errors} onValueChange={handleValueChange} values={values} />;
            case 3:
                return <LocationStep question={question} errors={errors} onValueChange={handleValueChange} values={values} />;
            default:
                return null;
        }
    };

    return (
        <div className="bg-[rgba(0,0,0,0)] z-10 flex mt-[-34px] w-5/6 mx-auto flex-col items-center pt-[39px] max-md:max-w-full">
            <div className="bg-[rgba(28,28,58,0.9)] min-w-[280px] mt-8 min-h-[550px] w-[560px] max-w-full text-white font-normal rounded-[28px] max-md:mt-5 flex flex-col">
                <div className="flex-1  p-6 max-md:max-w-full max-md:px-5">
                    <div className="flex w-[561px] max-w-full flex-col gap-1">
                        <div className="flex justify-between text-white text-xs mb-1">
                            <span className="font-semibold">Step {currentStep}</span>
                            <span>Step {currentStep} of {totalSteps}</span>
                        </div>
                        <Progress value={getProgressValue()} className="h-2 bg-[#E8DEF8]" />
                    </div>
                    {renderStep()}
                </div>
                <div className="flex justify-between p-6 border-t border-gray-700">
                    <Button
                        variant="outline"
                        onClick={handlePrevious}
                        className="bg-transparent border-gray-700 text-white hover:bg-gray-700"
                        disabled={currentStep === 1}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Previous
                    </Button>
                    <Button
                        onClick={handleNext}
                        className="bg-[#4268a5] text-white hover:bg-[#355694]"
                    >
                        {currentStep === totalSteps ? "Complete" : "Next"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};
