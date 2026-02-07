import React from 'react';
import { useFormContext } from '@/context/FormContext';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export function StepIndicator() {
    const { currentStep, setCurrentStep, steps } = useFormContext();

    const handleJumpToStep = (index) => {
        setCurrentStep(index);
        const element = document.getElementById(steps[index].id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <nav className="w-full">
            {/* Desktop / Vertical Sidebar View */}
            <div className="hidden md:flex flex-col space-y-0 relative">
                {/* Connecting Line Background */}
                <div className="absolute left-[19px] top-6 bottom-6 w-0.5 bg-gray-200 -z-10"></div>

                {/* Progress Line */}
                <div
                    className="absolute left-[19px] top-6 w-0.5 bg-primary-600 -z-10 transition-all duration-500"
                    style={{ height: `${Math.max(0, (currentStep / (steps.length - 1)) * 100 - 5)}%` }} // Approximate progress height
                ></div>

                {steps.map((step, index) => {
                    const isCompleted = index < currentStep;
                    const isCurrent = index === currentStep;

                    return (
                        <button
                            key={step.id}
                            onClick={() => handleJumpToStep(index)}
                            className={cn(
                                "group flex items-center gap-4 py-3 text-left w-full focus:outline-none transition-colors rounded-lg px-2",
                                isCurrent ? "bg-primary-50" : "hover:bg-gray-50"
                            )}
                        >
                            <div
                                className={cn(
                                    "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-10 bg-white",
                                    isCompleted ? "border-primary-600 bg-primary-600 text-white" :
                                        isCurrent ? "border-primary-600 text-primary-600 shadow-md transform scale-105" :
                                            "border-gray-300 text-gray-400 group-hover:border-primary-300"
                                )}
                            >
                                {isCompleted ? <Check className="w-5 h-5" /> : <span className="text-sm font-bold">{index + 1}</span>}
                            </div>

                            <div className="flex flex-col">
                                <span
                                    className={cn(
                                        "text-sm font-medium transition-colors duration-300",
                                        isCurrent ? "text-primary-800 font-bold" : "text-gray-500 group-hover:text-primary-600"
                                    )}
                                >
                                    {step.title}
                                </span>
                                {isCurrent && <span className="text-xs text-primary-500 font-medium animate-in fade-in">Em preenchimento</span>}
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Mobile / Simple View */}
            <div className="md:hidden flex items-center justify-between py-2 px-4 bg-white border-b border-gray-100">
                <button
                    disabled={currentStep === 0}
                    onClick={() => handleJumpToStep(currentStep - 1)}
                    className="text-sm font-medium text-gray-500 disabled:opacity-30 disabled:cursor-not-allowed hover:text-primary-600"
                >
                    Anterior
                </button>

                <div className="flex flex-col items-center">
                    <span className="text-xs font-semibold text-primary-600 uppercase tracking-wider">Passo {currentStep + 1} de {steps.length}</span>
                    <span className="text-sm font-bold text-gray-800">{steps[currentStep].title}</span>
                </div>

                <button
                    disabled={currentStep === steps.length - 1}
                    onClick={() => handleJumpToStep(currentStep + 1)}
                    className="text-sm font-medium text-primary-600 disabled:opacity-30 disabled:cursor-not-allowed hover:text-primary-700"
                >
                    Próximo
                </button>
            </div>
        </nav>
    );
}
