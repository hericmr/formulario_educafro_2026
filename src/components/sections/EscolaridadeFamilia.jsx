import React from 'react';
import { useFormContext as useRHFContext, Controller } from 'react-hook-form';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { RadioGroup } from '@/components/ui/RadioGroup';
import { GraduationCap, Users2, User } from 'lucide-react';

const ESCOLARIDADE_OPTIONS = [
    'Não frequentou a escola',
    'Ensino Fundamental incompleto',
    'Ensino Fundamental completo',
    'Ensino Médio incompleto',
    'Ensino Médio Completo',
    'Ensino superior incompleto',
    'Ensino superior completo',
    'Pós-graduação - Especialização',
    'Pós-graduação - Mestrado',
    'Pós-graduação - Doutorado',
    'Outro',
    'Prefiro não dizer'
];

export function EscolaridadeFamilia() {
    const { register, formState: { errors }, watch, control } = useRHFContext();

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Section 7: Escolaridade */}
            <div className="bg-app-surface p-6 rounded-2xl shadow-sm border border-app-border">
                <h2 className="text-2xl font-bold text-primary-800 mb-4 flex items-center gap-2">
                    <GraduationCap className="w-6 h-6" />
                    Escolaridade
                </h2>

                <div className="space-y-4">
                    <Label htmlFor="escolaridade">Qual sua escolaridade?</Label>
                    <Controller
                        name="escolaridade"
                        control={control}
                        render={({ field }) => (
                            <RadioGroup
                                {...field}
                                options={ESCOLARIDADE_OPTIONS}
                                error={errors.escolaridade?.message}
                                columns={2}
                            />
                        )}
                    />

                    <div className="grid grid-cols-1 gap-4 mt-4">
                        <div>
                            <Label htmlFor="escola_publica_privada">Estudou em escola pública ou particular?</Label>
                            <Controller
                                name="escola_publica_privada"
                                control={control}
                                render={({ field }) => (
                                    <RadioGroup
                                        {...field}
                                        options={['Sempre Pública', 'Sempre Particular (com bolsa)', 'Sempre Particular (sem bolsa)', 'Mista (Parte Pública / Parte Particular)']}
                                        columns={2}
                                    />
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 8: Filiação */}
            <div className="bg-app-surface p-6 rounded-2xl shadow-sm border border-app-border">
                <h2 className="text-2xl font-bold text-primary-800 mb-4 flex items-center gap-2">
                    <Users2 className="w-6 h-6" />
                    Filiação
                </h2>
                <p className="text-gray-600 mb-6 text-sm">Preencha com os dados dos seus pais ou responsáveis.</p>

                {/* Mãe */}
                <div className="mb-8 pb-8 border-b border-app-border">
                    <h3 className="text-lg font-semibold text-pink-600 mb-4 flex items-center gap-2">
                        <User className="w-4 h-4" /> Mãe
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-1">
                            <Label htmlFor="nome_mae">Nome Completo</Label>
                            <Input id="nome_mae" {...register('nome_mae')} error={errors.nome_mae?.message} />
                        </div>
                        <div>
                            <Label htmlFor="profissao_mae">Profissão</Label>
                            <Input id="profissao_mae" placeholder="Ex: Do Lar, Autônoma..." {...register('profissao_mae')} error={errors.profissao_mae?.message} />
                        </div>
                        <div>
                            <Label htmlFor="escolaridade_mae">Escolaridade</Label>
                            <Controller
                                name="escolaridade_mae"
                                control={control}
                                render={({ field }) => (
                                    <RadioGroup
                                        {...field}
                                        options={ESCOLARIDADE_OPTIONS}
                                        error={errors.escolaridade_mae?.message}
                                        columns={2}
                                    />
                                )}
                            />
                        </div>
                    </div>
                </div>

                {/* Pai */}
                <div>
                    <h3 className="text-lg font-semibold text-blue-600 mb-4 flex items-center gap-2">
                        <User className="w-4 h-4" /> Pai
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-1">
                            <Label htmlFor="nome_pai">Nome Completo</Label>
                            <Input id="nome_pai" {...register('nome_pai')} />
                        </div>
                        <div>
                            <Label htmlFor="profissao_pai">Profissão</Label>
                            <Input id="profissao_pai" {...register('profissao_pai')} />
                        </div>
                        <div>
                            <Label htmlFor="escolaridade_pai">Escolaridade</Label>
                            <Controller
                                name="escolaridade_pai"
                                control={control}
                                render={({ field }) => (
                                    <RadioGroup
                                        {...field}
                                        options={ESCOLARIDADE_OPTIONS}
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
