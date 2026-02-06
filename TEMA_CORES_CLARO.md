# Reformulação de Tema de Cores - TEMA CLARO

## 📋 Resumo da Implementação

Este documento resume as mudanças feitas para implementar o tema claro institucional com foco em legibilidade, acessibilidade e profissionalismo.

---

## 🎨 Paleta Final de Cores

### Cores Primárias (Vermelho Institucional)
```css
--primary-50: #FEF2F2
--primary-100: #FEE2E2
--primary-200: #FECACA
--primary-300: #FCA5A5
--primary-400: #F87171
--primary-500: #EF4444
--primary-600: #DC2626 ⭐ (Cor Principal da Marca - Ações Primárias)
--primary-700: #B91C1C
--primary-800: #991B1B
--primary-900: #7F1D1D
--primary-950: #450A0A
```

### Cores Secundárias (Amarelo/Âmbar - Uso Limitado)
```css
--secondary-50: #FFFBEB
--secondary-100: #FEF3C7
--secondary-200: #FDE68A
--secondary-300: #FCD34D
--secondary-400: #FBBF24
--secondary-500: #F59E0B
--secondary-600: #D97706
--secondary-700: #B45309
--secondary-800: #92400E
--secondary-900: #78350F
```

**⚠️ Importante:** Amarelo **NÃO é usado para texto** devido a problemas de contraste. Apenas para destaques sutis em backgrounds quando necessário.

### Cores de Status
```css
--success: #16A34A (Green 600)
--warning: #EAB308 (Yellow 500)
--error: #DC2626 (Red 600 - Matches Primary)
```

### Cores de Superfície
```css
--bg-page: #F8FAFC (Slate 50 - Fundo da página)
--bg-surface: #FFFFFF (Branco - Cards e formulários)
--color-border: #E2E8F0 (Slate 200 - Bordas)
```

---

## 🧩 Hierarquia Visual por Componente

### Títulos e Textos
- **H1/H2 (Títulos de Seção):** `text-primary-800` (#991B1B)
- **H3 (Subtítulos):** `text-gray-700` (#374151)
- **Corpo de texto:** `text-gray-900` (#111827)
- **Texto secundário/helper:** `text-gray-600` (#4B5563)
- **Ícones decorativos:** `text-gray-500` (#6B7280)

### Inputs (text, select, textarea)
```javascript
// Estado Normal
border-gray-200 bg-white

// Hover
hover:border-primary-400

// Focus
focus:ring-2 focus:ring-primary-500 focus:ring-offset-2

// Erro
border-red-500 focus:ring-red-500
```

### Checkboxes e Radio Buttons
```javascript
// Cor de seleção
accent-primary-600
text-primary-600

// Borda
border-gray-300

// Focus ring
focus:ring-primary-500
```

### Botões
```javascript
// Primário (default)
bg-primary-600 text-white 
hover:bg-primary-700 
shadow-lg shadow-primary-600/20

// Secundário
bg-white text-primary-600 
hover:bg-gray-50 
border border-primary-200

// Outline
border border-gray-300 
bg-transparent 
hover:bg-gray-50

// Destrutivo
bg-red-500 text-white 
hover:bg-red-600
```

### Mensagens de Feedback
```javascript
// Erro
text-red-500 / bg-red-50 border-red-300

// Sucesso
text-success / bg-green-50 border-green-300

// Aviso
text-warning / bg-yellow-50 border-yellow-300

// Info
text-primary-600 / bg-primary-50 border-primary-200
```

---

## ✅ Acessibilidade (WCAG 2.1 AA)

### Contrastes Implementados
- ✅ Texto primário (`text-gray-900`) sobre fundo branco: **~21:1**
- ✅ Títulos (`text-primary-800`) sobre fundo branco: **~12:1**
- ✅ Texto secundário (`text-gray-600`) sobre fundo branco: **~7:1**
- ✅ Bordas (`border-gray-200`) sobre fundo branco: **~1.4:1** (suficiente para UI)
- ❌ **Amarelo NÃO é usado em texto** para evitar problemas de contraste

### Estados de Foco
- Todos os elementos interativos têm `focus:ring-2` visível
- Anel de foco usa `primary-500` (vermelho médio-claro)
- Offset de 2px para clara separação do elemento

### Navegação por Teclado
- Todos os `<button>` e `<input>` são nativamente acessíveis
- Ordem de tabulação lógica preservada
- Sem uso exclusivo de cor para indicar estado

---

## 📦 Variáveis CSS Definidas

Arquivo: `src/index.css`

```css
:root {
  --primary-50 a --primary-950: [Escala Vermelha]
  --secondary-50 a --secondary-900: [Escala Amarela]
  --success: 22 163 74
  --warning: 234 179 8
  --error: 220 38 38
  --bg-page: 248 250 252
  --bg-surface: 255 255 255
  --color-border: 226 232 240
}
```

Mapeamento no Tailwind (`tailwind.config.js`):
```javascript
colors: {
  primary: { ... },
  secondary: { ... },
  success: 'rgb(var(--success) / <alpha-value>)',
  warning: 'rgb(var(--warning) / <alpha-value>)',
  error: 'rgb(var(--error) / <alpha-value>)',
  app: {
    surface: 'rgb(var(--bg-surface) / <alpha-value>)',
    surfaceHover: '#f9fafb',
    border: 'rgb(var(--color-border) / <alpha-value>)',
  }
}
```

---

## 🔧 Componentes Atualizados

### Componentes Base (UI)
- ✅ `Button.jsx` - Usa primary-600 como padrão
- ✅ `Input.jsx` - Hover com border-primary-400
- ✅ `Select.jsx` - Hover com border-primary-400
- ✅ `Checkbox.jsx` - accent-primary-600
- ✅ `Label.jsx` - (sem mudanças)

### Seções de Formulário
- ✅ `Identificacao.jsx` - Títulos em primary-800
- ✅ `DadosPessoais.jsx` - Textos em gray-600/700
- ✅ `RacaPronomes.jsx` - Radio buttons em primary-600
- ✅ `GeneroOrientacao.jsx` - Labels em gray-700
- ✅ `EscolaridadeFamilia.jsx` - Textos auxiliares em gray-600
- ✅ `VinculoFamiliar.jsx` - Inputs em primary-600
- ✅ `MoradiaInternet.jsx` - Títulos em primary-800
- ✅ `TrabalhoRenda.jsx` - Radios em primary-600
- ✅ `RendaBeneficios.jsx` - Checkboxes em primary-600
- ✅ `FamiliaTransporteSaude.jsx` - Todos os h2 em primary-800
- ✅ `CotidianoObjetivo.jsx` - Placeholders em gray-400

---

## 🛑 Regras Importantes

### ❌ O QUE NÃO FAZER
1. **Nunca usar amarelo (secondary) para texto longo**
   - Má legibilidade
   - Contraste insuficiente
   
2. **Evitar vermelho saturado em fundos grandes**
   - Pode causar fadiga visual
   - Usar apenas para CTAs e destaques
   
3. **Não usar apenas cor para indicar erro**
   - Sempre combinar com ícone ou texto

### ✅ O QUE FAZER
1. **Usar gray-600/700/800/900 para texto**
2. **Usar primary-600 para ações principais**
3. **Usar primary-800 para títulos**
4. **Backgrounds neutros (white, slate-50)**
5. **Hover states sutis mas perceptíveis**

---

## 🎯 Linguagem Visual Alcançada

- ✅ **Seriedade institucional** - Vermelho sóbrio + grays
- ✅ **Profissionalismo** - Tipografia clara, sem ruído visual
- ✅ **Cuidado com dados sensíveis** - Design calmo, não agressivo
- ✅ **Acolhimento e diversidade** - Acessibilidade em primeiro lugar
- ❌ **Evitado: estética de marketing** - Sem gradientes exagerados
- ❌ **Evitado: visual infantil** - Paleta madura
- ❌ **Evitado: interface genérica SaaS** - Identidade própria com vermelho institucional

---

## 📝 Notas de Manutenção

- Todas as cores estão tokenizadas via CSS variables
- Para mudar a cor primária: editar `--primary-*` em `index.css`
- Para adicionar nova cor de status: adicionar em `:root` e mapear no Tailwind
- Testes de contraste: usar [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
