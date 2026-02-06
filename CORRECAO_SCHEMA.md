# 🔧 Correção do Schema do Banco de Dados

## ❌ Problema Identificado

Os erros de inserção ocorrem porque a tabela `entrevistas` no Supabase foi criada com:
- **Tipos ENUM** ao invés de TEXT
- **Restrições NOT NULL** em campos opcionais
- **ENUMs não aceitam strings vazias** (`""`)
- **ENUMs não aceitam valores não definidos** (ex: "Héric Moura" e "Luzinete Reis" como `assistente_type`)

### Erros encontrados:
1. ❌ `invalid input value for enum assistente_type: "Héric Moura"`
2. ❌ `invalid input value for enum estado_civil_type: ""`
3. ❌ `invalid input value for enum raca_cor_type: ""`
4. ❌ `invalid input syntax for type date: ""`
5. ❌ `null value in column "nome_completo" violates not-null constraint`

## ✅ Solução

### Passo 1: Aplicar o Novo Schema no Supabase

1. **Acesse o Supabase**: https://app.supabase.com
2. **Selecione o projeto**: `czpkifgudgdpvrvvqaoz`
3. **Abra o SQL Editor** (menu lateral)
4. **Copie todo o conteúdo** do arquivo: `supabase_fix_schema.sql`
5. **Cole no editor SQL**
6. **Execute** (Ctrl+Enter ou botão "Run")

⚠️ **IMPORTANTE**: Este script vai **RECRIAR** a tabela `entrevistas` do zero. 
- Todos os dados existentes serão **PERDIDOS**
- Isto é SEGURO em desenvolvimento
- Em produção, seria necessário migração de dados

### Passo 2: Verificar se Funcionou

Execute no SQL Editor do Supabase:

```sql
-- Verifica se a tabela foi criada
SELECT 
    column_name, 
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'entrevistas'
ORDER BY ordinal_position;
```

Você deve ver todas as colunas como tipo `text` (não mais como ENUM).

### Passo 3: Verificar as Políticas RLS

```sql
-- Verifica as políticas de segurança
SELECT * FROM pg_policies WHERE tablename = 'entrevistas';
```

Você deve ver 4 políticas:
- ✅ "Permitir inserção anônima"
- ✅ "Permitir leitura anônima"  
- ✅ "Permitir atualização anônima"
- ✅ "Permitir exclusão anônima"

## 🧪 Passo 4: Testar a Inserção

Depois de aplicar o schema, execute no terminal:

```bash
# Gerar novos dados de teste (corrigidos para usar null ao invés de "")
node tests/gerador_dados_teste.js

# Inserir no Supabase
node tests/inserir_dados_supabase.js
```

### Resultado Esperado:

```
✅ Entrevista #1 inserida com sucesso - Nome: Maria Silva Santos
✅ Entrevista #2 inserida com sucesso - Nome: João Oliveira Costa
...
📊 Total de entrevistas processadas: 20
   ✅ Inseridas com sucesso: 20 (100.0%)
   ❌ Falhas: 0 (0.0%)
```

## 📋 Mudanças Realizadas

### 1. **Arquivo**: `supabase_fix_schema.sql` (NOVO)
- **Recria a tabela** `entrevistas` do zero
- **Usa tipos TEXT** ao invés de ENUM (mais flexível)
- **Remove restrições NOT NULL** para campos opcionais
- **Mantém políticas RLS** para permitir inserção anônima

### 2. **Arquivo**: `tests/gerador_dados_teste.js` (MODIFICADO)
- **Mudou de `""` para `null`** quando `shouldFill()` retorna false
- Evita envio de strings vazias para campos DATE e ENUM

### 3. **Arquivo**: `tests/inserir_dados_supabase.js` (MODIFICADO)
- **Adicionou função `limparDados()`** que remove campos null/undefined
- Envia apenas campos preenchidos para o Supabase

## 🎯 Benefícios

✅ **Flexibilidade**: Campos TEXT aceitam qualquer valor  
✅ **Sem erros de validação**: Não há mais restrições ENUM  
✅ **Campos opcionais**: Pode enviar ou omitir campos  
✅ **Dados limpos**: Remove null/undefined antes de inserir  

## ⚠️ Avisos

- ⚠️ A tabela será **RECRIADA** - dados existentes serão perdidos
- ⚠️ Em produção, seria necessário fazer **migração de dados**
- ⚠️ As validações agora ficam **apenas no frontend**

## 🔍 Diagnóstico (se algo der errado)

Execute no SQL Editor:

```sql
-- Diagnóstico completo
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

## 📞 Próximos Passos

Após corrigir:

1. ✅ Testar inserção de dados
2. ✅ Verificar se o formulário web funciona
3. ✅ Validar dados inseridos
4. ✅ Criar backup antes de ir para produção
