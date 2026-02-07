import React, { useEffect } from 'react';
import { useFormContext as useRHFContext, Controller } from 'react-hook-form';
import { Label } from '@/components/ui/Label';
import { RadioGroup } from '@/components/ui/RadioGroup';
import { Input } from '@/components/ui/Input';
import { ASSISTENTES_SOCIAIS } from '@/lib/constants';

export function Identificacao() {
    const { register, formState: { errors }, setValue, watch, control } = useRHFContext();

    // Set default date to today if empty
    useEffect(() => {
        setValue('data_entrevista', new Date().toISOString().split('T')[0]);
    }, [setValue]);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-app-surface p-6 rounded-2xl shadow-sm border border-app-border">
                <h2 className="text-2xl font-bold text-primary-800 mb-4">Identificação da Entrevista</h2>
                <p className="text-gray-600 mb-6">Preencha os dados de quem está realizando a entrevista.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="entrevistador">Nome da(o) Assistente Social</Label>
                        <Controller
                            name="entrevistador"
                            control={control}
                            render={({ field }) => (
                                <RadioGroup
                                    {...field}
                                    options={ASSISTENTES_SOCIAIS}
                                    error={errors.entrevistador?.message}
                                    columns={2}
                                />
                            )}
                        />
                        {watch('entrevistador') === 'Outro' && (
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

                    <div className="space-y-2">
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
        </div>
    );
}
