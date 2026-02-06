import React from 'react';
import { useFormContext as useRHFContext, Controller } from 'react-hook-form';
import { Label } from '@/components/ui/Label';
import { RadioGroup } from '@/components/ui/RadioGroup';
import { Users } from 'lucide-react';

export function RacaPronomes() {
    const { control, formState: { errors } } = useRHFContext();

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Section 3: Raça/Cor e Pronomes */}
            <div className="bg-app-surface p-6 rounded-2xl shadow-sm border border-app-border">
                <h2 className="text-2xl font-bold text-primary-800 mb-6 flex items-center gap-2">
                    <Users className="w-6 h-6" />
                    Raça / Cor
                </h2>
                <div className="space-y-8">
                    <div className="space-y-4">
                        <Label className="text-base font-semibold">Como você se autodeclara?</Label>
                        <Controller
                            name="raca_cor"
                            control={control}
                            render={({ field }) => (
                                <RadioGroup
                                    {...field}
                                    options={['Preto/a/e', 'Pardo/a/e', 'Branco/a/e', 'Amarelo/a/e', 'Indígena']}
                                    error={errors.raca_cor?.message}
                                    columns={2}
                                />
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
