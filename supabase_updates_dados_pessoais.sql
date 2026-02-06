-- Atualização da seção Dados Pessoais (Nome Preferencial)

ALTER TABLE entrevistas
ADD COLUMN IF NOT EXISTS nome_preferencial text,
ADD COLUMN IF NOT EXISTS nome_social_diferente text,
ADD COLUMN IF NOT EXISTS nome_documento text;

COMMENT ON COLUMN entrevistas.nome_preferencial IS 'Nome pelo qual a pessoa prefere ser chamada (Social)';
COMMENT ON COLUMN entrevistas.nome_documento IS 'Nome civil conforme documento (se diferente do social)';
