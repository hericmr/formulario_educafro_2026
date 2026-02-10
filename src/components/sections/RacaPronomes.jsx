import React from 'react';
import { useFormContext as useRHFContext, Controller } from 'react-hook-form';
import { Label } from '@/components/ui/Label';
import { RadioGroup } from '@/components/ui/RadioGroup';
import { Users } from 'lucide-react';
import { RACA_COR } from '@/constants/options';

export const RacaPronomes = React.memo(function RacaPronomes() {
    const { control, formState: { errors } } = useRHFContext();

    return (
        <div className="form-question-spacing animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Section 3: Raça/Cor e Pronomes */}
            <div className="section-wrapper">
                <div className="section-side-tab">
                    <h2 className="section-title flex items-center gap-2 justify-end">
                        Raça / Cor
                    </h2>
                </div>
                <div className="section-card">
                    <div className="form-question-spacing">
                        <div className="form-question-spacing">
                            <Label className="text-base font-semibold">Como você se autodeclara?</Label>
                            <Controller
                                name="raca_cor"
                                control={control}
                                render={({ field }) => (
                                    <RadioGroup
                                        {...field}
                                        options={RACA_COR}
                                        error={errors.raca_cor?.message}
                                        columns={2}
                                    />
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});
