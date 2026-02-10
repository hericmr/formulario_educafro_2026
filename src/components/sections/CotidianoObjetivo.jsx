import React from 'react';
import { useFormContext as useRHFContext, Controller } from 'react-hook-form';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { RadioGroup } from '@/components/ui/RadioGroup';
import { CheckboxGroup } from '@/components/ui/CheckboxGroup';
import { Coffee, Rocket, CheckCircle } from 'lucide-react';

export function CotidianoObjetivo() {
    const { register, formState: { errors }, watch, control } = useRHFContext();

    return (
        <div className="form-question-spacing animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Section 18: Cotidiano */}
            <div className="section-wrapper">
                <div className="section-side-tab">
                    <h2 className="section-title flex items-center gap-2 justify-end">
                        Cotidiano
                    </h2>
                </div>
                <div className="section-card">
                    <div className="form-question-spacing">
                        <div className="space-y-2">
                            <Label>Mora sozinho?</Label>
                            <Controller
                                name="cotidiano_mora_com"
                                control={control}
                                render={({ field }) => (
                                    <RadioGroup
                                        {...field}
                                        options={['Sim', 'Não']}
                                        error={errors.cotidiano_mora_com?.message}
                                        columns={2}
                                    />
                                )}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Com quem mora?</Label>
                            <Input {...register('cotidiano_mora_com_quem')} placeholder="Mãe, Pai, Cônjuge, etc." />
                        </div>

                        <div className="space-y-2">
                            <Label>Como é a relação com a sua família?</Label>
                            <Input {...register('cotidiano_relacao')} placeholder="Tranquila, conflituosa, distante..." error={errors.cotidiano_relacao?.message} />
                        </div>

                        <div className="space-y-2">
                            <Label>Histórico Pessoal / Familiar</Label>
                            <textarea
                                className="flex w-full rounded-xl border border-app-border bg-app-surface px-3 py-2 text-sm ring-offset-white placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 min-h-[120px]"
                                placeholder="Conte um pouco sobre sua trajetória, dificuldades e sonhos..."
                                {...register('cotidiano_historico')}
                            ></textarea>
                            {errors.cotidiano_historico && <span className="text-sm text-red-500">{errors.cotidiano_historico.message}</span>}
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 19: Objetivo Educafro */}
            <div className="section-wrapper">
                <div className="section-side-tab">
                    <h2 className="section-title flex items-center gap-2 justify-end">
                        Objetivos com a Educafro
                    </h2>
                </div>
                <div className="section-card">
                    <div className="grid grid-cols-1 md:grid-cols-2 form-grid-spacing">
                        <div className="space-y-2">
                            <Label>Já sabe que curso(s) quer fazer na graduação?</Label>
                            <Input {...register('objetivo_curso')} placeholder="Direito, Medicina, Psicologia..." error={errors.objetivo_curso?.message} />
                        </div>

                        <div className="space-y-2">
                            <Label>Como seus responsáveis se sentiriam se você entrasse na faculdade pública em outro estado?</Label>
                            <Input {...register('objetivo_expectativa')} error={errors.objetivo_expectativa?.message} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Qual o seu objetivo em estudar na Educafro?</Label>
                        <Controller
                            name="objetivo_educafro"
                            control={control}
                            render={({ field }) => (
                                <CheckboxGroup
                                    {...field}
                                    options={[
                                        'Preparatório para vestibular',
                                        'Preparatório para o ENEM',
                                        'Preparatório para o EJA',
                                        'Preparatório para Concursos Públicos',
                                        'Outro'
                                    ]}
                                    error={errors.objetivo_educafro?.message}
                                    columns={2}
                                />
                            )}
                        />
                        {watch('objetivo_educafro')?.includes('Outro') && (
                            <div className="mt-4 animate-in fade-in">
                                <Label htmlFor="objetivo_educafro_outro">Qual o seu objetivo?</Label>
                                <Input
                                    id="objetivo_educafro_outro"
                                    {...register('objetivo_educafro_outro')}
                                    placeholder="Especifique..."
                                />
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Que temas você gostaria que fossem trabalhados coletivamente aqui na Educafro?</Label>
                        <Input {...register('objetivo_temas')} placeholder="Racismo, Política, Saúde Mental..." />
                    </div>

                    <div className="space-y-2">
                        <Label>Como será a frequência na Educafro, em quais dias pretende/poderá comparecer?</Label>
                        <Controller
                            name="objetivo_frequencia"
                            control={control}
                            render={({ field }) => (
                                <RadioGroup
                                    {...field}
                                    options={[
                                        'Sábados',
                                        'Dias de semana',
                                        'Intercalar entre dias de semana e fim de semana',
                                        'Outro'
                                    ]}
                                    error={errors.objetivo_frequencia?.message}
                                    columns={2}
                                />
                            )}
                        />
                        {watch('objetivo_frequencia') === 'Outro' && (
                            <div className="mt-4 animate-in fade-in">
                                <Label htmlFor="objetivo_frequencia_outro">Especifique a frequência:</Label>
                                <Input
                                    id="objetivo_frequencia_outro"
                                    {...register('objetivo_frequencia_outro')}
                                    placeholder="Quais dias?"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
