import React from 'react';
import { useFormContext as useRHFContext, Controller } from 'react-hook-form';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { RadioGroup } from '@/components/ui/RadioGroup';
import { Users2 } from 'lucide-react';

const VINCULO_OPTIONS = [
    'Mãe',
    'Pai',
    'Mãe adotiva',
    'Pai adotivo',
    'Madrasta',
    'Padrasto',
    'Irmão',
    'Irmã',
    'Meio-irmão',
    'Meia-irmã',
    'Irmão adotivo',
    'Irmã adotiva',
    'Cônjuge',
    'Companheiro(a)',
    'Sogra',
    'Genro',
    'Nora',
    'Filho',
    'Filha',
    'Neto',
    'Neta',
    'Bisneto',
    'Bisneta',
    'Avô',
    'Avó',
    'Tio',
    'Tia',
    'Primo',
    'Prima',
    'Tutor(a)',
    'Guardião(ã)',
    'Parente distante',
    'Cunhado(a)',
    'Outro (por favor, especifique)',
    'Não tenho vínculo familiar relevante',
    'Não'
];

export function VinculoFamiliar() {
    const { register, formState: { errors }, watch, control } = useRHFContext();
    const temFamiliar = watch('familiar_nucleo') === 'Sim';

    return (
        <div className="form-question-spacing animate-in fade-in slide-in-from-bottom-4 duration-500">

            <div className="section-wrapper">
                <div className="section-side-tab">
                    <h2 className="section-title flex items-center gap-2 justify-end">
                        Vínculo Familiar no Núcleo
                    </h2>
                </div>
                <div className="section-card">
                    <div className="form-question-spacing">
                        <Label className="text-base font-semibold text-gray-800">Possui familiar estudando/matriculado no núcleo?</Label>
                        <Controller
                            name="familiar_nucleo"
                            control={control}
                            render={({ field }) => (
                                <RadioGroup
                                    {...field}
                                    options={['Sim', 'Não']}
                                    error={errors.familiar_nucleo?.message}
                                    columns={2}
                                />
                            )}
                        />

                        {temFamiliar && (
                            <div className="form-question-spacing p-4 bg-primary-50 rounded-xl border border-primary-100 animate-in fade-in slide-in-from-top-2">
                                <div className="space-y-2">
                                    <Label htmlFor="vinculo_familiar">Qual o vínculo?</Label>
                                    <Controller
                                        name="vinculo_familiar"
                                        control={control}
                                        render={({ field }) => (
                                            <RadioGroup
                                                {...field}
                                                options={VINCULO_OPTIONS}
                                                error={errors.vinculo_familiar?.message}
                                                columns={2}
                                            />
                                        )}
                                    />
                                    {watch('vinculo_familiar') === 'Outro (por favor, especifique)' && (
                                        <div className="mt-4 animate-in fade-in">
                                            <Label htmlFor="vinculo_familiar_outro">Especifique o vínculo:</Label>
                                            <Input
                                                id="vinculo_familiar_outro"
                                                {...register('vinculo_familiar_outro')}
                                                placeholder="Qual o parentesco?"
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="nome_familiar">Nome completo do familiar</Label>
                                    <Input id="nome_familiar" {...register('nome_familiar')} error={errors.nome_familiar?.message} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
