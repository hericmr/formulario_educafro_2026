import React, { useEffect } from 'react';
import { useFormContext as useRHFContext, Controller } from 'react-hook-form';
import { Label } from '@/components/ui/Label';
import { RadioGroup } from '@/components/ui/RadioGroup';
import { Input } from '@/components/ui/Input';
import { CIDADES_BAIXADA } from '@/lib/constants';
import { formatCPF, formatPhone, validateCPF } from '@/lib/utils'; // Assuming validateCPF is exported
import { User, MapPin, Calendar, Phone, Mail, FileText } from 'lucide-react';

export function DadosPessoais() {
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
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-app-surface p-6 rounded-2xl shadow-sm border border-app-border">
                <h2 className="text-2xl font-bold text-primary-800 mb-4 flex items-center gap-2">
                    <User className="w-6 h-6" />
                    Dados da Aluna(o, e)
                </h2>

                {/* Nome e Identificação */}
                <div className="space-y-6 mb-6">
                    <div className="space-y-2">
                        <Label htmlFor="nome_completo">Nome completo (se for o caso Nome Social) <span className="text-red-500">*</span></Label>
                        <Input
                            id="nome_completo"
                            placeholder="Seu nome completo"
                            {...register('nome_completo')}
                            error={errors.nome_completo?.message}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Esse nome é o mesmo que consta em seus documentos oficiais? <span className="text-red-500">*</span></Label>
                        <Controller
                            name="nome_mesmo_documento"
                            control={control}
                            render={({ field }) => (
                                <RadioGroup
                                    {...field}
                                    options={['Sim', 'Não', 'Prefiro não responder']}
                                    error={errors.nome_mesmo_documento?.message}
                                    columns={3}
                                />
                            )}
                        />
                        {watch('nome_mesmo_documento') === 'Não' && (
                            <div className="mt-4 animate-in fade-in space-y-2">
                                <Label htmlFor="nome_civil_documento">Qual o nome que consta em seus documentos oficiais?</Label>
                                <Input
                                    id="nome_civil_documento"
                                    {...register('nome_civil_documento')}
                                    placeholder="Nome no RG/CPF"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Email, Telefone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
                                    options={['Solteiro(a)', 'Casado(a)', 'Divorciado(a)', 'Viúvo(a)', 'União Estável']}
                                    error={errors.estado_civil?.message}
                                    columns={2}
                                />
                            )}
                        />
                    </div>
                </div>

                {/* Endereço */}
                <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2 border-t pt-4">
                    <MapPin className="w-5 h-5" />
                    Endereço
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
    );
}
