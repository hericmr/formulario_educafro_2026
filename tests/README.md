# Teste de Completude do Formulário Educafro 2026

## 📋 Visão Geral

Este teste automatizado valida a completude das entrevistas do formulário social da Educafro e permite inserir dados de teste no banco Supabase, simulando diferentes cenários de preenchimento.

## 🎯 Objetivos

- **Validar dados**: Verificar se todos os campos obrigatórios foram preenchidos corretamente
- **Detectar erros**: Identificar campos vazios, inválidos ou com formato incorreto
- **Campos condicionais**: Validar campos que dependem de respostas anteriores
- **Métricas de qualidade**: Calcular percentual de completude de cada entrevista
- **Popular banco de dados**: Inserir dados de teste no Supabase para desenvolvimento

## 🚀 Como Usar

### **Opção 1: Apenas Validação Local (sem banco)**

```bash
# Validar entrevistas predefinidas
node tests/completude_formulario.test.js
```

### **Opção 2: Gerar e Inserir Dados no Supabase**

```bash
# Passo 1: Aplicar o schema no Supabase (VER GUIA_SUPABASE.md)
# Acesse o Supabase SQL Editor e execute todo o conteúdo de:
# supabase_schema_completo.sql

# Passo 2: Gerar dados de teste aleatórios
node tests/gerador_dados_teste.js

# Passo 3: Inserir no Supabase
node tests/inserir_dados_supabase.js

# Opcional: Limpar tabela antes de inserir
node tests/inserir_dados_supabase.js --limpar
```

## 📁 Arquivos do Diretório de Testes

| Arquivo | Descrição |
|---------|-----------|
| `completude_formulario.test.js` | Teste de validação com 5 entrevistas predefinidas |
| `gerador_dados_teste.js` | Gera 20 entrevistas aleatórias com diferentes níveis de completude |
| `inserir_dados_supabase.js` | Insere as entrevistas geradas no banco Supabase |
| `entrevistas_geradas.json` | Arquivo JSON com os dados gerados (criado automaticamente) |
| `README.md` | Este arquivo |

## 🧪 Cenários de Teste

O teste inclui 5 entrevistas simuladas:

### ✅ Entrevistas Completas (2)

1. **Maria Silva Santos** - Entrevista básica totalmente preenchida
   - Todos os campos obrigatórios preenchidos
   - Dados consistentes e válidos
   - 100% de completude

2. **Julia Rodrigues** - Caso especial (pessoa trans)
   - Nome social diferente do nome de documento
   - Campos condicionais de saúde mental preenchidos
   - Demonstra validação de campos interdependentes
   - 100% de completude

### ❌ Entrevistas Incompletas (3)

3. **João** - Dados Pessoais Faltando (31.37% completo)
   - Telefone e email inválidos
   - Múltiplos campos obrigatórios vazios
   - Consentimento LGPD não aceito
   - **37 erros detectados**

4. **Ana Paula Costa** - Campos Condicionais Não Preenchidos (100% campos preenchidos)
   - Marcou "Usa SUS" mas não informou quais serviços
   - Marcou "Faz psicoterapia" mas não informou tempo/duração
   - Marcou "Tem problemas de saúde" mas não especificou quais
   - Demonstra importância da validação condicional
   - **6 erros detectados**

5. **Pedro** - Respostas Muito Curtas (100% campos preenchidos)
   - Campos de texto livre muito curtos
   - Não atende requisitos mínimos de caracteres
   - **2 erros detectados**

## 🔍 Validações Realizadas

### Validações Básicas
- ✓ Campos obrigatórios preenchidos
- ✓ Formato de email válido
- ✓ Formato de telefone válido (14 caracteres)
- ✓ CPF válido (11 dígitos)
- ✓ Data de nascimento não pode ser futura
- ✓ Tamanho mínimo de texto

### Validações Condicionais
- ✓ Se usa SUS → deve informar quais serviços
- ✓ Se faz psicoterapia → deve informar tempo e se continua
- ✓ Se tem deficiência → deve especificar qual
- ✓ Se tem problemas de saúde → deve especificar quais
- ✓ Se tem alergias → deve especificar quais
- ✓ Se usa medicamentos → deve especificar quais
- ✓ Se usa substâncias → deve especificar quais

## 📊 Métricas Geradas

Para cada entrevista, o teste calcula:

- **Percentual de completude**: Proporção de campos obrigatórios preenchidos
- **Total de erros**: Quantidade de problemas encontrados
- **Campos vazios**: Lista de campos obrigatórios não preenchidos
- **Erros por tipo**: Agrupamento de erros por mensagem

### Resumo Geral
- Total de entrevistas analisadas
- Quantidade de entrevistas válidas vs inválidas
- Percentual de aprovação
- Completude média

## 🚀 Como Executar

```bash
# Executar o teste
node tests/completude_formulario.test.js
```

## 📈 Resultado Esperado

```
================================================================================
RELATÓRIO DE COMPLETUDE DO FORMULÁRIO EDUCAFRO 2026
================================================================================

ENTREVISTA 1: Entrevista Completa 1 - Maria Silva
📊 COMPLETUDE: 100.00%
✅ STATUS: VÁLIDA - Todos os campos obrigatórios foram preenchidos corretamente

ENTREVISTA 2: Entrevista Incompleta 1 - João
📊 COMPLETUDE: 31.37%
❌ STATUS: INVÁLIDA - Existem problemas nos seguintes campos:
   Quantidade de erros: 37
   [Lista detalhada de erros...]

RESUMO GERAL
📈 Total de entrevistas analisadas: 5
   ✅ Válidas: 2 (40.0%)
   ❌ Inválidas: 3 (60.0%)
📊 Completude média: 86.27%
```

## 🛠️ Tecnologias Utilizadas

- **Zod**: Schema validation
- **Node.js**: Runtime de execução
- **JavaScript ES6+**: Sintaxe moderna

## 📝 Estrutura do Código

```
tests/
└── completude_formulario.test.js
    ├── Dados simulados (5 entrevistas)
    ├── Schema de validação (espelho do FormContext)
    ├── Funções de análise
    │   ├── validarEntrevista()
    │   ├── calcularCompletude()
    │   └── gerarRelatorio()
    └── Execução dos testes
```

## 🎨 Casos de Uso

Este teste é útil para:

1. **Desenvolvimento**: Validar que o schema de validação está correto
2. **QA**: Testar diferentes cenários de preenchimento
3. **Documentação**: Exemplificar casos de uso do formulário
4. **Treinamento**: Mostrar para assistentes sociais exemplos de entrevistas completas e incompletas
5. **Análise de dados**: Calcular métricas de qualidade das entrevistas reais

## 🔄 Próximos Passos

- [ ] Adicionar mais cenários de teste
- [ ] Integrar com banco de dados de teste
- [ ] Criar testes unitários automatizados
- [ ] Adicionar validação de dados duplicados
- [ ] Gerar relatório em formato JSON/CSV
- [ ] Criar interface visual para análise de completude

## 👥 Manutenção

Ao adicionar novos campos no formulário:

1. Atualizar o schema de validação no teste
2. Adicionar o campo em `camposObrigatorios` se for obrigatório
3. Incluir validações condicionais se necessário
4. Atualizar as entrevistas de exemplo

## 📌 Observações Importantes

- O teste usa o mesmo schema de validação do `FormContext.jsx`
- Qualquer alteração no schema de validação deve ser replicada aqui
- Os dados simulados são fictícios e cobrem diferentes perfis socioeconômicos
- O teste NÃO salva dados no banco; apenas valida a estrutura
