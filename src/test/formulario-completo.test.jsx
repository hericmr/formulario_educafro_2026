import { describe, it, expect } from 'vitest';
import { z } from 'zod';

/**
 * Teste de validação completa do formulário
 * Este teste simula o preenchimento de todos os campos e identifica erros de validação
 */

// Schema base (copiado de FormContext.jsx)
const baseSchema = z.object({
    entrevistador: z.string().min(1, 'Selecione um entrevistador'),
    data_entrevista: z.string().min(1, 'Data é obrigatória'),

    // Section 2 - Dados Pessoais
    nome_preferido: z.string().min(3, 'Nome muito curto').regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, 'Apenas letras são permitidas'),
    nome_social_diferente: z.string().optional(),
    nome_civil_completo: z.string().optional(),
    pronomes: z.string().min(1, 'Selecione seus pronomes'),
    telefone: z.string().min(14, 'Telefone inválido'),
    email: z.string().email('E-mail inválido'),
    data_nascimento: z.string().refine((date) => new Date(date) <= new Date(), 'Data não pode ser futura'),
    rg: z.string().min(5, 'RG inválido'),
    cpf: z.string().refine((val) => {
        return val?.replace(/\D/g, '').length === 11;
    }, 'CPF inválido'),
    cidade: z.string().min(1, 'Selecione uma cidade'),
    naturalidade: z.string().min(1, 'Informe a naturalidade'),
    endereco: z.string().min(5, 'Endereço completo é obrigatório'),
    bairro: z.string().min(2, 'Bairro é obrigatório'),
    estado_civil: z.preprocess((val) => val ?? '', z.string().min(1, 'Selecione o estado civil')),

    // Section 3 & 4
    raca_cor: z.preprocess((val) => val ?? '', z.string().min(1, 'Selecione sua raça/cor')),

    // Section 5 & 6
    genero: z.preprocess((val) => val ?? '', z.string().min(1, 'Selecione seu gênero')),
    trans_travesti: z.preprocess((val) => val ?? '', z.string().min(1, 'Responda se é pessoa trans/travesti')),
    orientacao_sexual: z.preprocess((val) => val ?? '', z.string().min(1, 'Selecione sua orientação sexual')),
    orientacao_sexual_outra: z.string().optional(),

    // Section 7
    escolaridade: z.preprocess((val) => val ?? '', z.string().min(1, 'Selecione a escolaridade')),
    escolaridade_curso: z.string().optional(),
    escola_publica_privada: z.string().optional(),

    // Section 8
    nome_mae: z.string().min(3, 'Nome da mãe é obrigatório'),
    profissao_mae: z.string().min(2, 'Profissão é obrigatória (ou "Do Lar", "Desempregada")'),
    escolaridade_mae: z.preprocess((val) => val ?? '', z.string().min(1, 'Escolaridade da mãe é obrigatória')),

    nome_pai: z.string().optional(),
    profissao_pai: z.string().optional(),
    escolaridade_pai: z.string().optional(),

    // Section 9
    familiar_nucleo: z.preprocess((val) => val ?? '', z.string().min(1, 'Informe se possui familiar no núcleo')),
    vinculo_familiar: z.string().optional(),
    nome_familiar: z.string().optional(),

    // Section 10 & 11
    moradia_condicao: z.preprocess((val) => val ?? '', z.string().min(1, 'Informe a condição de moradia')),
    moradia_tipo: z.preprocess((val) => val ?? '', z.string().min(1, 'Informe o tipo de moradia')),
    internet_tem: z.preprocess((val) => val ?? '', z.string().min(1, 'Informe se possui internet')),
    internet_tipo: z.string().optional(),
    internet_sinal: z.string().optional(),

    // Section 12
    trabalho_renda_semana: z.preprocess((val) => val ?? '', z.string().min(1, 'Responda se trabalhou na última semana')),
    trabalho_ajuda_familiar: z.preprocess((val) => val ?? '', z.string().min(1, 'Responda se ajudou familiar')),
    trabalho_vinculo: z.string().optional(),
    trabalho_horario_inicio: z.string().optional(),
    trabalho_horario_fim: z.string().optional(),
    trabalho_uso_dinheiro: z.string().optional(),

    // Section 13 & 14
    renda_familiar: z.preprocess((val) => val ?? '', z.string().min(1, 'Informe a renda familiar')),
    beneficios_recebe: z.preprocess((val) => val ?? '', z.string().min(1, 'Informe se recebe benefícios')),
    beneficios_cadunico: z.string().optional(),
    beneficios_tipo: z.array(z.string()).optional(),
    cesta_basica: z.preprocess((val) => val ?? '', z.string().min(1, 'Informe se precisa de cesta básica')),

    // Section 15, 16
    filhos_tem: z.preprocess((val) => val ?? '', z.string().min(1, 'Informe se possui filhos')),
    pensao_paga: z.string().optional(),
    pensao_recebe: z.string().optional(),

    transporte_veiculo: z.preprocess((val) => val ?? '', z.string().min(1, 'Informe se possui veículo')),
    transporte_meio: z.preprocess((val) => val ?? '', z.string().min(1, 'Informe o meio de transporte')),
    transporte_auxilio: z.preprocess((val) => val ?? '', z.string().min(1, 'Informe sobre auxílio transporte')),

    // Section 17 (SAÚDE)
    saude_plano: z.preprocess((val) => val ?? '', z.string().min(1, 'Selecione se utiliza SUS ou plano')),
    saude_servicos: z.array(z.string()).optional(),
    saude_servicos_outro: z.string().optional(),

    saude_tipo_sanguineo: z.preprocess((val) => val ?? '', z.string().min(1, 'Selecione o tipo sanguíneo')),

    saude_psicoterapia: z.preprocess((val) => val ?? '', z.string().min(1, 'Informe sobre psicoterapia')),
    saude_psicoterapia_outro: z.string().optional(),
    saude_psicoterapia_tempo: z.string().optional(),
    saude_psicoterapia_encerramento: z.string().optional(),

    saude_deficiencia: z.preprocess((val) => val ?? '', z.string().min(1, 'Informe se possui deficiência')),
    saude_deficiencia_qual: z.string().optional(),
    saude_familiar_deficiencia: z.string().optional(),
    saude_familia_deficiencia_qual: z.string().optional(),

    saude_problemas: z.preprocess((val) => val ?? '', z.string().min(1, 'Informe se possui problema de saúde')),
    saude_problemas_qual: z.string().optional(),

    saude_alergias: z.preprocess((val) => val ?? '', z.string().min(1, 'Informe se possui alergias')),
    saude_alergias_qual: z.string().optional(),

    saude_medicamentos: z.preprocess((val) => val ?? '', z.string().min(1, 'Informe se usa medicamentos')),
    saude_medicamentos_qual: z.string().optional(),

    saude_substancias: z.preprocess((val) => val ?? '', z.string().min(1, 'Informe se usa substâncias')),
    saude_substancias_qual: z.string().optional(),

    // Section 18 & 19
    cotidiano_mora_com: z.preprocess((val) => val ?? '', z.string().min(1, 'Informe com quem mora')),
    cotidiano_relacao: z.string().min(3, 'Descreva a relação familiar'),
    cotidiano_historico: z.string().min(10, 'Conte um pouco sobre sua história'),

    objetivo_curso: z.preprocess((val) => val ?? '', z.string().min(1, 'Informe o curso pretendido')),
    objetivo_expectativa: z.preprocess((val) => val ?? '', z.string().min(1, 'Informe a expectativa')),
    objetivo_motivacao: z.string().min(3, 'Descreva seu objetivo'),
    objetivo_temas: z.string().optional(),
    objetivo_frequencia: z.preprocess((val) => val ?? '', z.string().min(1, 'Selecione a frequência')),


    // Consent
    lgpd_consentimento: z.literal(true, { errorMap: () => ({ message: 'Você deve aceitar os termos para continuar' }) }),
}).passthrough();

describe('Validação Completa do Formulário', () => {
    it('deve aceitar dados completos e válidos', () => {
        const dadosCompletos = {
            // Seção 1
            entrevistador: 'João Silva',
            data_entrevista: '2026-02-06',

            // Seção 2 - Dados Pessoais
            nome_preferido: 'Maria Silva',
            nome_civil_completo: 'Maria Silva',
            pronomes: 'Ela/Dela',
            nome_social_diferente: 'Sim',
            telefone: '(13) 99999-9999',
            email: 'maria@email.com',
            data_nascimento: '2000-01-01',
            idade: '26',
            rg: '12.345.678-9',
            cpf: '123.456.789-00',
            cidade: 'Santos',
            naturalidade: 'Santos - SP',
            endereco: 'Rua Exemplo, 123',
            bairro: 'Centro',
            estado_civil: 'Solteiro(a)',

            // Seção 3 & 4
            raca_cor: 'Parda',

            // Seção 5 & 6
            genero: 'Feminino',
            trans_travesti: 'Não',
            orientacao_sexual: 'Heterossexual',

            // Seção 7
            escolaridade: 'Ensino Médio Completo',
            escola_publica_privada: 'Pública',

            // Seção 8
            nome_mae: 'Ana Silva',
            profissao_mae: 'Do Lar',
            escolaridade_mae: 'Ensino Fundamental Completo',

            // Seção 9
            familiar_nucleo: 'Não',

            // Seção 10 & 11
            moradia_condicao: 'Própria',
            moradia_tipo: 'Casa',
            internet_tem: 'Sim',

            // Seção 12
            trabalho_renda_semana: 'Não',
            trabalho_ajuda_familiar: 'Não',

            // Seção 13 & 14
            renda_familiar: 'Até 1 salário mínimo',
            beneficios_recebe: 'Não',
            cesta_basica: 'Não',

            // Seção 15, 16
            filhos_tem: 'Não',
            transporte_veiculo: 'Não',
            transporte_meio: 'Ônibus',
            transporte_auxilio: 'Não',

            // Seção 17 (SAÚDE)
            saude_plano: 'Apenas SUS',
            saude_servicos: ['Unidade Básica de Saúde (UBS)'],
            saude_tipo_sanguineo: 'O+',
            saude_psicoterapia: 'Não',
            saude_deficiencia: 'Não',
            saude_problemas: 'Não',
            saude_alergias: 'Não',
            saude_medicamentos: 'Não',
            saude_substancias: 'Não',

            // Seção 18 & 19
            cotidiano_mora_com: 'Pais',
            cotidiano_relacao: 'Boa relação com todos',
            cotidiano_historico: 'Sou estudante em busca de oportunidades',
            objetivo_curso: 'Administração',
            objetivo_expectativa: 'Crescer profissionalmente',
            objetivo_motivacao: 'Busco melhorar minha qualificação profissional',
            objetivo_frequencia: 'Posso participar de todas as atividades',

            // Consent
            lgpd_consentimento: true,
        };

        const resultado = baseSchema.safeParse(dadosCompletos);

        if (!resultado.success) {
            console.log('\n🔴 ERROS ENCONTRADOS:');
            resultado.error.errors.forEach((err) => {
                console.log(`  - Campo: ${err.path.join('.')}`);
                console.log(`    Mensagem: ${err.message}`);
                console.log(`    Valor recebido: ${JSON.stringify(err.received || 'undefined')}`);
                console.log('');
            });
        }

        expect(resultado.success).toBe(true);
    });

    it('deve identificar o erro quando nome_social_diferente é null', () => {
        const dadosComErro = {
            entrevistador: 'João Silva',
            data_entrevista: '2026-02-06',
            nome_preferido: 'Maria Silva',
            nome_civil_completo: 'Maria Silva',
            pronomes: 'Ela/Dela',
            nome_social_diferente: null, // ❌ Este é o problema!
            telefone: '(13) 99999-9999',
            email: 'maria@email.com',
            data_nascimento: '2000-01-01',
            rg: '12.345.678-9',
            cpf: '123.456.789-00',
            cidade: 'Santos',
            naturalidade: 'Santos - SP',
            endereco: 'Rua Exemplo, 123',
            bairro: 'Centro',
            estado_civil: 'Solteiro(a)',
            raca_cor: 'Parda',
            genero: 'Feminino',
            trans_travesti: 'Não',
            orientacao_sexual: 'Heterossexual',
            escolaridade: 'Ensino Médio Completo',
            nome_mae: 'Ana Silva',
            profissao_mae: 'Do Lar',
            escolaridade_mae: 'Ensino Fundamental Completo',
            familiar_nucleo: 'Não',
            moradia_condicao: 'Própria',
            moradia_tipo: 'Casa',
            internet_tem: 'Sim',
            trabalho_renda_semana: 'Não',
            trabalho_ajuda_familiar: 'Não',
            renda_familiar: 'Até 1 salário mínimo',
            beneficios_recebe: 'Não',
            cesta_basica: 'Não',
            filhos_tem: 'Não',
            transporte_veiculo: 'Não',
            transporte_meio: 'Ônibus',
            transporte_auxilio: 'Não',
            saude_plano: 'Apenas SUS',
            saude_servicos: ['Unidade Básica de Saúde (UBS)'],
            saude_tipo_sanguineo: 'O+',
            saude_psicoterapia: 'Não',
            saude_deficiencia: 'Não',
            saude_problemas: 'Não',
            saude_alergias: 'Não',
            saude_medicamentos: 'Não',
            saude_substancias: 'Não',
            cotidiano_mora_com: 'Pais',
            cotidiano_relacao: 'Boa relação',
            cotidiano_historico: 'Sou estudante',
            objetivo_curso: 'Administração',
            objetivo_expectativa: 'Crescer',
            objetivo_motivacao: 'Busco melhorar',
            objetivo_frequencia: 'Posso participar',
            lgpd_consentimento: true,
        };

        const resultado = baseSchema.safeParse(dadosComErro);

        expect(resultado.success).toBe(false);
        if (!resultado.success) {
            const erroNomeSocial = resultado.error.errors.find(
                err => err.path[0] === 'nome_social_diferente'
            );
            expect(erroNomeSocial).toBeDefined();
            console.log('\n✅ Erro detectado corretamente:', erroNomeSocial?.message);
        }
    });

    it('deve identificar todos os campos obrigatórios não preenchidos', () => {
        const dadosVazios = {};

        const resultado = baseSchema.safeParse(dadosVazios);

        expect(resultado.success).toBe(false);

        if (!resultado.success) {
            console.log('\n📋 CAMPOS OBRIGATÓRIOS NÃO PREENCHIDOS:');
            const camposObrigatorios = resultado.error.errors.map(err => ({
                campo: err.path.join('.'),
                mensagem: err.message
            }));

            camposObrigatorios.forEach(({ campo, mensagem }) => {
                console.log(`  ❌ ${campo}: ${mensagem}`);
            });

            console.log(`\n📊 Total de campos obrigatórios: ${camposObrigatorios.length}`);
        }
    });
});
