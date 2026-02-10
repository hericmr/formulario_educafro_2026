import React from 'react';
import { useFormContext as useRHFContext, Controller } from 'react-hook-form';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { RadioGroup } from '@/components/ui/RadioGroup';
import { Baby, Car, Stethoscope } from 'lucide-react';
import { SERVICOS_SUS, TIPO_SANGUINEO, FILHOS_QTY, VEICULO_PROPRIO, MEIO_TRANSPORTE, AUXILIO_TRANSPORTE, PLANO_SAUDE, SAUDE_PSICOTERAPIA } from '@/constants/options';
import { CheckboxGroup } from '@/components/ui/CheckboxGroup';

export const FamiliaTransporteSaude = React.memo(function FamiliaTransporteSaude() {
    const { register, formState: { errors }, watch, setValue, control } = useRHFContext();
    const saudePlano = watch('saude_plano');
    const saudeServicos = watch('saude_servicos');
    const saudePsicoterapia = watch('saude_psicoterapia');
    const saudeDeficiencia = watch('saude_deficiencia');
    const saudeFamiliarDeficiencia = watch('saude_familiar_deficiencia');
    const saudeProblemas = watch('saude_problemas');
    const saudeAlergias = watch('saude_alergias');
    const saudeMedicamentos = watch('saude_medicamentos');
    const saudeSubstancias = watch('saude_substancias');

    return (
        <div className="form-question-spacing animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Section 15: Filhos e Responsabilidades */}
            <div className="section-wrapper">
                <div className="section-side-tab">
                    <h2 className="section-title flex items-center gap-2 justify-end">
                        Filhos e Responsabilidades
                    </h2>
                </div>
                <div className="section-card">
                    <div className="form-question-spacing">
                        <div className="grid grid-cols-1 md:grid-cols-3 form-grid-spacing">
                            <div className="form-field-spacing">
                                <Label>Possui filhos?</Label>
                                <Controller
                                    name="filhos_tem"
                                    control={control}
                                    render={({ field }) => (
                                        <RadioGroup
                                            {...field}
                                            options={FILHOS_QTY}
                                            error={errors.filhos_tem?.message}
                                            columns={2}
                                        />
                                    )}
                                />
                            </div>
                            <div className="form-field-spacing">
                                <Label>Paga pensão alimentícia?</Label>
                                <Controller
                                    name="pensao_paga"
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
                            <div className="form-field-spacing">
                                <Label>Recebe pensão alimentícia?</Label>
                                <Controller
                                    name="pensao_recebe"
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
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 16: Transporte */}
            <div className="section-wrapper">
                <div className="section-side-tab">
                    <h2 className="section-title flex items-center gap-2 justify-end">
                        Transporte
                    </h2>
                </div>
                <div className="section-card">
                    <div className="grid grid-cols-1 form-grid-spacing">
                        <div className="form-field-spacing">
                            <Label>Possui veículo próprio?</Label>
                            <Controller
                                name="transporte_veiculo"
                                control={control}
                                render={({ field }) => (
                                    <RadioGroup
                                        {...field}
                                        options={VEICULO_PROPRIO}
                                        error={errors.transporte_veiculo?.message}
                                        columns={4}
                                    />
                                )}
                            />
                        </div>

                        <div className="form-field-spacing">
                            <Label>Como vai à Educafro?</Label>
                            <Controller
                                name="transporte_meio"
                                control={control}
                                render={({ field }) => (
                                    <RadioGroup
                                        {...field}
                                        options={MEIO_TRANSPORTE}
                                        error={errors.transporte_meio?.message}
                                        columns={2}
                                    />
                                )}
                            />
                            {watch('transporte_meio') === 'Outro' && (
                                <div className="mt-4 animate-in fade-in">
                                    <Label htmlFor="transporte_meio_outro">Especifique o meio de transporte:</Label>
                                    <Input
                                        id="transporte_meio_outro"
                                        {...register('transporte_meio_outro')}
                                        placeholder="Qual?"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="form-field-spacing">
                            <Label>Necessita auxílio transporte?</Label>
                            <Controller
                                name="transporte_auxilio"
                                control={control}
                                render={({ field }) => (
                                    <RadioGroup
                                        {...field}
                                        options={AUXILIO_TRANSPORTE}
                                        error={errors.transporte_auxilio?.message}
                                        columns={3}
                                    />
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 17: Saúde */}
            <div className="section-wrapper">
                <div className="section-side-tab">
                    <h2 className="section-title flex items-center gap-2 justify-end">
                        Saúde
                    </h2>
                </div>
                <div className="section-card">
                    <div className="form-question-spacing">
                        <div className="form-question-spacing">
                            <div className="form-field-spacing">
                                <Label>Você utiliza os serviços do SUS, possui plano de saúde ou ambos?</Label>
                                <Controller
                                    name="saude_plano"
                                    control={control}
                                    render={({ field }) => (
                                        <RadioGroup
                                            {...field}
                                            options={PLANO_SAUDE}
                                            error={errors.saude_plano?.message}
                                            columns={3}
                                        />
                                    )}
                                />
                            </div>

                            {(saudePlano === 'Apenas SUS' || saudePlano === 'Uso os dois') && (
                                <div className="form-field-spacing bg-app-surfaceHover p-4 rounded-lg">
                                    <Label>Você utiliza algum dos seguintes serviços do SUS? (Múltipla escolha)</Label>
                                    <Controller
                                        name="saude_servicos"
                                        control={control}
                                        render={({ field }) => (
                                            <CheckboxGroup
                                                {...field}
                                                options={SERVICOS_SUS}
                                                error={errors.saude_servicos?.message}
                                                columns={2}
                                            />
                                        )}
                                    />
                                    {errors.saude_servicos && <p className="text-error text-sm mt-1">{errors.saude_servicos.message}</p>}

                                    {saudeServicos?.includes('Outro') && (
                                        <div className="mt-2">
                                            <Label>Especifique outro serviço:</Label>
                                            <Input {...register('saude_servicos_outro')} placeholder="Qual serviço?" error={errors.saude_servicos_outro?.message} />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="form-question-spacing">
                            <div className="form-field-spacing">
                                <Label>Você sabe qual é o seu tipo sanguíneo?</Label>
                                <Controller
                                    name="saude_tipo_sanguineo"
                                    control={control}
                                    render={({ field }) => (
                                        <RadioGroup
                                            {...field}
                                            options={TIPO_SANGUINEO}
                                            error={errors.saude_tipo_sanguineo?.message}
                                            columns={3}
                                        />
                                    )}
                                />
                            </div>
                        </div>

                        <div className="form-question-spacing">
                            <div className="form-field-spacing">
                                <Label>Você já realizou ou realiza acompanhamento psicológico/psicoterapia?</Label>
                                <Controller
                                    name="saude_psicoterapia"
                                    control={control}
                                    render={({ field }) => (
                                        <RadioGroup
                                            {...field}
                                            options={SAUDE_PSICOTERAPIA}
                                            error={errors.saude_psicoterapia?.message}
                                            columns={3}
                                        />
                                    )}
                                />
                            </div>
                            {saudePsicoterapia === 'Outro' && (
                                <div className="pl-4 border-l-2 border-primary-200">
                                    <Label>Especifique:</Label>
                                    <Input {...register('saude_psicoterapia_outro')} error={errors.saude_psicoterapia_outro?.message} />
                                </div>
                            )}
                            {saudePsicoterapia === 'Sim' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 form-grid-spacing bg-app-surfaceHover p-4 rounded-lg">
                                    <div className="form-field-spacing">
                                        <Label>Por quanto tempo realizou psicoterapia?</Label>
                                        <Input {...register('saude_psicoterapia_tempo')} error={errors.saude_psicoterapia_tempo?.message} />
                                    </div>
                                    <div className="form-field-spacing">
                                        <Label>Há quanto tempo encerrou ou se ainda está em acompanhamento?</Label>
                                        <Input {...register('saude_psicoterapia_encerramento')} error={errors.saude_psicoterapia_encerramento?.message} />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="form-question-spacing">
                            <div className="form-field-spacing">
                                <Label>Você possui alguma deficiência, com ou sem laudo médico?</Label>
                                <Controller
                                    name="saude_deficiencia"
                                    control={control}
                                    render={({ field }) => (
                                        <RadioGroup
                                            {...field}
                                            options={['Sim', 'Não']}
                                            error={errors.saude_deficiencia?.message}
                                            columns={2}
                                        />
                                    )}
                                />
                            </div>
                            {saudeDeficiencia === 'Sim' && (
                                <div className="form-question-spacing bg-app-surfaceHover p-4 rounded-lg">
                                    <div className="form-field-spacing">
                                        <Label>Qual deficiência?</Label>
                                        <Input {...register('saude_deficiencia_qual')} error={errors.saude_deficiencia_qual?.message} />
                                    </div>
                                    <div className="form-field-spacing">
                                        <Label>Possui algum familiar com deficiência?</Label>
                                        <Controller
                                            name="saude_familiar_deficiencia"
                                            control={control}
                                            render={({ field }) => (
                                                <RadioGroup
                                                    {...field}
                                                    options={['Sim', 'Não']}
                                                    error={errors.saude_familiar_deficiencia?.message}
                                                    columns={2}
                                                />
                                            )}
                                        />
                                    </div>
                                    {saudeFamiliarDeficiencia === 'Sim' && (
                                        <div className="form-field-spacing ml-4">
                                            <Label>Qual?</Label>
                                            <Input {...register('saude_familia_deficiencia_qual')} error={errors.saude_familia_deficiencia_qual?.message} />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="form-question-spacing">
                            <div className="form-field-spacing">
                                <Label>Possui algum problema de saúde diagnosticado?</Label>
                                <Controller
                                    name="saude_problemas"
                                    control={control}
                                    render={({ field }) => (
                                        <RadioGroup
                                            {...field}
                                            options={['Sim', 'Não']}
                                            error={errors.saude_problemas?.message}
                                            columns={2}
                                        />
                                    )}
                                />
                            </div>
                            {saudeProblemas === 'Sim' && (
                                <div className="pl-4 border-l-2 border-primary-200">
                                    <Label>Qual(is)?</Label>
                                    <Input {...register('saude_problemas_qual')} error={errors.saude_problemas_qual?.message} />
                                </div>
                            )}
                        </div>

                        <div className="form-question-spacing">
                            <div className="form-field-spacing">
                                <Label>Possui alguma alergia?</Label>
                                <Controller
                                    name="saude_alergias"
                                    control={control}
                                    render={({ field }) => (
                                        <RadioGroup
                                            {...field}
                                            options={['Sim', 'Não', 'Talvez']}
                                            error={errors.saude_alergias?.message}
                                            columns={3}
                                        />
                                    )}
                                />
                            </div>
                            {(saudeAlergias === 'Sim' || saudeAlergias === 'Talvez') && (
                                <div className="pl-4 border-l-2 border-primary-200">
                                    <Label>Qual(is)?</Label>
                                    <Input {...register('saude_alergias_qual')} error={errors.saude_alergias_qual?.message} />
                                </div>
                            )}
                        </div>

                        <div className="form-question-spacing">
                            <div className="form-field-spacing">
                                <Label>Faz uso de medicamento contínuo?</Label>
                                <Controller
                                    name="saude_medicamentos"
                                    control={control}
                                    render={({ field }) => (
                                        <RadioGroup
                                            {...field}
                                            options={['Sim', 'Não']}
                                            error={errors.saude_medicamentos?.message}
                                            columns={2}
                                        />
                                    )}
                                />
                            </div>
                            {saudeMedicamentos === 'Sim' && (
                                <div className="pl-4 border-l-2 border-primary-200">
                                    <Label>Qual(is)?</Label>
                                    <Input {...register('saude_medicamentos_qual')} error={errors.saude_medicamentos_qual?.message} />
                                </div>
                            )}
                        </div>

                        <div className="form-question-spacing">
                            <div className="form-field-spacing">
                                <Label>Já fez ou faz uso de alguma substância psicoativa? (considerar álcool e cigarro)</Label>
                                <Controller
                                    name="saude_substancias"
                                    control={control}
                                    render={({ field }) => (
                                        <RadioGroup
                                            {...field}
                                            options={['Sim', 'Não']}
                                            error={errors.saude_substancias?.message}
                                            columns={2}
                                        />
                                    )}
                                />
                            </div>
                            {saudeSubstancias === 'Sim' && (
                                <div className="pl-4 border-l-2 border-primary-200">
                                    <Label>Qual(is)?</Label>
                                    <Input {...register('saude_substancias_qual')} error={errors.saude_substancias_qual?.message} />
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
});
