# Revisão de Conteúdo — `conversao-de-frases`

> **Nota:** Este arquivo foi adicionado para viabilizar o Pull Request de revisão de conteúdo,
> conforme solicitado. Não há mudança funcional; a intenção é exclusivamente a **revisão do
> conteúdo existente** da pasta `conversao-de-frases/`.

---

## Objetivo desta Revisão

Revisar o conteúdo completo do projeto **LogiLang** — um conversor de frases para sentenças lógicas
formais desenvolvido no contexto da disciplina de Lógica e Matemática Discreta (UFMA).

## Escopo

| Caminho | Descrição |
|---|---|
| `src/logic/logicAnalyzer.ts` | Motor de análise lógica (identificação de proposições, conectivos, fórmula, tabela-verdade, linguagem natural/matemática) |
| `src/logic/validator.ts` | Validações V1–V10 de pré-processamento da entrada |
| `src/components/LogicAnalysis.tsx` | Componente de exibição da análise lógica |
| `src/components/TruthTable.tsx` | Componente de tabela-verdade |
| `src/components/ValidationResults.tsx` | Componente de exibição dos resultados de validação |
| `src/App.tsx` | Componente raiz da aplicação |
| `src/types.ts` | Definições de tipos TypeScript |
| `index.html` | Ponto de entrada HTML |
| `package.json` / `vite.config.ts` | Configuração de build |
| `tailwind.config.js` / `postcss.config.js` | Configuração de estilo |

## Como Executar e Validar

```bash
# 1. Instalar dependências
cd conversao-de-frases
npm install

# 2. Iniciar servidor de desenvolvimento
npm run dev

# 3. Abrir o navegador em http://localhost:5173

# 4. Testar com frases de exemplo (ver README.md)
```

## Pontos de Atenção para o Revisor

1. **Validações (V1–V10)** — Verificar se todas as validações estão corretas e completas em
   `src/logic/validator.ts`.
2. **Análise Lógica** — Conferir a lógica de extração de proposições e conectivos em
   `src/logic/logicAnalyzer.ts`, especialmente:
   - Identificação correta do tipo de sentença
   - Construção da fórmula lógica (`buildLogicFormula`)
   - Avaliação da tabela-verdade (`evaluateFormula`)
3. **Conectivos suportados** — Confirmar suporte a negação (¬), conjunção (∧), disjunção (∨),
   condicional (→) e bicondicional (↔).
4. **Internacionalização** — Checar suporte a frases em Português e Inglês.
5. **Tipagem TypeScript** — Confirmar que os tipos em `src/types.ts` estão adequados.

## Referência

- Commit base: `3d1d558f3c1fcdeb2c0f1a2cfae551268418e2fe`
- Pasta: [`conversao-de-frases/`](https://github.com/Su6eate9/logic-and-discrete-mathematics/tree/3d1d558f3c1fcdeb2c0f1a2cfae551268418e2fe/conversao-de-frases)
