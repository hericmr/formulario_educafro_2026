import React, { useEffect } from 'react';
import { useFormContext as useRHFContext, Controller } from 'react-hook-form';
import { Label } from '@/components/ui/Label';
import { RadioGroup } from '@/components/ui/RadioGroup';
import { CheckboxGroup } from '@/components/ui/CheckboxGroup';
import { Input } from '@/components/ui/Input';
import { ASSISTENTES_SOCIAIS } from '@/constants/options';

export const Identificacao = React.memo(function Identificacao() {
    const { register, formState: { errors }, setValue, watch, control } = useRHFContext();

    // Set default date to today if empty
    useEffect(() => {
        setValue('data_entrevista', new Date().toISOString().split('T')[0]);
    }, [setValue]);

    return (
        <section
            className="section-wrapper animate-in fade-in slide-in-from-bottom-4 duration-500"
            role="region"
            aria-labelledby="identificacao-title"
        >
            <div className="section-side-tab">
                <h2 id="identificacao-title" className="section-title">Identificação</h2>
            </div>

            <div className="section-card">
                <div className="grid grid-cols-1 md:grid-cols-2 form-grid-spacing">
                    <div className="form-field-spacing">
                        <Label htmlFor="entrevistador">Nome(s) da(o)(s) Responsável(is) pela Entrevista</Label>
                        <Controller
                            name="entrevistador"
                            control={control}
                            render={({ field }) => (
                                <CheckboxGroup
                                    {...field}
                                    options={ASSISTENTES_SOCIAIS}
                                    error={errors.entrevistador?.message}
                                    columns={2}
                                />
                            )}
                        />
                        {watch('entrevistador')?.includes('Outro') && (
                            <div className="mt-4 animate-in fade-in">
                                <Label htmlFor="entrevistador_outro">Qual Nome?</Label>
                                <Input
                                    id="entrevistador_outro"
                                    {...register('entrevistador_outro')}
                                    placeholder="Nome do assistente"
                                />
                            </div>
                        )}
                    </div>

                    <div className="form-field-spacing">
                        <Label htmlFor="data_entrevista">Data da Entrevista</Label>
                        <Input
                            id="data_entrevista"
                            type="date"
                            {...register('data_entrevista')}
                            error={errors.data_entrevista?.message}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
});
