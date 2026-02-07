import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://czpkifgudgdpvrvvqaoz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6cGtpZmd1ZGdkcHZydnZxYW96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzODI3MzksImV4cCI6MjA4NTk1ODczOX0.ud_MYn1zMibj07HL3WlkgJT8qzH6-goWUkPqSODEpnU';

const supabase = createClient(supabaseUrl, supabaseKey);

const fullTestData = {
    entrevistador: "João Silva",
    data_entrevista: "2026-02-06",
    nome_completo: "Nome Teste Completo",
    telefone: "(13) 99999-9999",
    email: "teste@example.com",
    data_nascimento: "2000-01-01",
    cpf: "123.456.789-00",
    rg: "12.345.678-9",
    estado_civil: "Solteiro(a)",
    cidade: "Santos",
    naturalidade: "Santos - SP",
    bairro: "Centro",
    endereco: "Rua Teste, 123",
    raca_cor: "Preto/a/e",
    genero: "Masculina",
    trans_travesti: "Não",
    orientacao_sexual: "Heterossexual",
    orientacao_sexual_outra: "",
    escolaridade: "Ensino Médio Completo",
    escola_publica_privada: "Sempre Pública",
    nome_mae: "Mãe Teste",
    profissao_mae: "Do Lar",
    escolaridade_mae: "Ensino Fundamental completo",
    nome_pai: "Pai Teste",
    profissao_pai: "Trabalhador",
    escolaridade_pai: "Ensino Médio completo",
    familiar_nucleo: "Sim",
    vinculo_familiar: "Irmão",
    nome_familiar: "Familiar Teste",
    moradia_condicao: "Própria",
    moradia_tipo: "Alvenaria",
    internet_tem: "Sim",
    internet_tipo: "Wi-Fi (Banda Larga)",
    internet_sinal: "Sim",
    trabalho_renda_semana: "Sim",
    trabalho_ajuda_familiar: "Não",
    trabalho_vinculo: "Registrado CLT",
    trabalho_horario_inicio: "08:00",
    trabalho_horario_fim: "17:00",
    trabalho_uso_dinheiro: "Gastos pessoais",
    renda_familiar: "De R$ 1.046,00 R$ 2080,00",
    beneficios_recebe: "Sim",
    beneficios_cadunico: "Sim",
    beneficios_tipo: ["Bolsa Família"],
    cesta_basica: "Não",
    filhos_tem: "Não",
    pensao_paga: "Não",
    pensao_recebe: "Não",
    transporte_veiculo: "Não",
    transporte_meio: "Transporte público (ônibus, VLT)",
    transporte_auxilio: "Sim",
    saude_plano: "Apenas SUS",
    saude_servicos: ["UBS – Unidade Básica de Saúde"],
    saude_servicos_outro: "",
    saude_tipo_sanguineo: "O+",
    saude_psicoterapia: "Não",
    saude_psicoterapia_outro: "",
    saude_psicoterapia_tempo: "",
    saude_psicoterapia_encerramento: "",
    saude_deficiencia: "Não",
    saude_deficiencia_qual: "",
    saude_familiar_deficiencia: "Não",
    saude_familia_deficiencia_qual: "",
    saude_problemas: "Não",
    saude_problemas_qual: "",
    saude_alergias: "Não",
    saude_alergias_qual: "",
    saude_medicamentos: "Não",
    saude_medicamentos_qual: "",
    saude_substancias: "Não",
    saude_substancias_qual: "",
    cotidiano_mora_com: "Não",
    cotidiano_mora_com_quem: "Mãe e Pai",
    cotidiano_relacao: "Boa",
    cotidiano_historico: "Sonho em ser médico",
    objetivo_curso: "Medicina",
    objetivo_expectativa: "Feliz",
    objetivo_educafro: "Preparatório para vestibular",
    objetivo_temas: "Racismo",
    objetivo_frequencia: "Sábados"
};

async function testInsertion() {
    console.log("Iniciando teste de inserção...");
    const { data, error } = await supabase
        .from('entrevistas')
        .insert([fullTestData])
        .select();

    if (error) {
        console.error("Erro ao inserir:", error.message);
        console.error("Detalhes:", error.details);
        console.error("Dica:", error.hint);
    } else {
        console.log("Inserção realizada com sucesso!");
        console.log("Dados inseridos:", data);
    }
}

testInsertion();
