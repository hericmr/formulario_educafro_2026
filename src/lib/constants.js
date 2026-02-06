export const FORM_STEPS = [
    { id: 'identificacao', title: 'Identificação', fields: ['entrevistador', 'data_entrevista'] },
    { id: 'dados_pessoais', title: 'Dados Pessoais', fields: ['nome_social', 'nome_social_diferente', 'telefone', 'email', 'data_nascimento', 'cpf', 'rg', 'cidade', 'naturalidade', 'endereco', 'bairro', 'estado_civil'] },
    { id: 'raca_pronomes', title: 'Raça e Cor', fields: ['raca_cor'] },
    { id: 'genero_orientacao', title: 'Gênero e Orientação', fields: ['genero', 'trans_travesti', 'orientacao_sexual'] },
    { id: 'escolaridade_familia', title: 'Escolaridade e Filiação', fields: ['escolaridade', 'nome_mae', 'nome_pai'] },
    { id: 'vinculo_familiar', title: 'Vínculo Familiar', fields: ['familiar_nucleo'] },
    { id: 'moradia_internet', title: 'Moradia e Internet', fields: ['moradia_condicao', 'moradia_tipo', 'internet_tem'] },
    { id: 'trabalho_renda', title: 'Trabalho e Atividade', fields: ['trabalho_renda_semana', 'trabalho_ajuda_familiar'] },
    { id: 'renda_beneficios', title: 'Renda e Benefícios', fields: ['renda_familiar', 'beneficios_recebe', 'cesta_basica'] },
    { id: 'familia_transporte_saude', title: 'Família, Transporte e Saúde', fields: ['filhos_tem', 'transporte_veiculo', 'transporte_meio', 'saude_plano', 'saude_servicos', 'saude_tipo_sanguineo', 'saude_psicoterapia', 'saude_deficiencia', 'saude_problemas', 'saude_alergias', 'saude_medicamentos', 'saude_substancias'] },
    { id: 'cotidiano_objetivo', title: 'Cotidiano e Objetivos', fields: ['cotidiano_mora_com', 'cotidiano_mora_com_quem', 'cotidiano_relacao', 'objetivo_educafro'] },
];

export const ASSISTENTES_SOCIAIS = [
    'Ana Lucia Fernandes',
    'Leticia Yumy',
    'Marcel Vaques',
    'Héric Moura',
    'Luzinete Reis',
    'Outro'
];

export const CIDADES_BAIXADA = [
    'Santos',
    'São Vicente',
    'Guarujá',
    'Praia Grande',
    'Cubatão',
    'Bertioga',
    'Itanhaém',
    'Mongaguá',
    'Peruíbe',
    'Outra'
];

export const ESTADO_CIVIL = [
    'Solteiro(a)',
    'Casado(a)',
    'Divorciado(a)',
    'Viúvo(a)',
    'União Estável'
];

export const RACA_COR = [
    'Preto/a/e',
    'Pardo/a/e',
    'Branco/a/e',
    'Amarelo/a/e',
    'Indígena'
];

export const GENERO = [
    'Feminina',
    'Masculina',
    'Não binárie',
    'Outro'
];

export const ORIENTACAO_SEXUAL = [
    'Lésbica',
    'Gay',
    'Bissexual',
    'Heterossexual',
    'Outra',
    'Prefiro não declarar'
];

export const ESCOLARIDADE_OPTIONS = [
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

export const ESCOLA_ORIGEM = [
    'Sempre Pública',
    'Sempre Particular (com bolsa)',
    'Sempre Particular (sem bolsa)',
    'Mista (Parte Pública / Parte Particular)'
];

export const VINCULO_FAMILIAR = [
    'Mãe', 'Pai', 'Mãe adotiva', 'Pai adotivo',
    'Madrasta', 'Padrasto',
    'Irmão', 'Irmã', 'Meio-irmão', 'Meia-irmã', 'Irmão adotivo', 'Irmã adotiva',
    'Cônjuge', 'Companheiro(a)',
    'Sogra', 'Genro', 'Nora',
    'Filho', 'Filha', 'Neto', 'Neta', 'Bisneto', 'Bisneta',
    'Avô', 'Avó', 'Tio', 'Tia', 'Primo', 'Prima',
    'Tutor(a)', 'Guardião(ã)',
    'Parente distante', 'Cunhado(a)',
    'Outro (por favor, especifique)',
    'Não tenho vínculo familiar relevante',
    'Não'
];

export const CONDICAO_MORADIA = [
    'Própria',
    'Alugada',
    'Cedida',
    'Outro'
];

export const TIPO_CONSTRUCAO = [
    'Alvenaria',
    'Madeira',
    'Mista',
    'Outro'
];

export const RENDA_FAMILIAR = [
    'Até 300,00',
    'De R$ 301,00 a R$ 500,00',
    'De R$ 501,00 a R$ 800,00',
    'De R$ 801,00 a R$ 1.045,00',
    'De R$ 1.046,00 R$ 2080,00',
    'De R$ 2081,00 a R$ 3.120,00',
    'De R$ 3.120,00 a R$ 4.160,00',
    'De R$ 4.161,00 a 5.200,00',
    'Acima de R$ 5.201,00',
    'Outro'
];

export const SERVICOS_SUS = [
    'UPA – Unidade de Pronto Atendimento',
    'UBS – Unidade Básica de Saúde',
    'AME – Ambulatório Médico de Especialidades',
    'CAPS – Centro de Atenção Psicossocial',
    'CAPS I',
    'CAPS AD',
    'SECRAIDS / CTA – Centro de Testagem e Aconselhamento',
    'SEAMBESP – Seção Ambulatorial de Especialidades',
    'PAIVAS – Programa de Atenção Integral às Vítimas de Violência Sexual',
    'Instituto da Mulher e Gestante',
    'NAPS',
    'Outro'
];

export const TIPO_SANGUINEO = [
    'A+', 'A-',
    'B+', 'B-',
    'AB+', 'AB-',
    'O+', 'O-',
    'Não sei',
    'Prefiro não informar'
];
