import React from 'react';
import { useFormContext as useRHFContext, Controller } from 'react-hook-form';
import { Label } from '@/components/ui/Label';
import { RadioGroup } from '@/components/ui/RadioGroup';
import { Input } from '@/components/ui/Input';
import { DollarSign, HandCoins } from 'lucide-react';
import { CheckboxGroup } from '@/components/ui/CheckboxGroup';

const RENDA_RANGES = [
    'Até 300,00',
    'De R$ 301,00 a R$ 500,00',
    'De R$ 501,00 a R$ 800,00',
    'De R$ 801,00 a R$ 1.045,00',
    'De R$ 1.046,00 R$ 2080,00',
    'De R$ 2081,00 a R$ 3.120,00',
    'De R$ 3.120,00 a R$ 4.160,00',
    'De R$ 4.161,00 a 5.200,00',
    'Acima de R$ 5.201,00',
    'Outro'
];

const BENEFICIOS_LIST = [
    'Benefício de Prestação Continuada (BPC)',
    'Programa Bolsa Família (PBF)',
    'Programa Nossa Família (PNF)',
    'Programa de Valorização ao Jovem (PVJ)',
    'Viva Leite',
    'Ação Jovem',
    'Renda Cidadã',
    'Outro'
];

export function RendaBeneficios() {
    const { register, formState: { errors }, watch, setValue, control } = useRHFContext();
    const recebeBeneficios = watch('beneficios_recebe') === 'Sim';
    const beneficiosBenefíciosTipo = watch('beneficios_tipo');

    return (
        <div className="form-question-spacing animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Section 13: Renda Familiar */}
            <div className="section-wrapper">
                <div className="section-side-tab">
                    <h2 className="section-title flex items-center gap-2 justify-end">
                        Renda Familiar
                    </h2>
                </div>
                <div className="section-card">
                    <div className="form-question-spacing">
                        <Label htmlFor="renda_familiar">Qual a faixa de renda familiar?</Label>
                        <Controller
                            name="renda_familiar"
                            control={control}
                            render={({ field }) => (
                                <RadioGroup
                                    {...field}
                                    options={RENDA_RANGES}
                                    error={errors.renda_familiar?.message}
                                    columns={2}
                                />
                            )}
                        />
                        {watch('renda_familiar') === 'Outro' && (
                            <div className="mt-4 animate-in fade-in">
                                <Label htmlFor="renda_familiar_outro">Especifique a renda:</Label>
                                <Input
                                    id="renda_familiar_outro"
                                    {...register('renda_familiar_outro')}
                                    placeholder="Valor ou faixa"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Section 14: Benefícios Sociais */}
            <div className="section-wrapper">
                <div className="section-side-tab">
                    <h2 className="section-title flex items-center gap-2 justify-end">
                        Benefícios Sociais
                    </h2>
                </div>
                <div className="section-card">
                    <div className="form-question-spacing">
                        <div className="space-y-2">
                            <Label className="text-base font-semibold">Recebe algum benefício social?</Label>
                            <Controller
                                name="beneficios_recebe"
                                control={control}
                                render={({ field }) => (
                                    <RadioGroup
                                        {...field}
                                        options={['Sim', 'Não']}
                                        error={errors.beneficios_recebe?.message}
                                        columns={2}
                                    />
                                )}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Possui CadÚnico?</Label>
                            <Controller
                                name="beneficios_cadunico"
                                control={control}
                                render={({ field }) => (
                                    <RadioGroup
                                        {...field}
                                        options={['Sim', 'Não']}
                                        columns={2}
                                    />
                                )}
                            />
                        </div>

                        {recebeBeneficios && (
                            <div className="form-question-spacing p-4 bg-primary-50 rounded-xl border border-primary-100 animate-in fade-in">
                                <div className="space-y-2">
                                    <Label>Quais benefícios recebe?</Label>
                                    <Controller
                                        name="beneficios_tipo"
                                        control={control}
                                        render={({ field }) => (
                                            <CheckboxGroup
                                                {...field}
                                                options={BENEFICIOS_LIST}
                                                columns={2}
                                            />
                                        )}
                                    />
                                    {watch('beneficios_tipo')?.includes('Outro') && (
                                        <div className="mt-4 animate-in fade-in">
                                            <Label htmlFor="beneficios_outro">Especifique o benefício:</Label>
                                            <Input
                                                id="beneficios_outro"
                                                {...register('beneficios_outro')}
                                                placeholder="Qual?"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="space-y-2 pt-4 border-t border-app-border">
                            <Label className="text-base font-semibold">A família necessita de cesta básica?</Label>
                            <Controller
                                name="cesta_basica"
                                control={control}
                                render={({ field }) => (
                                    <RadioGroup
                                        {...field}
                                        options={['Sim', 'Não']}
                                        error={errors.cesta_basica?.message}
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
}
