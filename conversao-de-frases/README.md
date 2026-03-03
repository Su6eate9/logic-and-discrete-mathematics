# LogiLang - Conversor de Frases para Sentenças Lógicas

Um assistente especializado em lógica proposicional e matemática discreta que analisa frases em qualquer idioma e as converte em sentenças lógicas formais.

## Funcionalidades

### Pré-Validações (V1-V10)

- ✅ **V1** - Validação de entrada vazia
- ✅ **V2** - Validação de tamanho (3-500 caracteres)
- ✅ **V3** - Validação de caracteres válidos
- ✅ **V4** - Detecção automática de idioma
- ✅ **V5** - Validação de pontuação e estrutura
- ✅ **V6** - Detecção de ambiguidades
- ✅ **V7** - Validação de complexidade
- ✅ **V8** - Detecção de redundâncias
- ✅ **V9** - Análise de negações múltiplas
- ✅ **V10** - Mapeamento de conectivos implícitos

### Análise Lógica (Etapas 1-5)

- **Etapa 1**: Identificação se é uma sentença lógica
- **Etapa 2**: Extração de proposições atômicas e conectivos
- **Etapa 3**: Construção da fórmula lógica formal
- **Etapa 4**: Geração automática de tabela verdade
- **Etapa 5**: Conversão para linguagem natural e matemática

## Tecnologias

- **React 18** - Framework UI
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Material Symbols** - Ícones

## Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## Design System

O projeto utiliza o design system da pasta `stitch/` com:

- Fonte: Lexend
- Cor primária: #c83f09
- Suporte a modo escuro
- Pattern de fundo lógico
- Componentes responsivos

## Exemplos de Uso

### Entrada:

```
Se chove então a rua fica molhada e as pessoas usam guarda-chuva
```

### Saída:

- **Validações**: Todas as validações V1-V10
- **Fórmula Lógica**: `P → (Q ∧ R)`
- **Proposições**:
  - P: "chove"
  - Q: "a rua fica molhada"
  - R: "as pessoas usam guarda-chuva"
- **Tabela Verdade**: Gerada automaticamente (8 linhas)
- **Linguagem Natural**: "Se chove, então a rua fica molhada e as pessoas usam guarda-chuva."
- **Linguagem Matemática**: Notação formal completa

## Conectivos Suportados

| Conectivo     | Símbolo | Exemplo               |
| ------------- | ------- | --------------------- |
| Negação       | ¬       | não, not              |
| Conjunção     | ∧       | e, and                |
| Disjunção     | ∨       | ou, or                |
| Condicional   | →       | se...então, if...then |
| Bicondicional | ↔       | se e somente se, iff  |

## Licença

Este projeto foi desenvolvido para fins educacionais na disciplina de Lógica e Matemática Discreta da UFMA.

---

**© 2026 LogiLang** - Lógica Proposicional e Matemática Discreta
