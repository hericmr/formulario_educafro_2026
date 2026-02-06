import React from 'react';
import { useFormContext } from '@/context/FormContext';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, ArrowRight, Save } from 'lucide-react';

export function FormNavigation() {
    const { currentStep, nextStep, prevStep, steps } = useFormContext();
    const isLastStep = currentStep === steps.length - 1;
    const isFirstStep = currentStep === 0;

    return (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 z-10 md:relative md:bg-transparent md:border-none md:p-0 md:mt-8">
            <div className="max-w-4xl mx-auto flex justify-between items-center gap-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={isFirstStep}
                    className={isFirstStep ? 'opacity-0 pointer-events-none' : ''}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar
                </Button>

                {isLastStep ? (
                    <Button type="submit" variant="default" className="bg-green-600 hover:bg-green-700">
                        <Save className="mr-2 h-4 w-4" />
                        Finalizar Entrevista
                    </Button>
                ) : (
                    <Button type="button" onClick={nextStep}>
                        Próximo
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
        </div>
    );
}
