import React from 'react';
import { useFormContext as useRHFContext, Controller } from 'react-hook-form';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { RadioGroup } from '@/components/ui/RadioGroup';
import { Flag, Heart } from 'lucide-react';

export function GeneroOrientacao() {
    const { register, formState: { errors }, watch, control } = useRHFContext();
    const orientacao = watch('orientacao_sexual');

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Section 5: Identidade de Gênero */}
            <div className="bg-app-surface p-6 rounded-2xl shadow-sm border border-app-border">
                <h2 className="text-2xl font-bold text-primary-800 mb-4 flex items-center gap-2">
                    <Flag className="w-6 h-6" />
                    Identidade de Gênero
                </h2>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label className="text-base font-semibold text-gray-800">1. Gênero / Identidade de Gênero</Label>
                        <Controller
                            name="genero"
                            control={control}
                            render={({ field }) => (
                                <RadioGroup
                                    {...field}
                                    options={['Feminina', 'Masculina', 'Não binárie', 'Outro']}
                                    error={errors.genero?.message}
                                    columns={2}
                                />
                            )}
                        />
                    </div>

                    <div className="space-y-2 pt-4 border-t border-app-border">
                        <Label className="text-base font-semibold text-gray-800">2. Você é pessoa trans ou travesti?</Label>
                        <Controller
                            name="trans_travesti"
                            control={control}
                            render={({ field }) => (
                                <RadioGroup
                                    {...field}
                                    options={['Sim', 'Não']}
                                    error={errors.trans_travesti?.message}
                                    columns={2}
                                />
                            )}
                        />
                    </div>
                </div>
            </div>

            {/* Section 6: Orientação Sexual */}
            <div className="bg-app-surface p-6 rounded-2xl shadow-sm border border-app-border">
                <h2 className="text-2xl font-bold text-primary-800 mb-4 flex items-center gap-2">
                    <Heart className="w-6 h-6" />
                    Orientação Sexual
                </h2>

                <div className="space-y-4">
                    <Label className="text-base text-gray-600 font-normal block mb-2">(Termo relativo às relações afetivo-sexuais)</Label>
                    <Controller
                        name="orientacao_sexual"
                        control={control}
                        render={({ field }) => (
                            <RadioGroup
                                {...field}
                                options={['Lésbica', 'Gay', 'Bissexual', 'Heterossexual', 'Outra', 'Prefiro não declarar']}
                                error={errors.orientacao_sexual?.message}
                                columns={2}
                            />
                        )}
                    />

                    {orientacao === 'Outra' && (
                        <div className="mt-4 animate-in fade-in">
                            <Label htmlFor="orientacao_sexual_outra">Qual?</Label>
                            <Input
                                id="orientacao_sexual_outra"
                                {...register('orientacao_sexual_outra')}
                                error={errors.orientacao_sexual_outra?.message}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
