-- ============================================================================
-- SCHEMA COMPLETO DA TABELA ENTREVISTAS - EDUCAFRO 2026
-- ============================================================================
-- Este arquivo contém todos os comandos ALTER TABLE necessários para
-- atualizar a estrutura da tabela 'entrevistas' no Supabase
-- ============================================================================

-- SEÇÃO 1: IDENTIFICAÇÃO
ALTER TABLE entrevistas
ADD COLUMN IF NOT EXISTS entrevistador text,
ADD COLUMN IF NOT EXISTS data_entrevista date;

-- SEÇÃO 2: DADOS PESSOAIS
ALTER TABLE entrevistas
ADD COLUMN IF NOT EXISTS nome_preferencial text,
ADD COLUMN IF NOT EXISTS nome_social_diferente text,
ADD COLUMN IF NOT EXISTS nome_documento text,
ADD COLUMN IF NOT EXISTS telefone text,
ADD COLUMN IF NOT EXISTS email text,
ADD COLUMN IF NOT EXISTS data_nascimento date,
ADD COLUMN IF NOT EXISTS cpf text,
ADD COLUMN IF NOT EXISTS rg text,
ADD COLUMN IF NOT EXISTS cidade text,
ADD COLUMN IF NOT EXISTS naturalidade text,
ADD COLUMN IF NOT EXISTS endereco text,
ADD COLUMN IF NOT EXISTS bairro text,
ADD COLUMN IF NOT EXISTS estado_civil text;

-- SEÇÃO 3: RAÇA E PRONOMES
ALTER TABLE entrevistas
ADD COLUMN IF NOT EXISTS raca_cor text;

-- SEÇÃO 4: GÊNERO E ORIENTAÇÃO
ALTER TABLE entrevistas
ADD COLUMN IF NOT EXISTS genero text,
ADD COLUMN IF NOT EXISTS trans_travesti text,
ADD COLUMN IF NOT EXISTS nome_social text,
ADD COLUMN IF NOT EXISTS orientacao_sexual text,
ADD COLUMN IF NOT EXISTS orientacao_sexual_outra text;

-- SEÇÃO 5: ESCOLARIDADE E FAMÍLIA
ALTER TABLE entrevistas
ADD COLUMN IF NOT EXISTS escolaridade text,
ADD COLUMN IF NOT EXISTS escolaridade_curso text,
ADD COLUMN IF NOT EXISTS escola_publica_privada text,
ADD COLUMN IF NOT EXISTS nome_mae text,
ADD COLUMN IF NOT EXISTS profissao_mae text,
ADD COLUMN IF NOT EXISTS escolaridade_mae text,
ADD COLUMN IF NOT EXISTS nome_pai text,
ADD COLUMN IF NOT EXISTS profissao_pai text,
ADD COLUMN IF NOT EXISTS escolaridade_pai text;

-- SEÇÃO 6: VÍNCULO FAMILIAR
ALTER TABLE entrevistas
ADD COLUMN IF NOT EXISTS familiar_nucleo text,
ADD COLUMN IF NOT EXISTS vinculo_familiar text,
ADD COLUMN IF NOT EXISTS nome_familiar text;

-- SEÇÃO 7: MORADIA E INTERNET
ALTER TABLE entrevistas
ADD COLUMN IF NOT EXISTS moradia_condicao text,
ADD COLUMN IF NOT EXISTS moradia_tipo text,
ADD COLUMN IF NOT EXISTS internet_tem text,
ADD COLUMN IF NOT EXISTS internet_tipo text,
ADD COLUMN IF NOT EXISTS internet_sinal text;

-- SEÇÃO 8: TRABALHO E RENDA
ALTER TABLE entrevistas
ADD COLUMN IF NOT EXISTS trabalho_renda_semana text,
ADD COLUMN IF NOT EXISTS trabalho_ajuda_familiar text,
ADD COLUMN IF NOT EXISTS trabalho_vinculo text,
ADD COLUMN IF NOT EXISTS trabalho_horario_inicio text,
ADD COLUMN IF NOT EXISTS trabalho_horario_fim text,
ADD COLUMN IF NOT EXISTS trabalho_uso_dinheiro text;

-- SEÇÃO 9: RENDA E BENEFÍCIOS
ALTER TABLE entrevistas
ADD COLUMN IF NOT EXISTS renda_familiar text,
ADD COLUMN IF NOT EXISTS beneficios_recebe text,
ADD COLUMN IF NOT EXISTS beneficios_cadunico text,
ADD COLUMN IF NOT EXISTS beneficios_tipo text[],
ADD COLUMN IF NOT EXISTS cesta_basica text;

-- SEÇÃO 10: FAMÍLIA E TRANSPORTE
ALTER TABLE entrevistas
ADD COLUMN IF NOT EXISTS filhos_tem text,
ADD COLUMN IF NOT EXISTS pensao_paga text,
ADD COLUMN IF NOT EXISTS pensao_recebe text,
ADD COLUMN IF NOT EXISTS transporte_veiculo text,
ADD COLUMN IF NOT EXISTS transporte_meio text,
ADD COLUMN IF NOT EXISTS transporte_auxilio text;

-- SEÇÃO 11: SAÚDE
ALTER TABLE entrevistas
ADD COLUMN IF NOT EXISTS saude_plano text,
ADD COLUMN IF NOT EXISTS saude_servicos text[],
ADD COLUMN IF NOT EXISTS saude_servicos_outro text,
ADD COLUMN IF NOT EXISTS saude_tipo_sanguineo text,
ADD COLUMN IF NOT EXISTS saude_psicoterapia text,
ADD COLUMN IF NOT EXISTS saude_psicoterapia_outro text,
ADD COLUMN IF NOT EXISTS saude_psicoterapia_tempo text,
ADD COLUMN IF NOT EXISTS saude_psicoterapia_encerramento text,
ADD COLUMN IF NOT EXISTS saude_deficiencia text,
ADD COLUMN IF NOT EXISTS saude_deficiencia_qual text,
ADD COLUMN IF NOT EXISTS saude_familiar_deficiencia text,
ADD COLUMN IF NOT EXISTS saude_familia_deficiencia_qual text,
ADD COLUMN IF NOT EXISTS saude_problemas text,
ADD COLUMN IF NOT EXISTS saude_problemas_qual text,
ADD COLUMN IF NOT EXISTS saude_alergias text,
ADD COLUMN IF NOT EXISTS saude_alergias_qual text,
ADD COLUMN IF NOT EXISTS saude_medicamentos text,
ADD COLUMN IF NOT EXISTS saude_medicamentos_qual text,
ADD COLUMN IF NOT EXISTS saude_substancias text,
ADD COLUMN IF NOT EXISTS saude_substancias_qual text;

-- SEÇÃO 12: COTIDIANO E OBJETIVOS
ALTER TABLE entrevistas
ADD COLUMN IF NOT EXISTS cotidiano_mora_com text,
ADD COLUMN IF NOT EXISTS cotidiano_relacao text,
ADD COLUMN IF NOT EXISTS cotidiano_historico text,
ADD COLUMN IF NOT EXISTS objetivo_curso text,
ADD COLUMN IF NOT EXISTS objetivo_expectativa text,
ADD COLUMN IF NOT EXISTS objetivo_motivacao text,
ADD COLUMN IF NOT EXISTS objetivo_temas text,
ADD COLUMN IF NOT EXISTS objetivo_frequencia text;

-- SEÇÃO 13: CONSENTIMENTO LGPD
ALTER TABLE entrevistas
ADD COLUMN IF NOT EXISTS lgpd_consentimento boolean DEFAULT false;

-- ============================================================================
-- COMENTÁRIOS NAS COLUNAS (DOCUMENTAÇÃO)
-- ============================================================================

COMMENT ON COLUMN entrevistas.nome_preferencial IS 'Nome pelo qual a pessoa prefere ser chamada (Social)';
COMMENT ON COLUMN entrevistas.nome_documento IS 'Nome civil conforme documento (se diferente do social)';
COMMENT ON COLUMN entrevistas.data_nascimento IS 'Data de nascimento do entrevistado';
COMMENT ON COLUMN entrevistas.raca_cor IS 'Raça/Cor autodeclarada';
COMMENT ON COLUMN entrevistas.genero IS 'Identidade de gênero';
COMMENT ON COLUMN entrevistas.trans_travesti IS 'Se a pessoa é trans ou travesti';
COMMENT ON COLUMN entrevistas.orientacao_sexual IS 'Orientação sexual';
COMMENT ON COLUMN entrevistas.saude_servicos IS 'Array com os serviços de saúde utilizados';
COMMENT ON COLUMN entrevistas.beneficios_tipo IS 'Array com os tipos de benefícios recebidos';
COMMENT ON COLUMN entrevistas.lgpd_consentimento IS 'Consentimento para uso dos dados conforme LGPD';

-- ============================================================================
-- ÍNDICES PARA MELHOR PERFORMANCE
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_entrevistas_data_entrevista ON entrevistas(data_entrevista);
CREATE INDEX IF NOT EXISTS idx_entrevistas_entrevistador ON entrevistas(entrevistador);
CREATE INDEX IF NOT EXISTS idx_entrevistas_cidade ON entrevistas(cidade);
CREATE INDEX IF NOT EXISTS idx_entrevistas_raca_cor ON entrevistas(raca_cor);
CREATE INDEX IF NOT EXISTS idx_entrevistas_genero ON entrevistas(genero);
CREATE INDEX IF NOT EXISTS idx_entrevistas_objetivo_curso ON entrevistas(objetivo_curso);

-- ============================================================================
-- POLÍTICA RLS (Row Level Security) - PERMITIR INSERÇÃO E LEITURA
-- ============================================================================

-- Ativa RLS na tabela (se ainda não estiver ativo)
ALTER TABLE entrevistas ENABLE ROW LEVEL SECURITY;

-- Remove políticas antigas se existirem
DROP POLICY IF EXISTS "Permitir inserção anônima" ON entrevistas;
DROP POLICY IF EXISTS "Permitir leitura anônima" ON entrevistas;
DROP POLICY IF EXISTS "Permitir atualização anônima" ON entrevistas;

-- Política para permitir INSERT (criar novas entrevistas)
CREATE POLICY "Permitir inserção anônima" ON entrevistas
FOR INSERT
TO anon
WITH CHECK (true);

-- Política para permitir SELECT (ler entrevistas)
CREATE POLICY "Permitir leitura anônima" ON entrevistas
FOR SELECT
TO anon
USING (true);

-- Política para permitir UPDATE (atualizar entrevistas)
CREATE POLICY "Permitir atualização anônima" ON entrevistas
FOR UPDATE
TO anon
USING (true)
WITH CHECK (true);

-- ============================================================================
-- VERIFICAÇÃO FINAL
-- ============================================================================

-- Verifica quantas colunas foram adicionadas
SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns
WHERE table_name = 'entrevistas'
ORDER BY ordinal_position;
