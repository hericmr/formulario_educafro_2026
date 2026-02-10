import React, { useEffect } from 'react';
import { useFormContext as useRHFContext, Controller } from 'react-hook-form';
import { Label } from '@/components/ui/Label';
import { RadioGroup } from '@/components/ui/RadioGroup';
import { Input } from '@/components/ui/Input';
import { CIDADES_BAIXADA, ESTADO_CIVIL } from '@/constants/options';
import { formatCPF, formatPhone, validateCPF } from '@/lib/utils'; // Assuming validateCPF is exported
import { User, MapPin, Calendar, Phone, Mail, FileText } from 'lucide-react';

export const DadosPessoais = React.memo(function DadosPessoais() {
    const { register, formState: { errors }, watch, setValue, setError, clearErrors, control } = useRHFContext();

    const dob = watch('data_nascimento');
    const cpfValue = watch('cpf');
    const phoneValue = watch('telefone');



    // CPF Mask & Validation on Change
    const handleCPFChange = (e) => {
        const formatted = formatCPF(e.target.value);
        setValue('cpf', formatted);

        if (formatted.replace(/\D/g, '').length === 11) {
            if (!validateCPF(formatted)) {
                setError('cpf', { type: 'manual', message: 'CPF Inválido' });
            } else {
                clearErrors('cpf');
            }
        }
    };

    // Phone Mask
    const handlePhoneChange = (e) => {
        const formatted = formatPhone(e.target.value);
        setValue('telefone', formatted);
    };

    return (
        <div className="form-question-spacing animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="section-wrapper">
                <div className="section-side-tab">
                    <h2 className="section-title flex items-center gap-2 justify-end">
                        Dados Pessoais
                    </h2>
                </div>
                <div className="section-card">
                    {/* Nome e Identificação */}
                    <div className="form-question-spacing mb-6">
                        <div className="space-y-2">
                            <Label htmlFor="nome_completo">Nome completo (Nome Social deve vir aqui se for o caso) <span className="text-error">*</span></Label>
                            <Input
                                id="nome_completo"
                                placeholder="Nome completo"
                                {...register('nome_completo')}
                                error={errors.nome_completo?.message}
                            />
                        </div>


                    </div>

                    {/* Email, Telefone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 form-grid-spacing mb-6">

                        <div className="space-y-2">
                            <Label htmlFor="email">E-mail</Label>
                            <div className="relative">
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="exemplo@email.com"
                                    className="pl-10"
                                    {...register('email')}
                                    error={errors.email?.message}
                                />
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="telefone">Telefone (WhatsApp)</Label>
                            <div className="relative">
                                <Input
                                    id="telefone"
                                    placeholder="(13) 99999-9999"
                                    className="pl-10"
                                    {...register('telefone', {
                                        onChange: handlePhoneChange
                                    })}
                                    error={errors.telefone?.message}
                                />
                                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                            </div>
                        </div>
                    </div>

                    {/* Docs & Data Nascimento */}
                    <div className="grid grid-cols-1 md:grid-cols-2 form-grid-spacing mb-6">
                        <div className="space-y-2">
                            <Label htmlFor="data_nascimento">Data de Nascimento</Label>
                            <Input
                                id="data_nascimento"
                                type="date"
                                {...register('data_nascimento')}
                                error={errors.data_nascimento?.message}
                            />
                        </div>



                        <div className="space-y-2">
                            <Label htmlFor="cpf">CPF</Label>
                            <Input
                                id="cpf"
                                placeholder="000.000.000-00"
                                {...register('cpf', {
                                    onChange: handleCPFChange
                                })}
                                error={errors.cpf?.message}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="rg">RG</Label>
                            <Input
                                id="rg"
                                placeholder="00.000.000-0"
                                {...register('rg')}
                                error={errors.rg?.message}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="estado_civil">Estado Civil</Label>
                            <Controller
                                name="estado_civil"
                                control={control}
                                render={({ field }) => (
                                    <RadioGroup
                                        {...field}
                                        options={ESTADO_CIVIL}
                                        error={errors.estado_civil?.message}
                                        columns={2}
                                    />
                                )}
                            />
                        </div>
                    </div>

                    {/* Endereço */}
                    <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2 justify-end border-t pt-4">
                        <MapPin className="w-5 h-5" />
                        Endereço
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 form-grid-spacing">
                        <div className="space-y-2">
                            <Label htmlFor="cidade">Cidade</Label>
                            <Controller
                                name="cidade"
                                control={control}
                                render={({ field }) => (
                                    <RadioGroup
                                        {...field}
                                        options={CIDADES_BAIXADA}
                                        error={errors.cidade?.message}
                                        columns={2}
                                    />
                                )}
                            />
                            {watch('cidade') === 'Outra' && (
                                <div className="mt-4 animate-in fade-in">
                                    <Label htmlFor="cidade_outra">Qual Cidade?</Label>
                                    <Input
                                        id="cidade_outra"
                                        {...register('cidade_outra')}
                                        placeholder="Especifique a cidade"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="naturalidade">Naturalidade (Cidade/Estado)</Label>
                            <Input
                                id="naturalidade"
                                placeholder="Ex: Santos - SP"
                                {...register('naturalidade')}
                                error={errors.naturalidade?.message}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="bairro">Bairro</Label>
                            <Input
                                id="bairro"
                                {...register('bairro')}
                                error={errors.bairro?.message}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="endereco">Logradouro e Número</Label>
                            <Input
                                id="endereco"
                                placeholder="Rua Exemplo, 123"
                                {...register('endereco')}
                                error={errors.endereco?.message}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});
