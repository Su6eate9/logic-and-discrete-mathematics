# Operações de Conjuntos - Interface Interativa

Uma aplicação web interativa para realizar operações matemáticas entre dois conjuntos com interface gráfica moderna e intuitiva.

## Fluxo de Trabalho

1. Conjunto A: Gerado aleatoriamente pelo sistema (4 a 8 elementos)
2. Conjunto U: Definido manualmente pelo usuário (conjunto universal)
3. Operações: Sete operações matemáticas disponíveis entre A e U

## Funcionalidades

### Operações Matemáticas

- **União (A ∪ U)**: Combina todos os elementos de ambos os conjuntos
- **Interseção (A ∩ U)**: Elementos que aparecem em ambos os conjuntos
- **Diferença (A - U)**: Elementos que estão em A mas não em U
- **Complementar (A')**: Elementos que não estão em A (baseado no conjunto universal U)
- **Diferença Simétrica (A △ U)**: Elementos que estão em A ou U, mas não em ambos
- **Produto Cartesiano (A × U)**: Todos os pares ordenados (a, u) onde a ∈ A e u ∈ U
- **Inclusão (A ⊆ U)**: Verifica se todos os elementos de A estão contidos em U

### Recursos

- Geração automática e aleatória do Conjunto A (4 a 8 elementos)
- Definição manual do Conjunto Universal U
- Suporte para números, letras e palavras
- Validação de entrada em tempo real
- Interface responsiva e moderna
- Modo escuro/claro
- Animações suaves
- Visualização com diagramas de Venn
- Feedback visual para ações
- Cálculo automático de cardinalidade
- Sete operações matemáticas diferentes

## Como Usar

### Método 1: Abrir diretamente no navegador

1. Abra o arquivo `set-operations.html` em qualquer navegador moderno
2. Não requer instalação ou servidor local

### Método 2: Através de servidor local

```bash
# Navegue até o diretório
cd conjuntos

# Use Python para criar um servidor local
python -m http.server 8000

# Ou use Node.js
npx http-server -p 8000

# Acesse no navegador
# http://localhost:8000/set-operations.html
```

## Guia de Uso

### Passo 1: Definir Conjunto Universal U

1. Digite elementos no campo de entrada (números, letras ou palavras).
2. Clique no botão "Adicionar" ou pressione Enter para adicionar.
3. Adicione de 4 a 8 elementos para o conjunto universal.
4. Remova elementos clicando no botão de remoção ao lado deles.

### Passo 2: Gerar Conjunto A

1. Clique em "Gerar Conjunto A Aleatoriamente".
2. O sistema criará automaticamente um conjunto aleatório com 4 a 8 elementos.
3. O tipo de elementos pode ser números, letras ou palavras.
4. O conjunto A é gerado de forma independente.

### Passo 3: Realizar Operações

1. Clique em "Próximo" para ir à tela de operações.
2. Selecione a operação desejada:
   - União (A ∪ U)
   - Interseção (A ∩ U)
   - Diferença (A - U)
   - Complementar (A')
   - Diferença Simétrica (A △ U)
   - Produto Cartesiano (A × U)
   - Inclusão (A ⊆ U)
3. Visualize o resultado instantaneamente.
4. Observe o diagrama de Venn atualizado.
5. Copie o resultado se necessário.

## Design System

### Cores

- **Primary**: `#135bec` (Azul vibrante)
- **Background Light**: `#f6f6f8`
- **Background Dark**: `#101622`

### Tipografia

- **Família**: Lexend (Google Fonts)
- **Pesos**: 300, 400, 500, 600, 700, 800, 900

### Componentes

- Botões com feedback tátil (animação de escala)
- Chips com bordas arredondadas
- Cards com sombras suaves
- Inputs estilizados com foco personalizado

## Tecnologias

- **React 18** (via CDN) - Framework JavaScript
- **Tailwind CSS** (via CDN) - Framework CSS utilitário
- **Material Symbols** - Ícones do Google
- **Babel Standalone** - Transpilação JSX no navegador
- **HTML5** - Estrutura semântica

## Características UX/UI

### Validações

- Elementos duplicados não são permitidos
- Mínimo de 4 elementos obrigatório
- Máximo de 8 elementos por conjunto
- Mensagens de erro amigáveis

### Feedback Visual

- Animação de bounce ao adicionar elementos
- Animação de shake para erros
- Transições suaves entre telas
- Hover em todos os elementos interativos
- Estados de loading e disabled

### Responsividade

- Layout otimizado para mobile (max-width: 448px)
- Design mobile-first
- Áreas de toque adequadas
- Funciona em qualquer tamanho de tela

## Compatibilidade

- Chrome/Edge (versões recentes)
- Firefox (versões recentes)
- Safari (versões recentes)
- Navegadores móveis (iOS/Android)

## Estrutura do Código

```javascript
setOperations.union();
setOperations.intersection();
setOperations.difference();
setOperations.complement();
setOperations.symmetricDifference();
setOperations.cartesianProduct();
setOperations.inclusion();

generateRandomSet();
```

## Referências

Este projeto foi desenvolvido seguindo os conceitos de:

- Teoria dos Conjuntos (Matemática Discreta)
- Material Design 3
- Princípios de UX/UI Design
- Web Accessibility Guidelines

## Desenvolvimento

Para modificar o código:

1. Edite o arquivo `set-operations.html`.
2. O código React está embutido em uma tag `<script type="text/babel">`.
3. Recarregue a página para ver as mudanças.
4. Use o DevTools do navegador para debug.

## Licença

Este projeto é de código aberto para fins educacionais.

---

**Desenvolvido para**: UFMA - Lógica e Matemática Discreta
**Ano**: 2026
