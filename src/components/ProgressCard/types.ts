export interface Question {
    title: string;
    description: string;
    placeholder: string;
    type: string;
    image: string;
    options?: string[];
}

export interface BirthDetails {
    name: string;
    birthDate: string;
    birthTime: string | null;
    birthplace: string;
    email: string;
}

export interface ProgressCardProps {
    currentStep: number;
    totalSteps: number;
    question: Question;
    onNext: (details: Partial<BirthDetails>) => void;
    onPrevious: () => void;
}

export interface StepProps {
    question: Question;
    errors: Record<string, string>;
    onValueChange: (field: string, value: string) => void;
    values: Record<string, string>;
} 