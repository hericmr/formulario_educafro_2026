-- Adicionar colunas para a seção SAÚDE na tabela 'entrevistas'

ALTER TABLE entrevistas
ADD COLUMN IF NOT EXISTS saude_plano text,
ADD COLUMN IF NOT EXISTS saude_servicos text[], -- Array de textos para múltipla escolha
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

-- Comentários para documentação (opcional)
COMMENT ON COLUMN entrevistas.saude_plano IS 'Acesso aos serviços de saúde (SUS, Plano, Ambos)';
COMMENT ON COLUMN entrevistas.saude_servicos IS 'Lista de serviços do SUS utilizados';
COMMENT ON COLUMN entrevistas.saude_tipo_sanguineo IS 'Tipo sanguíneo do entrevistado';
