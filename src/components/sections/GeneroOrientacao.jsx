import React from 'react';
import { useFormContext as useRHFContext, Controller } from 'react-hook-form';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { RadioGroup } from '@/components/ui/RadioGroup';
import { Flag, Heart } from 'lucide-react';
import { GENERO, ORIENTACAO_SEXUAL } from '@/constants/options';

export const GeneroOrientacao = React.memo(function GeneroOrientacao() {
    const { register, formState: { errors }, watch, control } = useRHFContext();
    const orientacao = watch('orientacao_sexual');

    return (
        <div className="form-question-spacing animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Section 5: Identidade de Gênero */}
            <div className="section-wrapper">
                <div className="section-side-tab">
                    <h2 className="section-title flex items-center gap-2 justify-end">
                        Identidade de Gênero
                    </h2>
                </div>
                <div className="section-card">
                    <div className="form-question-spacing">
                        <div className="form-field-spacing">
                            <Label className="text-base font-semibold text-gray-800">Qual é sua identidade de gênero?</Label>
                            <Controller
                                name="genero"
                                control={control}
                                render={({ field }) => (
                                    <RadioGroup
                                        {...field}
                                        options={GENERO}
                                        error={errors.genero?.message}
                                        columns={2}
                                    />
                                )}
                            />
                            {watch('genero') === 'Outro' && (
                                <div className="mt-4 animate-in fade-in">
                                    <Label htmlFor="genero_outro">Especifique o gênero:</Label>
                                    <Input
                                        id="genero_outro"
                                        {...register('genero_outro')}
                                        placeholder="Como você se identifica?"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="form-field-spacing pt-4 border-t border-app-border">
                            <Label className="text-base font-semibold text-gray-800">Você é pessoa trans ou travesti?</Label>
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
            </div>

            {/* Section 6: Orientação Sexual */}
            <div className="section-wrapper">
                <div className="section-side-tab">
                    <h2 className="section-title flex items-center gap-2 justify-end">
                        Orientação Sexual
                    </h2>
                </div>
                <div className="section-card">
                    <div className="form-question-spacing">
                        <Label className="text-base font-semibold text-gray-800">Qual sua orientação sexual?</Label>
                        <Label className="text-base text-gray-600 font-normal block mb-2">(Refere-se às relações afetivo-sexuais)</Label>
                        <Controller
                            name="orientacao_sexual"
                            control={control}
                            render={({ field }) => (
                                <RadioGroup
                                    {...field}
                                    options={ORIENTACAO_SEXUAL}
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
        </div>
    );
});
