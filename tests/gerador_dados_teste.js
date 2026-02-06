/**
 * Gerador de Dados de Teste para Formulário Educafro 2026
 * 
 * Este script gera múltiplas entrevistas simuladas com diferentes
 * níveis de completude para testes mais abrangentes.
 */

import { z } from 'zod';

// ============================================================================
// DADOS DE REFERÊNCIA
// ============================================================================

const ASSISTENTES = [
    'Ana Lucia Fernandes',
    'Leticia Yumy',
    'Marcel Vaques',
    'Héric Moura',
    'Luzinete Reis'
];

const NOMES_MASCULINOS = [
    'João', 'Pedro', 'Lucas', 'Gabriel', 'Rafael', 'Matheus',
    'Carlos', 'Felipe', 'Daniel', 'Bruno', 'Rodrigo', 'André'
];

const NOMES_FEMININOS = [
    'Maria', 'Ana', 'Julia', 'Beatriz', 'Larissa', 'Fernanda',
    'Patricia', 'Camila', 'Mariana', 'Carolina', 'Gabriela', 'Amanda'
];

const SOBRENOMES = [
    'Silva', 'Santos', 'Oliveira', 'Costa', 'Souza', 'Lima',
    'Ferreira', 'Rodrigues', 'Almeida', 'Nascimento', 'Carvalho', 'Ribeiro'
];

const CIDADES = [
    'Santos', 'São Vicente', 'Guarujá', 'Praia Grande',
    'Cubatão', 'Bertioga', 'Itanhaém', 'Mongaguá', 'Peruíbe'
];

const CURSOS = [
    'Enfermagem', 'Psicologia', 'Direito', 'Engenharia', 'Medicina',
    'Pedagogia', 'Administração', 'Ciências da Computação',
    'Fisioterapia', 'Nutrição', 'Arquitetura', 'Ciências Sociais'
];

const RACAS = ['Preto/a/e', 'Pardo/a/e', 'Branco/a/e', 'Amarelo/a/e', 'Indígena'];

const GENEROS = ['Feminina', 'Masculina', 'Não binárie'];

const ORIENTACOES = ['Heterossexual', 'Gay', 'Lésbica', 'Bissexual'];

const ESCOLARIDADES = [
    'Ensino Fundamental incompleto',
    'Ensino Fundamental completo',
    'Ensino Médio incompleto',
    'Ensino Médio Completo',
    'Ensino superior incompleto',
    'Ensino superior completo'
];

const RENDAS = [
    'Até 300,00',
    'De R$ 301,00 a R$ 500,00',
    'De R$ 501,00 a R$ 800,00',
    'De R$ 801,00 a R$ 1.045,00',
    'De R$ 1.046,00 R$ 2080,00',
    'De R$ 2081,00 a R$ 3.120,00'
];

const TIPOS_SANGUINEOS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Não sei'];

// ============================================================================
// FUNÇÕES AUXILIARES
// ============================================================================

function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDate(start, end) {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString().split('T')[0];
}

function randomPhone() {
    const ddd = '13';
    const prefix = '9' + randomNumber(8000, 9999);
    const suffix = randomNumber(1000, 9999);
    return `(${ddd}) ${prefix}-${suffix}`;
}

function randomCPF() {
    const n1 = randomNumber(100, 999);
    const n2 = randomNumber(100, 999);
    const n3 = randomNumber(100, 999);
    const n4 = randomNumber(10, 99);
    return `${n1}.${n2}.${n3}-${n4}`;
}

function randomRG() {
    const n1 = randomNumber(10, 99);
    const n2 = randomNumber(100, 999);
    const n3 = randomNumber(100, 999);
    const n4 = randomNumber(0, 9);
    return `${n1}.${n2}.${n3}-${n4}`;
}

function gerarNomeCompleto(genero) {
    const primeiroNome = genero === 'Feminina'
        ? randomItem(NOMES_FEMININOS)
        : randomItem(NOMES_MASCULINOS);
    const sobrenome1 = randomItem(SOBRENOMES);
    const sobrenome2 = randomItem(SOBRENOMES);
    return `${primeiroNome} ${sobrenome1} ${sobrenome2}`;
}

function gerarEmail(nome) {
    const nomeLimpo = nome.toLowerCase().replace(/\s+/g, '.');
    const dominios = ['gmail.com', 'hotmail.com', 'email.com', 'outlook.com'];
    return `${nomeLimpo}@${randomItem(dominios)}`;
}

// ============================================================================
// GERADOR DE ENTREVISTAS
// ============================================================================

/**
 * Gera uma entrevista com nível de completude controlado
 * @param {number} nivelCompletude - 0 a 100 (percentual de campos a preencher)
 * @param {boolean} validarCondicionais - Se deve validar campos condicionais
 */
function gerarEntrevista(nivelCompletude = 100, validarCondicionais = true) {
    const genero = randomItem(GENEROS);
    const nomeCompleto = gerarNomeCompleto(genero);
    const dataNascimento = randomDate(new Date(1990, 0, 1), new Date(2008, 11, 31));

    // Determina aleatoriamente se vai preencher cada campo baseado no nível de completude
    const shouldFill = () => Math.random() * 100 <= nivelCompletude;

    const entrevista = {
        // Identificação - sempre preenche
        entrevistador: randomItem(ASSISTENTES),
        data_entrevista: randomDate(new Date(2026, 0, 1), new Date()),

        // Dados Pessoais - novos nomes de campos
        nome_civil_completo: shouldFill() ? nomeCompleto : null,
        nome_social: shouldFill() && Math.random() > 0.8 ? nomeCompleto + ' Social' : null, // 20% chance de ter nome social
        nome_preferido: shouldFill() ? nomeCompleto.split(' ')[0] : null, // Usa o primeiro nome como preferido
        telefone: shouldFill() ? randomPhone() : null,
        email: shouldFill() ? gerarEmail(nomeCompleto) : null,
        data_nascimento: shouldFill() ? dataNascimento : null,
        cpf: shouldFill() ? randomCPF() : null,
        rg: shouldFill() ? randomRG() : null,
        cidade: shouldFill() ? randomItem(CIDADES) : null,
        naturalidade: shouldFill() ? randomItem(CIDADES) : null,
        endereco: shouldFill() ? `Rua ${randomItem(['das Flores', 'Principal', 'da Praia', 'Central'])}, ${randomNumber(10, 999)}` : null,
        bairro: shouldFill() ? randomItem(['Centro', 'Jardim', 'Vila Maria', 'Parque']) : null,
        estado_civil: shouldFill() ? randomItem(['Solteiro(a)', 'Casado(a)', 'União Estável']) : null,

        // Raça
        raca_cor: shouldFill() ? randomItem(RACAS) : null,

        // Gênero
        genero: shouldFill() ? genero : null,
        trans_travesti: shouldFill() ? randomItem(['Sim', 'Não']) : null,
        orientacao_sexual: shouldFill() ? randomItem(ORIENTACOES) : null,

        // Escolaridade
        escolaridade: shouldFill() ? randomItem(ESCOLARIDADES) : null,
        escola_publica_privada: shouldFill() ? randomItem(['Sempre Pública', 'Mista (Parte Pública / Parte Particular)']) : undefined,
        nome_mae: shouldFill() ? gerarNomeCompleto('Feminina') : null,
        profissao_mae: shouldFill() ? randomItem(['Do Lar', 'Vendedora', 'Professora', 'Auxiliar de Limpeza', 'Cozinheira']) : null,
        escolaridade_mae: shouldFill() ? randomItem(ESCOLARIDADES) : null,
        nome_pai: shouldFill() ? gerarNomeCompleto('Masculina') : undefined,
        profissao_pai: shouldFill() ? randomItem(['Motorista', 'Vendedor', 'Mecânico', 'Pedreiro', 'Desempregado']) : undefined,
        escolaridade_pai: shouldFill() ? randomItem(ESCOLARIDADES) : undefined,

        // Vínculo Familiar
        familiar_nucleo: shouldFill() ? randomItem(['Sim', 'Não']) : null,
        vinculo_familiar: shouldFill() && Math.random() > 0.5 ? randomItem(['Irmã', 'Irmão', 'Prima', 'Tia']) : undefined,
        nome_familiar: shouldFill() && Math.random() > 0.5 ? gerarNomeCompleto(randomItem(['Feminina', 'Masculina'])) : undefined,

        // Moradia
        moradia_condicao: shouldFill() ? randomItem(['Própria', 'Alugada', 'Cedida']) : null,
        moradia_tipo: shouldFill() ? randomItem(['Alvenaria', 'Madeira', 'Mista']) : null,
        internet_tem: shouldFill() ? randomItem(['Sim', 'Não']) : null,
        internet_tipo: shouldFill() && Math.random() > 0.3 ? randomItem(['Wi-Fi', 'Dados móveis', 'Fibra ótica']) : undefined,
        internet_sinal: shouldFill() && Math.random() > 0.3 ? randomItem(['Excelente', 'Bom', 'Razoável', 'Ruim']) : undefined,

        // Trabalho
        trabalho_renda_semana: shouldFill() ? randomItem(['Sim', 'Não']) : null,
        trabalho_ajuda_familiar: shouldFill() ? randomItem(['Sim', 'Não']) : null,
        trabalho_vinculo: shouldFill() && Math.random() > 0.4 ? randomItem(['CLT', 'Informal', 'Autônoma', 'Estágio']) : undefined,
        trabalho_horario_inicio: shouldFill() && Math.random() > 0.4 ? '08:00' : undefined,
        trabalho_horario_fim: shouldFill() && Math.random() > 0.4 ? '17:00' : undefined,
        trabalho_uso_dinheiro: shouldFill() && Math.random() > 0.4 ? 'Ajudo em casa e guardo para estudos' : undefined,

        // Renda
        renda_familiar: shouldFill() ? randomItem(RENDAS) : null,
        beneficios_recebe: shouldFill() ? randomItem(['Sim', 'Não']) : null,
        beneficios_cadunico: shouldFill() && Math.random() > 0.6 ? randomItem(['Sim', 'Não']) : undefined,
        beneficios_tipo: shouldFill() && Math.random() > 0.6 ? [randomItem(['Bolsa Família', 'BPC', 'Vale Gás'])] : undefined,
        cesta_basica: shouldFill() ? randomItem(['Sim', 'Não', 'Talvez']) : null,

        // Família e Transporte
        filhos_tem: shouldFill() ? randomItem(['Sim', 'Não']) : null,
        pensao_paga: shouldFill() && Math.random() > 0.8 ? randomItem(['Sim', 'Não']) : undefined,
        pensao_recebe: shouldFill() && Math.random() > 0.8 ? randomItem(['Sim', 'Não']) : undefined,
        transporte_veiculo: shouldFill() ? randomItem(['Sim', 'Não']) : null,
        transporte_meio: shouldFill() ? randomItem(['Ônibus', 'Carro próprio', 'Bicicleta', 'A pé']) : null,
        transporte_auxilio: shouldFill() ? randomItem(['Sim', 'Não']) : null,

        // Saúde
        saude_plano: shouldFill() ? randomItem(['Apenas SUS', 'Apenas Plano', 'Uso os dois']) : null,
        saude_tipo_sanguineo: shouldFill() ? randomItem(TIPOS_SANGUINEOS) : null,
        saude_psicoterapia: shouldFill() ? randomItem(['Sim', 'Não']) : null,
        saude_deficiencia: shouldFill() ? randomItem(['Sim', 'Não']) : null,
        saude_problemas: shouldFill() ? randomItem(['Sim', 'Não']) : null,
        saude_alergias: shouldFill() ? randomItem(['Sim', 'Não', 'Talvez']) : null,
        saude_medicamentos: shouldFill() ? randomItem(['Sim', 'Não']) : null,
        saude_substancias: shouldFill() ? randomItem(['Sim', 'Não']) : null,

        // Cotidiano e Objetivos
        cotidiano_mora_com: shouldFill() ? randomItem(['Mãe e pai', 'Só com mãe', 'Avós', 'Sozinho']) : null,
        cotidiano_relacao: shouldFill() ? 'Tenho um bom relacionamento com minha família' : null,
        cotidiano_historico: shouldFill() ? 'Estudei sempre em escola pública e estou determinado a passar no vestibular' : null,
        objetivo_curso: shouldFill() ? randomItem(CURSOS) : null,
        objetivo_expectativa: shouldFill() ? randomItem(['Passar no vestibular', 'Conseguir bolsa', 'Entrar na faculdade']) : null,
        objetivo_motivacao: shouldFill() ? 'Quero ter uma profissão e ajudar minha família' : null,
        objetivo_temas: shouldFill() && Math.random() > 0.3 ? randomItem(['Redação', 'Matemática', 'Atualidades']) : undefined,
        objetivo_frequencia: shouldFill() ? randomItem(['1x por semana', '2x por semana', '3x por semana']) : null,

        // Consentimento
        lgpd_consentimento: shouldFill() ? true : false
    };

    // Adiciona campos condicionais se validarCondicionais for true
    if (validarCondicionais) {
        // Se usa SUS, deve ter serviços
        if ((entrevista.saude_plano === 'Apenas SUS' || entrevista.saude_plano === 'Uso os dois') && shouldFill()) {
            entrevista.saude_servicos = [randomItem(['UBS – Unidade Básica de Saúde', 'UPA – Unidade de Pronto Atendimento'])];
        }

        // Se faz psicoterapia
        if (entrevista.saude_psicoterapia === 'Sim' && shouldFill()) {
            entrevista.saude_psicoterapia_tempo = randomItem(['6 meses', '1 ano', '2 anos']);
            entrevista.saude_psicoterapia_encerramento = randomItem(['Continuo', 'Já encerrei']);
        }

        // Se tem deficiência
        if (entrevista.saude_deficiencia === 'Sim' && shouldFill()) {
            entrevista.saude_deficiencia_qual = 'Visual';
            entrevista.saude_familiar_deficiencia = randomItem(['Sim', 'Não']);
        }

        // Se tem problemas de saúde
        if (entrevista.saude_problemas === 'Sim' && shouldFill()) {
            entrevista.saude_problemas_qual = randomItem(['Diabetes', 'Hipertensão', 'Asma']);
        }

        // Se tem alergias
        if ((entrevista.saude_alergias === 'Sim' || entrevista.saude_alergias === 'Talvez') && shouldFill()) {
            entrevista.saude_alergias_qual = randomItem(['Poeira', 'Pólen', 'Alimentos']);
        }

        // Se usa medicamentos
        if (entrevista.saude_medicamentos === 'Sim' && shouldFill()) {
            entrevista.saude_medicamentos_qual = randomItem(['Paracetamol', 'Ibuprofeno', 'Antialérgico']);
        }

        // Se usa substâncias
        if (entrevista.saude_substancias === 'Sim' && shouldFill()) {
            entrevista.saude_substancias_qual = 'Álcool socialmente';
        }
    }

    return entrevista;
}

/**
 * Gera um lote de entrevistas com diferentes níveis de completude
 */
function gerarLoteEntrevistas(quantidade = 10) {
    const entrevistas = [];

    for (let i = 0; i < quantidade; i++) {
        // Varia o nível de completude
        let nivelCompletude;
        let validarCondicionais;

        if (i < quantidade * 0.3) {
            // 30% das entrevistas serão completas (90-100%)
            nivelCompletude = randomNumber(90, 100);
            validarCondicionais = true;
        } else if (i < quantidade * 0.6) {
            // 30% serão parcialmente completas (60-89%)
            nivelCompletude = randomNumber(60, 89);
            validarCondicionais = Math.random() > 0.5; // 50% chance de validar condicionais
        } else {
            // 40% serão incompletas (20-59%)
            nivelCompletude = randomNumber(20, 59);
            validarCondicionais = false;
        }

        entrevistas.push({
            id: i + 1,
            nivelCompletude,
            validarCondicionais,
            dados: gerarEntrevista(nivelCompletude, validarCondicionais)
        });
    }

    return entrevistas;
}

// ============================================================================
// EXPORTAR DADOS
// ============================================================================

const loteEntrevistas = gerarLoteEntrevistas(20);

console.log('📊 Lote de Entrevistas Gerado\n');
console.log(`Total: ${loteEntrevistas.length} entrevistas`);
console.log('\nDistribuição:');

const completas = loteEntrevistas.filter(e => e.nivelCompletude >= 90).length;
const parciais = loteEntrevistas.filter(e => e.nivelCompletude >= 60 && e.nivelCompletude < 90).length;
const incompletas = loteEntrevistas.filter(e => e.nivelCompletude < 60).length;

console.log(`  ✅ Completas (90-100%): ${completas}`);
console.log(`  ⚠️  Parciais (60-89%): ${parciais}`);
console.log(`  ❌ Incompletas (0-59%): ${incompletas}`);

console.log('\nEntrevistas geradas:');
loteEntrevistas.forEach(e => {
    const emoji = e.nivelCompletude >= 90 ? '✅' : e.nivelCompletude >= 60 ? '⚠️' : '❌';
    const nome = e.dados.nome_preferido || e.dados.nome_civil_completo || '[Não informado]';
    console.log(`  ${emoji} Entrevista #${e.id} - ${e.nivelCompletude}% completo - Nome: ${nome}`);
});

// Exportar como JSON
import fs from 'fs';
const outputPath = './tests/entrevistas_geradas.json';
fs.writeFileSync(outputPath, JSON.stringify(loteEntrevistas, null, 2));
console.log(`\n💾 Dados salvos em: ${outputPath}`);
