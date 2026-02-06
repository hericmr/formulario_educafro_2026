import React from 'react';
import { useFormContext as useRHFContext, Controller } from 'react-hook-form';
import { Label } from '@/components/ui/Label';
import { RadioGroup } from '@/components/ui/RadioGroup';
import { Home, Wifi } from 'lucide-react';

export function MoradiaInternet() {
    const { register, formState: { errors }, watch, control } = useRHFContext();
    const temInternet = watch('internet_tem') === 'Sim';

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Section 10: Moradia */}
            <div className="bg-app-surface p-6 rounded-2xl shadow-sm border border-app-border">
                <h2 className="text-2xl font-bold text-primary-800 mb-4 flex items-center gap-2">
                    <Home className="w-6 h-6" />
                    Moradia
                </h2>

                <div className="space-y-6">
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
                    </div>
                </div>
            </div>

            {/* Section 11: Internet */}
            <div className="bg-app-surface p-6 rounded-2xl shadow-sm border border-app-border">
                <h2 className="text-2xl font-bold text-primary-800 mb-4 flex items-center gap-2">
                    <Wifi className="w-6 h-6" />
                    Acesso à Internet
                </h2>

                <div className="space-y-4">
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
                        <div className="space-y-6 mt-4 p-4 bg-primary-50 rounded-xl border border-primary-100 animate-in fade-in slide-in-from-top-2">
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
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}
