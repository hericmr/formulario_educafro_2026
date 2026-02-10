import React from 'react';
import { useFormContext as useRHFContext, Controller } from 'react-hook-form';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { RadioGroup } from '@/components/ui/RadioGroup';
import { Home, Wifi } from 'lucide-react';

export function MoradiaInternet() {
    const { register, formState: { errors }, watch, control } = useRHFContext();
    const temInternet = watch('internet_tem') === 'Sim';

    return (
        <div className="form-question-spacing animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Section 10: Moradia */}
            <div className="section-wrapper">
                <div className="section-side-tab">
                    <h2 className="section-title flex items-center gap-2 justify-end">
                        Moradia
                    </h2>
                </div>
                <div className="section-card">
                    <div className="form-question-spacing">
                        <div className="space-y-2">
                            <Label htmlFor="moradia_condicao">Condição da Moradia</Label>
                            <Controller
                                name="moradia_condicao"
                                control={control}
                                render={({ field }) => (
                                    <RadioGroup
                                        {...field}
                                        options={['Própria', 'Alugada', 'Cedida', 'Outro']}
                                        error={errors.moradia_condicao?.message}
                                        columns={4}
                                    />
                                )}
                            />
                            {watch('moradia_condicao') === 'Outro' && (
                                <div className="mt-4 animate-in fade-in">
                                    <Label htmlFor="moradia_condicao_outro">Especifique a condição:</Label>
                                    <Input
                                        id="moradia_condicao_outro"
                                        {...register('moradia_condicao_outro')}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="moradia_tipo">Tipo de Construção</Label>
                            <Controller
                                name="moradia_tipo"
                                control={control}
                                render={({ field }) => (
                                    <RadioGroup
                                        {...field}
                                        options={['Alvenaria', 'Madeira', 'Mista', 'Outro']}
                                        error={errors.moradia_tipo?.message}
                                        columns={4}
                                    />
                                )}
                            />
                            {watch('moradia_tipo') === 'Outro' && (
                                <div className="mt-4 animate-in fade-in">
                                    <Label htmlFor="moradia_tipo_outro">Especifique o tipo:</Label>
                                    <Input
                                        id="moradia_tipo_outro"
                                        {...register('moradia_tipo_outro')}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 11: Internet */}
            <div className="section-wrapper">
                <div className="section-side-tab">
                    <h2 className="section-title flex items-center gap-2 justify-end">
                        Acesso à Internet
                    </h2>
                </div>
                <div className="section-card">
                    <div className="form-question-spacing">
                        <Label className="text-base font-semibold text-gray-800">Possui acesso à internet?</Label>
                        <Controller
                            name="internet_tem"
                            control={control}
                            render={({ field }) => (
                                <RadioGroup
                                    {...field}
                                    options={['Sim', 'Não']}
                                    error={errors.internet_tem?.message}
                                    columns={2}
                                />
                            )}
                        />

                        {temInternet && (
                            <div className="form-question-spacing mt-4 p-4 bg-primary-50 rounded-xl border border-primary-100 animate-in fade-in slide-in-from-top-2">
                                <div className="space-y-2">
                                    <Label htmlFor="internet_tipo">Qual o tipo de conexão?</Label>
                                    <Controller
                                        name="internet_tipo"
                                        control={control}
                                        render={({ field }) => (
                                            <RadioGroup
                                                {...field}
                                                options={['Dados Móveis (Celular)', 'Wi-Fi (Banda Larga)', 'Outro']}
                                                error={errors.internet_tipo?.message}
                                                columns={3}
                                            />
                                        )}
                                    />
                                    {watch('internet_tipo') === 'Outro' && (
                                        <div className="mt-4 animate-in fade-in">
                                            <Label htmlFor="internet_tipo_outro">Especifique:</Label>
                                            <Input
                                                id="internet_tipo_outro"
                                                {...register('internet_tipo_outro')}
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="internet_sinal">O sinal é estável?</Label>
                                    <Controller
                                        name="internet_sinal"
                                        control={control}
                                        render={({ field }) => (
                                            <RadioGroup
                                                {...field}
                                                options={['Sim', 'Não', 'Outro']}
                                                error={errors.internet_sinal?.message}
                                                columns={3}
                                            />
                                        )}
                                    />
                                    {watch('internet_sinal') === 'Outro' && (
                                        <div className="mt-4 animate-in fade-in">
                                            <Label htmlFor="internet_sinal_outro">Especifique:</Label>
                                            <Input
                                                id="internet_sinal_outro"
                                                {...register('internet_sinal_outro')}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
}
