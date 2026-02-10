import React, { createContext, useContext, useState } from 'react';
import { useForm, FormProvider as RHFProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FORM_STEPS } from '@/lib/constants';

const FormContext = createContext({});

// Preliminary schema - will be expanded
const baseSchema = z.object({
    entrevistador: z.array(z.string()).optional(),
    data_entrevista: z.string().optional(),

    // Section 2
    nome_completo: z.string().optional(),
    telefone: z.string().optional().refine((val) => !val || val.length >= 14, 'Telefone incompleto'),
    email: z.string().optional().refine((val) => !val || /^\S+@\S+\.\S+$/.test(val), 'E-mail inválido'),
    data_nascimento: z.string().optional().refine((date) => !date || new Date(date) <= new Date(), 'Data não pode ser futura'),
    rg: z.string().optional(),
    cpf: z.string().optional().refine((val) => {
        if (!val) return true;
        return val.replace(/\D/g, '').length === 11;
    }, 'CPF inválido'),
    cidade: z.string().optional(),
    naturalidade: z.string().optional(),
    endereco: z.string().optional(),
    bairro: z.string().optional(),
    estado_civil: z.string().optional(),

    // Section 3 & 4
    raca_cor: z.string().optional(),

    // Section 5 & 6
    genero: z.string().optional(),
    trans_travesti: z.string().optional(),
    orientacao_sexual: z.string().optional(),
    orientacao_sexual_outra: z.string().optional(),

    // Section 7
    escolaridade: z.string().optional(),
    escolaridade_curso: z.string().optional(),
    escola_publica_privada: z.string().optional(),

    // Section 8
    nome_mae: z.string().optional(),
    profissao_mae: z.string().optional(),
    escolaridade_mae: z.string().optional(),

    nome_pai: z.string().optional(),
    profissao_pai: z.string().optional(),
    escolaridade_pai: z.string().optional(),

    // Section 9
    familiar_nucleo: z.string().optional(),
    vinculo_familiar: z.string().optional(),
    nome_familiar: z.string().optional(),

    // Section 10 & 11
    moradia_condicao: z.string().optional(),
    moradia_tipo: z.string().optional(),
    internet_tem: z.string().optional(),
    internet_tipo: z.string().optional(),
    internet_sinal: z.string().optional(),

    // Section 12
    trabalho_renda_semana: z.string().optional(),
    trabalho_ajuda_familiar: z.string().optional(),
    trabalho_vinculo: z.string().optional(),
    trabalho_horario_inicio: z.string().optional(),
    trabalho_horario_fim: z.string().optional(),
    trabalho_uso_dinheiro: z.string().optional(),

    // Section 13 & 14
    renda_familiar: z.string().optional(),
    beneficios_recebe: z.string().optional(),
    beneficios_cadunico: z.string().optional(),
    beneficios_tipo: z.array(z.string()).optional(),
    cesta_basica: z.string().optional(),

    // Section 15, 16
    filhos_tem: z.string().optional(),
    pensao_paga: z.string().optional(),
    pensao_recebe: z.string().optional(),

    transporte_veiculo: z.string().optional(),
    transporte_meio: z.string().optional(),
    transporte_auxilio: z.string().optional(),

    // Section 17 (SAÚDE)
    saude_plano: z.string().optional(),
    saude_servicos: z.array(z.string()).optional(),
    saude_servicos_outro: z.string().optional(),

    saude_tipo_sanguineo: z.string().optional(),

    saude_psicoterapia: z.string().optional(),
    saude_psicoterapia_outro: z.string().optional(),
    saude_psicoterapia_tempo: z.string().optional(),
    saude_psicoterapia_encerramento: z.string().optional(),

    saude_deficiencia: z.string().optional(),
    saude_deficiencia_qual: z.string().optional(),
    saude_familiar_deficiencia: z.string().optional(),
    saude_familia_deficiencia_qual: z.string().optional(),

    saude_problemas: z.string().optional(),
    saude_problemas_qual: z.string().optional(),

    saude_alergias: z.string().optional(),
    saude_alergias_qual: z.string().optional(),

    saude_medicamentos: z.string().optional(),
    saude_medicamentos_qual: z.string().optional(),

    saude_substancias: z.string().optional(),
    saude_substancias_qual: z.string().optional(),

    // Section 18 & 19
    cotidiano_mora_com: z.string().optional(),
    cotidiano_mora_com_quem: z.string().optional(),
    cotidiano_relacao: z.string().optional(),
    cotidiano_historico: z.string().optional(),

    objetivo_curso: z.string().optional(),
    objetivo_expectativa: z.string().optional(),
    objetivo_motivacao: z.string().optional(),
    objetivo_temas: z.string().optional(),
    objetivo_frequencia: z.string().optional(),
}).passthrough();

const formSchema = baseSchema.superRefine((data, ctx) => {
    // 1. SUS Services
    if ((data.saude_plano === 'Apenas SUS' || data.saude_plano === 'Uso os dois') && (!data.saude_servicos || data.saude_servicos.length === 0)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Selecione pelo menos um serviço", path: ["saude_servicos"] });
    }
    if (data.saude_servicos?.includes('Outro') && !data.saude_servicos_outro) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Especifique o outro serviço", path: ["saude_servicos_outro"] });
    }

    // 3. Psicoterapia
    if (data.saude_psicoterapia === 'Sim') {
        if (!data.saude_psicoterapia_tempo) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Informe o tempo", path: ["saude_psicoterapia_tempo"] });
        if (!data.saude_psicoterapia_encerramento) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Informe se continua", path: ["saude_psicoterapia_encerramento"] });
    }
    if (data.saude_psicoterapia === 'Outro' && !data.saude_psicoterapia_outro) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Especifique", path: ["saude_psicoterapia_outro"] });
    }

    // 4. Deficiência
    if (data.saude_deficiencia === 'Sim') {
        if (!data.saude_deficiencia_qual) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Qual deficiência?", path: ["saude_deficiencia_qual"] });
        if (!data.saude_familiar_deficiencia) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Possui familiar com deficiência?", path: ["saude_familiar_deficiencia"] });
    }
    if (data.saude_familiar_deficiencia === 'Sim') {
        if (!data.saude_familia_deficiencia_qual) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Qual familiar?", path: ["saude_familia_deficiencia_qual"] });
    }

    // 5. Problemas
    if (data.saude_problemas === 'Sim' && !data.saude_problemas_qual) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Quais problemas?", path: ["saude_problemas_qual"] });
    }

    // 6. Alergias
    if ((data.saude_alergias === 'Sim' || data.saude_alergias === 'Talvez') && !data.saude_alergias_qual) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Quais alergias?", path: ["saude_alergias_qual"] });
    }

    // 7. Medicamentos
    if (data.saude_medicamentos === 'Sim' && !data.saude_medicamentos_qual) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Quais medicamentos?", path: ["saude_medicamentos_qual"] });
    }

    // 8. Substâncias
    if (data.saude_substancias === 'Sim' && !data.saude_substancias_qual) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Quais substâncias?", path: ["saude_substancias_qual"] });
    }
});

export function FormProvider({ children }) {
    const [currentStep, setCurrentStep] = useState(0);

    const methods = useForm({
        resolver: zodResolver(formSchema),
        mode: 'onChange'
    });

    const nextStep = async () => {
        const fieldsToValidate = FORM_STEPS[currentStep].fields;

        // Show errors visually but don't block
        await methods.trigger(fieldsToValidate);

        // Always allowed to proceed
        setCurrentStep((prev) => Math.min(prev + 1, FORM_STEPS.length - 1));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const prevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 0));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <FormContext.Provider value={{ currentStep, setCurrentStep, nextStep, prevStep, steps: FORM_STEPS }}>
            <RHFProvider {...methods}>
                {children}
            </RHFProvider>
        </FormContext.Provider>
    );
}

export const useFormContext = () => useContext(FormContext);
