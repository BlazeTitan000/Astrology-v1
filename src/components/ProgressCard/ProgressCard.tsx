import React from 'react';
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Progress } from "../ui/progress";

interface Question {
  title: string;
  description: string;
  placeholder: string;
  type?: string;
  options?: string[];
  image?: string;
}

interface ProgressCardProps {
  currentStep: number;
  totalSteps: number;
  question: Question;
  onNext: () => void;
}

export const ProgressCard = ({ currentStep, totalSteps, question, onNext }: ProgressCardProps) => {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="max-w-[561px] mx-auto">
      <Progress value={progress} className="mb-4" />

      <Card className="w-full rounded-[28px] bg-white shadow-lg overflow-hidden">
        <CardContent className="p-8">
          {question.image && (
            <div className="mb-6">
              <img src={question.image} alt="" className="w-full h-48 object-cover rounded-lg" />
            </div>
          )}

          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-semibold text-gray-900">
              {question.title}
            </h3>

            <p className="text-gray-600 text-sm">
              {question.description}
            </p>
          </div>

          <div className="mt-8">
            {question.type === 'select' && question.options ? (
              <select className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                <option value="" disabled selected>Select an option</option>
                {question.options.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            ) : (
              <Input
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder={question.placeholder}
                type={question.type || 'text'}
              />
            )}
          </div>

          <div className="mt-8">
            <Button 
              className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-medium text-lg transition-colors"
              onClick={onNext}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};