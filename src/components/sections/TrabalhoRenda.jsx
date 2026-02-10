import React from 'react';
import { useFormContext as useRHFContext, Controller } from 'react-hook-form';
import { Label } from '@/components/ui/Label';
import { RadioGroup } from '@/components/ui/RadioGroup';
import { Input } from '@/components/ui/Input';
import { Briefcase, AlertTriangle } from 'lucide-react';
import { VINCULO_TRABALHO, USO_DINHEIRO } from '@/constants/options';

export const TrabalhoRenda = React.memo(function TrabalhoRenda() {
    const { register, formState: { errors }, watch, control } = useRHFContext();
    const trabalhouSemana = watch('trabalho_renda_semana');
    const ajudaFamiliar = watch('trabalho_ajuda_familiar');

    const isWorking = trabalhouSemana === 'Sim' || ajudaFamiliar === 'Sim';

    // Night shift check
    const timeStart = watch('trabalho_horario_inicio');
    const timeEnd = watch('trabalho_horario_fim');

    const isNightShift = () => {
        if (!timeStart || !timeEnd) return false;
        // Simple string check for prototyping, stricter parsing needed for prod
        const startHour = parseInt(timeStart.split(':')[0]);
        const endHour = parseInt(timeEnd.split(':')[0]);
        return (startHour >= 22 || startHour <= 5) || (endHour >= 22 || endHour <= 5);
    };

    return (
        <div className="form-question-spacing animate-in fade-in slide-in-from-bottom-4 duration-500">

            <div className="section-wrapper">
                <div className="section-side-tab">
                    <h2 className="section-title flex items-center gap-2 justify-end">
                        Trabalho e Renda
                    </h2>
                </div>
                <div className="section-card">
                    <div className="form-question-spacing">
                        {/* Q1 */}
                        <div className="form-field-spacing">
                            <Label className="text-base font-semibold">1. Na última semana, realizou alguma atividade que gerou renda (formal ou informal)?</Label>
                            <Controller
                                name="trabalho_renda_semana"
                                control={control}
                                render={({ field }) => (
                                    <RadioGroup
                                        {...field}
                                        options={['Sim', 'Não']}
                                        error={errors.trabalho_renda_semana?.message}
                                        columns={2}
                                    />
                                )}
                            />
                        </div>

                        {/* Q2 */}
                        <div className="form-field-spacing pt-4 border-t border-app-border">
                            <Label className="text-base font-semibold">2. Na última semana, ajudou algum familiar em atividade produtiva sem receber pagamento?</Label>
                            <Controller
                                name="trabalho_ajuda_familiar"
                                control={control}
                                render={({ field }) => (
                                    <RadioGroup
                                        {...field}
                                        options={['Sim', 'Não']}
                                        error={errors.trabalho_ajuda_familiar?.message}
                                        columns={2}
                                    />
                                )}
                            />
                        </div>

                        {/* If Working Conditional */}
                        {isWorking && (
                            <div className="form-question-spacing p-4 bg-primary-50 rounded-xl border border-primary-100 animate-in fade-in">

                                {/* Q3 */}
                                <div className="form-field-spacing">
                                    <Label htmlFor="trabalho_vinculo">3. Tipo de vínculo ou atividade principal</Label>
                                    <Controller
                                        name="trabalho_vinculo"
                                        control={control}
                                        render={({ field }) => (
                                            <RadioGroup
                                                {...field}
                                                options={VINCULO_TRABALHO}
                                                error={errors.trabalho_vinculo?.message}
                                                columns={2}
                                            />
                                        )}
                                    />
                                    {watch('trabalho_vinculo') === 'Outro' && (
                                        <div className="mt-4 animate-in fade-in">
                                            <Label htmlFor="trabalho_vinculo_outro">Especifique o vínculo:</Label>
                                            <Input
                                                id="trabalho_vinculo_outro"
                                                {...register('trabalho_vinculo_outro')}
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Q4 */}
                                <div className="form-field-spacing">
                                    <Label htmlFor="trabalho_horario">4. Horário de trabalho</Label>
                                    <div className="flex items-center gap-2">
                                        <Input type="time" {...register('trabalho_horario_inicio')} className="w-32" />
                                        <span className="text-gray-600">até</span>
                                        <Input type="time" {...register('trabalho_horario_fim')} className="w-32" />
                                    </div>
                                    {isNightShift() && (
                                        <div className="mt-2 flex items-center gap-2 text-secondary-700 bg-secondary-50 p-2 rounded-lg text-sm border border-secondary-200">
                                            <AlertTriangle className="w-4 h-4" />
                                            <span>Atenção: Trabalho noturno identificado (22h - 5h).</span>
                                        </div>
                                    )}
                                </div>

                                {/* Q5 */}
                                <div className="form-field-spacing">
                                    <Label htmlFor="trabalho_uso_dinheiro">5. Principal uso do dinheiro</Label>
                                    <Controller
                                        name="trabalho_uso_dinheiro"
                                        control={control}
                                        render={({ field }) => (
                                            <RadioGroup
                                                {...field}
                                                options={USO_DINHEIRO}
                                                error={errors.trabalho_uso_dinheiro?.message}
                                                columns={2}
                                            />
                                        )}
                                    />
                                </div>

                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
});
