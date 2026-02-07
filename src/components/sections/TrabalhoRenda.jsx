import React from 'react';
import { useFormContext as useRHFContext, Controller } from 'react-hook-form';
import { Label } from '@/components/ui/Label';
import { RadioGroup } from '@/components/ui/RadioGroup';
import { Input } from '@/components/ui/Input';
import { Briefcase, AlertTriangle } from 'lucide-react';

export function TrabalhoRenda() {
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
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

            <div className="bg-app-surface p-6 rounded-2xl shadow-sm border border-app-border">
                <h2 className="text-2xl font-bold text-primary-800 mb-4 flex items-center gap-2">
                    <Briefcase className="w-6 h-6" />
                    Trabalho e Renda
                </h2>

                <div className="space-y-6">
                    {/* Q1 */}
                    <div className="space-y-2">
                        <Label className="text-base font-semibold">1. Na última semana, realizou alguma atividade que gerou renda?</Label>
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
                    <div className="space-y-2 pt-4 border-t border-app-border">
                        <Label className="text-base font-semibold">2. Na última semana, ajudou familiar em atividade produtiva sem pagamento?</Label>
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
                        <div className="space-y-6 p-4 bg-primary-50 rounded-xl border border-primary-100 animate-in fade-in">

                            {/* Q3 */}
                            <div className="space-y-2">
                                <Label htmlFor="trabalho_vinculo">3. Tipo de vínculo ou atividade principal</Label>
                                <Controller
                                    name="trabalho_vinculo"
                                    control={control}
                                    render={({ field }) => (
                                        <RadioGroup
                                            {...field}
                                            options={['Estágio/Bolsa', 'Registrado CLT', 'Registrado PJ', 'Autônomo', 'Outro']}
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
                            <div className="space-y-2">
                                <Label htmlFor="trabalho_horario">4. Horário de trabalho</Label>
                                <div className="flex items-center gap-2">
                                    <Input type="time" {...register('trabalho_horario_inicio')} className="w-32" />
                                    <span className="text-gray-600">até</span>
                                    <Input type="time" {...register('trabalho_horario_fim')} className="w-32" />
                                </div>
                                {isNightShift() && (
                                    <div className="mt-2 flex items-center gap-2 text-amber-600 bg-amber-50 p-2 rounded-lg text-sm border border-amber-200">
                                        <AlertTriangle className="w-4 h-4" />
                                        <span>Atenção: Trabalho noturno identificado (22h - 5h).</span>
                                    </div>
                                )}
                            </div>

                            {/* Q5 */}
                            <div className="space-y-2">
                                <Label htmlFor="trabalho_uso_dinheiro">5. Principal uso do dinheiro</Label>
                                <Controller
                                    name="trabalho_uso_dinheiro"
                                    control={control}
                                    render={({ field }) => (
                                        <RadioGroup
                                            {...field}
                                            options={['Gastos pessoais', 'Estudos', 'Despesas da casa', 'Principal responsável pelo sustento da casa.']}
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
    );
}
