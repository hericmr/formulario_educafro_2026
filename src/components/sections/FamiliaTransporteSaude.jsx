import React from 'react';
import { useFormContext as useRHFContext, Controller } from 'react-hook-form';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { RadioGroup } from '@/components/ui/RadioGroup';
import { Baby, Car, Stethoscope } from 'lucide-react';
import { SERVICOS_SUS, TIPO_SANGUINEO } from '@/lib/constants';
import { CheckboxGroup } from '@/components/ui/CheckboxGroup';

export function FamiliaTransporteSaude() {
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
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Section 15: Filhos e Responsabilidades */}
            <div className="bg-app-surface p-6 rounded-2xl shadow-sm border border-app-border">
                <h2 className="text-2xl font-bold text-primary-800 mb-4 flex items-center gap-2">
                    <Baby className="w-6 h-6" />
                    Filhos e Responsabilidades
                </h2>

                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label>Possui filhos?</Label>
                            <Controller
                                name="filhos_tem"
                                control={control}
                                render={({ field }) => (
                                    <RadioGroup
                                        {...field}
                                        options={['Não', 'Sim (1)', 'Sim (2)', 'Sim (3 ou mais)']}
                                        error={errors.filhos_tem?.message}
                                        columns={2}
                                    />
                                )}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Paga pensão?</Label>
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
                        <div className="space-y-2">
                            <Label>Recebe pensão?</Label>
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

            {/* Section 16: Transporte */}
            <div className="bg-app-surface p-6 rounded-2xl shadow-sm border border-app-border">
                <h2 className="text-2xl font-bold text-primary-800 mb-4 flex items-center gap-2">
                    <Car className="w-6 h-6" />
                    Transporte
                </h2>

                <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                        <Label>Possui veículo próprio?</Label>
                        <Controller
                            name="transporte_veiculo"
                            control={control}
                            render={({ field }) => (
                                <RadioGroup
                                    {...field}
                                    options={['Não', 'Carro', 'Moto', 'Bicicleta']}
                                    error={errors.transporte_veiculo?.message}
                                    columns={4}
                                />
                            )}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Como vai à Educafro?</Label>
                        <Controller
                            name="transporte_meio"
                            control={control}
                            render={({ field }) => (
                                <RadioGroup
                                    {...field}
                                    options={[
                                        'Transporte público (ônibus, VLT)',
                                        'Carro próprio',
                                        'Carona de amigos/familiares',
                                        'Bicicleta',
                                        'Caminhada',
                                        'Motocicleta',
                                        'Serviço de transporte por aplicativo (Uber, 99, etc.)',
                                        'Outro'
                                    ]}
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

                    <div className="space-y-2">
                        <Label>Necessita auxílio transporte?</Label>
                        <Controller
                            name="transporte_auxilio"
                            control={control}
                            render={({ field }) => (
                                <RadioGroup
                                    {...field}
                                    options={['Sim', 'Não', 'Talvez']}
                                    error={errors.transporte_auxilio?.message}
                                    columns={3}
                                />
                            )}
                        />
                    </div>
                </div>
            </div>

            {/* Section 17: Saúde */}
            <div className="bg-app-surface p-6 rounded-2xl shadow-sm border border-app-border">
                <h2 className="text-2xl font-bold text-primary-800 mb-4 flex items-center gap-2">
                    <Stethoscope className="w-6 h-6" />
                    Saúde
                </h2>

                <div className="space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Você utiliza os serviços do SUS ou possui plano de saúde?</Label>
                            <Controller
                                name="saude_plano"
                                control={control}
                                render={({ field }) => (
                                    <RadioGroup
                                        {...field}
                                        options={['Apenas SUS', 'Apenas plano de saúde', 'Uso os dois']}
                                        error={errors.saude_plano?.message}
                                        columns={3}
                                    />
                                )}
                            />
                        </div>

                        {(saudePlano === 'Apenas SUS' || saudePlano === 'Uso os dois') && (
                            <div className="space-y-2 bg-app-surfaceHover p-4 rounded-lg">
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
                                {errors.saude_servicos && <p className="text-red-500 text-sm mt-1">{errors.saude_servicos.message}</p>}

                                {saudeServicos?.includes('Outro') && (
                                    <div className="mt-2">
                                        <Label>Especifique outro serviço:</Label>
                                        <Input {...register('saude_servicos_outro')} placeholder="Qual serviço?" error={errors.saude_servicos_outro?.message} />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
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

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Você já realizou ou realiza psicoterapia?</Label>
                            <Controller
                                name="saude_psicoterapia"
                                control={control}
                                render={({ field }) => (
                                    <RadioGroup
                                        {...field}
                                        options={['Sim', 'Não', 'Outro']}
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-app-surfaceHover p-4 rounded-lg">
                                <div className="space-y-2">
                                    <Label>Por quanto tempo realizou psicoterapia?</Label>
                                    <Input {...register('saude_psicoterapia_tempo')} error={errors.saude_psicoterapia_tempo?.message} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Há quanto tempo encerrou ou se ainda está em acompanhamento?</Label>
                                    <Input {...register('saude_psicoterapia_encerramento')} error={errors.saude_psicoterapia_encerramento?.message} />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
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
                            <div className="space-y-4 bg-app-surfaceHover p-4 rounded-lg">
                                <div className="space-y-2">
                                    <Label>Qual deficiência?</Label>
                                    <Input {...register('saude_deficiencia_qual')} error={errors.saude_deficiencia_qual?.message} />
                                </div>
                                <div className="space-y-2">
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
                                    <div className="space-y-2 ml-4">
                                        <Label>Qual?</Label>
                                        <Input {...register('saude_familia_deficiencia_qual')} error={errors.saude_familia_deficiencia_qual?.message} />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
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

                    <div className="space-y-4">
                        <div className="space-y-2">
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

                    <div className="space-y-4">
                        <div className="space-y-2">
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

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Já fez uso de alguma substância psicoativa? (considerar álcool e cigarro)</Label>
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
    );
}
