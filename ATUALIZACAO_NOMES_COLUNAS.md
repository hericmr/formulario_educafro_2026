# 📝 Atualização dos Nomes de Colunas - Schema do Supabase

## ✨ Mudanças Realizadas

### Nomes de Colunas Atualizados

| Nome Antigo | Nome Novo | Descrição |
|-------------|-----------|-----------|
| `nome_completo` | ❌ **REMOVIDO** | Campo legado removido |
| `nome_preferencial` | ✅ `nome_preferido` | Nome pelo qual prefere ser chamado |
| `nome_documento` | ✅ `nome_civil_completo` | Nome completo no documento (RG/CPF) |
| `nome_social_diferente` | ❌ **REMOVIDO** | Campo desnecessário removido |
| `nome_social` | ✅ `nome_social` | Mantido (se diferente do nome civil) |

### 📊 Nova Estrutura de Dados Pessoais

```sql
-- SEÇÃO 2: DADOS PESSOAIS
nome_civil_completo text,    -- Nome completo conforme documento de identidade
nome_social text,              -- Nome social (se diferente do nome civil)
nome_preferido text,           -- Nome pelo qual prefere ser chamado no dia a dia
telefone text,
email text,
data_nascimento date,
cpf text,
rg text,
cidade text,
naturalidade text,
endereco text,
bairro text,
estado_civil text
```

## 📁 Arquivos Modificados

### 1. **Schema SQL** (`supabase_fix_schema.sql`)
- ✅ Renomeadas colunas de nome
- ✅ Removidos campos duplicados
- ✅ Atualizados comentários das colunas

### 2. **Gerador de Dados de Teste** (`tests/gerador_dados_teste.js`)
- ✅ Atualizado para usar `nome_civil_completo`
- ✅ Atualizado para usar `nome_preferido`
- ✅ Adicionada lógica para `nome_social` (20% de chance)
- ✅ `nome_preferido` usa o primeiro nome por padrão

### 3. **Script de Inserção** (`tests/inserir_dados_supabase.js`)
- ✅ Logs atualizados para usar novos nomes
- ✅ Queries atualizadas
- ✅ Fallback: tenta `nome_preferido`, depois `nome_civil_completo`

### 4. **Constantes do Formulário** (`src/lib/constants.js`)
- ✅ Atualizado `FORM_STEPS` com novos nomes de campos
- ✅ Mantida compatibilidade com o resto do sistema

## 🎯 Lógica dos Nomes

A nova estrutura segue este fluxo:

1. **Nome Civil Completo** (`nome_civil_completo`)
   - Nome LEGAL no documento (RG, CPF)
   - Exemplo: "João Pedro Silva Santos"

2. **Nome Social** (`nome_social`)
   - Usado se a pessoa tem um nome social diferente do civil
   - Geralmente usado por pessoas trans/travestis
   - Exemplo: "Maria Silva Santos" (quando o civil é masculino)
   - **Opcional** - só preenchido se diferente do civil

3. **Nome Preferido** (`nome_preferido`)
   - Nome pelo qual a pessoa quer ser chamada no dia a dia
   - Pode ser um apelido, primeiro nome, ou nome completo
   - Exemplo: "JP", "João Pedro", "Pedro"
   - **Prioridade na exibição** - é o primeiro que tentamos mostrar

## 🔄 Fluxo de Exibição

Nos logs e interfaces, usamos a seguinte ordem de prioridade:

```javascript
const nomeExibicao = nome_preferido || nome_civil_completo || '[Sem nome]';
```

## ✅ Teste Realizado

```bash
node tests/gerador_dados_teste.js
```

**Resultado:**
✅ 20 entrevistas geradas com sucesso
✅ Campos `nome_preferido` e `nome_civil_completo` funcionando
✅ `nome_social` gerado em ~20% dos casos (quando aplicável)

## 📋 Próximos Passos

1. **Aplicar o schema atualizado no Supabase**:
   ```bash
   # 1. Acesse https://app.supabase.com
   # 2. Abra SQL Editor
   # 3. Execute o conteúdo de: supabase_fix_schema.sql
   ```

2. **Testar inserção**:
   ```bash
   node tests/inserir_dados_supabase.js
   ```

3. **Atualizar componentes React** (próxima etapa):
   - Atualizar `DadosPessoais.jsx` para usar novos nomes
   - Ajustar validações no formulário
   - Atualizar labels e placeholders

## 🎨 Exemplos de Uso

### Pessoa sem Nome Social
```json
{
  "nome_civil_completo": "João Pedro Silva Santos",
  "nome_social": null,
  "nome_preferido": "JP"
}
```
**Exibição**: "JP"

### Pessoa Trans com Nome Social
```json
{
  "nome_civil_completo": "João Pedro Silva Santos",
  "nome_social": "Maria Silva Santos",
  "nome_preferido": "Maria"
}
```
**Exibição**: "Maria"

### Pessoa sem Nome Preferido
```json
{
  "nome_civil_completo": "João Pedro Silva Santos",
  "nome_social": null,
  "nome_preferido": null
}
```
**Exibição**: "João Pedro Silva Santos"

## 📞 Suporte

Se houver problemas após aplicar as mudanças:

1. Verificar se o schema foi aplicado corretamente
2. Verificar se todos os arquivos foram salvos
3. Limpar cache do navegador se estiver testando o frontend
4. Verificar console do navegador para erros JavaScript

---

**Data da Atualização**: 2026-02-06
**Versão**: 2.0
