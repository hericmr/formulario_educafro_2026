# 🗄️ Guia de Configuração do Banco de Dados Supabase

## 📌 Problema Atual

A tabela `entrevistas` no Supabase está **vazia** porque faltam as colunas necessárias e as políticas de segurança (RLS) podem estar bloqueando inserções.

## ✅ Solução Passo a Passo

### **Passo 1: Acessar o Supabase**

1. Acesse: https://app.supabase.com
2. Faça login na sua conta
3. Selecione o projeto: **`czpkifgudgdpvrvvqaoz`**

### **Passo 2: Abrir SQL Editor**

1. No menu lateral, clique em **"SQL Editor"**
2. Clique em **"New Query"** (Nova Consulta)

### **Passo 3: Executar o Schema SQL**

1. Copie **TODO** o conteúdo do arquivo: `supabase_schema_completo.sql`
2. Cole no editor SQL do Supabase
3. Clique em **"Run"** (Executar) ou pressione `Ctrl+Enter`
4. Aguarde a execução (pode levar alguns segundos)

### **Passo 4: Verificar se Funcionou**

Após executar o SQL, você deve ver mensagens de sucesso. Para verificar:

```sql
-- Verifique as colunas da tabela
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'entrevistas'
ORDER BY ordinal_position;
```

Você deve ver todas as colunas listadas (nome_preferencial, data_nascimento, email, etc.)

### **Passo 5: Verificar as Políticas RLS**

```sql
-- Verifique as políticas de segurança
SELECT * FROM pg_policies WHERE tablename = 'entrevistas';
```

Você deve ver 3 políticas:
- ✅ "Permitir inserção anônima"
- ✅ "Permitir leitura anônima"  
- ✅ "Permitir atualização anônima"

## 🧪 Testar a Inserção

Depois de aplicar o schema, volte ao terminal e execute:

```bash
# Gerar novos dados de teste
node tests/gerador_dados_teste.js

# Inserir no Supabase
node tests/inserir_dados_supabase.js
```

Se tudo estiver correto, você verá mensagens de sucesso:

```
✅ Entrevista #1 inserida com sucesso - Nome: Maria Silva
✅ Entrevista #2 inserida com sucesso - Nome: João Santos
...
📊 Total de entrevistas na tabela: 20
```

## ⚠️ Problemas Comuns

### Erro: "Could not find column"

**Causa**: O schema não foi aplicado ou aplicou parcialmente  
**Solução**: Execute o `supabase_schema_completo.sql` novamente

### Erro: "new row violates row-level security policy"

**Causa**: As políticas RLS estão bloqueando inserções  
**Solução**: Execute a parte de políticas RLS do schema novamente:

```sql
ALTER TABLE entrevistas ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Permitir inserção anônima" ON entrevistas;
DROP POLICY IF EXISTS "Permitir leitura anônima" ON entrevistas;

CREATE POLICY "Permitir inserção anônima" ON entrevistas
FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Permitir leitura anônima" ON entrevistas
FOR SELECT TO anon USING (true);
```

### Tabela continua vazia após inserção

**Diagnóstico**: Execute no SQL Editor:

```sql
-- Ver total de registros
SELECT COUNT(*) FROM entrevistas;

-- Ver últimos 5 registros
SELECT id, nome_preferencial, email, created_at 
FROM entrevistas 
ORDER BY created_at DESC 
LIMIT 5;
```

Se aparecer `0` registros, verifique:
1. ✓ As políticas RLS estão ativas?
2. ✓ A chave `VITE_SUPABASE_ANON_KEY` está correta?
3. ✓ O script de inserção não retornou erros?

## 📊 Estrutura da Tabela

Após aplicar o schema, a tabela `entrevistas` terá aproximadamente **70+ colunas** organizadas em:

- 🆔 **Identificação** (2 campos)
- 👤 **Dados Pessoais** (13 campos)
- 🎨 **Raça e Identidade** (5 campos)
- 👨‍👩‍👧‍👦 **Família e Escolaridade** (9 campos)
- 🏠 **Moradia** (5 campos)
- 💼 **Trabalho e Renda** (12 campos)
- 🚌 **Transporte** (4 campos)
- 🏥 **Saúde** (19 campos)
- 🎯 **Objetivos Educacionais** (8 campos)
- ✅ **Consentimento LGPD** (1 campo)

## 🔐 Segurança (RLS)

As políticas configuradas permitem que **qualquer usuário anônimo** (usando a chave `anon`) possa:
- ✅ Inserir entrevistas (`INSERT`)
- ✅ Ler entrevistas (`SELECT`)
- ✅ Atualizar entrevistas (`UPDATE`)

⚠️ **IMPORTANTE**: Em produção, você pode querer restringir essas permissões!

## 📝 Próximos Passos

Depois que o schema estiver aplicado e os dados inseridos:

1. ✅ Verificar se o formulário web consegue inserir dados
2. ✅ Criar views para relatórios
3. ✅ Adicionar validações no banco se necessário
4. ✅ Configurar backups automáticos
5. ✅ Ajustar políticas RLS para produção

## 🆘 Se Nada Funcionar

Execute este comando de **diagnóstico completo** no SQL Editor:

```sql
-- DIAGNÓSTICO COMPLETO
SELECT 
    'Total de colunas' as check_name,
    COUNT(*)::text as resultado
FROM information_schema.columns
WHERE table_name = 'entrevistas'

UNION ALL

SELECT 
    'Total de registros',
    COUNT(*)::text
FROM entrevistas

UNION ALL

SELECT 
    'RLS está ativo?',
    CASE 
        WHEN relrowsecurity THEN 'SIM ✅'
        ELSE 'NÃO ❌'
    END
FROM pg_class
WHERE relname = 'entrevistas'

UNION ALL

SELECT 
    'Políticas ativas',
    COUNT(*)::text
FROM pg_policies
WHERE tablename = 'entrevistas';
```

Cole o resultado aqui e podemos debugar juntos! 🔍
