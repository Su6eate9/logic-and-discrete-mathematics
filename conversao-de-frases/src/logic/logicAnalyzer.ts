import {
  LogicConnective,
  Proposition,
  FoundConnective,
  TruthTable,
  TruthTableRow,
} from "../types";

export function isSentence(input: string): {
  isSentence: boolean;
  justification: string;
} {
  const trimmed = input.trim();

  if (/\?$/.test(trimmed)) {
    return {
      isSentence: false,
      justification:
        'A frase termina com "?" - é uma pergunta, não uma sentença declarativa.',
    };
  }

  if (/!$/.test(trimmed)) {
    return {
      isSentence: false,
      justification:
        'A frase termina com "!" - pode ser uma exclamação ou ordem, não uma sentença declarativa.',
    };
  }

  const imperativeVerbs = /\b(faça|vá|venha|corra|pare|do|go|come|run|stop)\b/i;
  if (imperativeVerbs.test(trimmed)) {
    return {
      isSentence: false,
      justification:
        "A frase contém verbos no imperativo - é uma ordem, não uma sentença declarativa.",
    };
  }

  const purelySubjective =
    /^(que|what|how|como)\s+(bonito|lindo|feio|interessante|chato)/i;
  if (purelySubjective.test(trimmed)) {
    return {
      isSentence: false,
      justification:
        "A frase é puramente subjetiva e não possui valor de verdade objetivo.",
    };
  }

  const hasVerb =
    /\b(é|são|está|estão|foi|foram|era|eram|ser|estar|ter|tem|há|existe|existem|am|is|are|was|were|be|have|has)\b/i;
  if (!hasVerb.test(trimmed)) {
    return {
      isSentence: false,
      justification:
        "A frase não possui estrutura de sentença declarativa (falta verbo identificável).",
    };
  }

  return {
    isSentence: true,
    justification:
      "A frase é uma sentença declarativa com valor de verdade (pode ser verdadeira ou falsa).",
  };
}

export function identifyPropositionsAndConnectives(input: string): {
  propositions: Proposition[];
  connectives: FoundConnective[];
} {
  const propositions: Proposition[] = [];
  const connectives: FoundConnective[] = [];

  const connectivePatterns = [
    { regex: /\b(não|nao|not)\s+/gi, type: LogicConnective.NEGATION },
    { regex: /\s+(e|and)\s+/gi, type: LogicConnective.CONJUNCTION },
    { regex: /\s+(ou|or)\s+/gi, type: LogicConnective.DISJUNCTION },
    {
      regex: /\b(se|if)\s+.*\s+(então|entao|then)\b/gi,
      type: LogicConnective.CONDITIONAL,
    },
    {
      regex: /\b(se\s+e\s+somente\s+se|iff|if\s+and\s+only\s+if)\b/gi,
      type: LogicConnective.BICONDITIONAL,
    },
  ];

  const connectiveMatches: Array<{
    match: string;
    type: LogicConnective;
    index: number;
  }> = [];

  connectivePatterns.forEach(({ regex, type }) => {
    const matches = Array.from(input.matchAll(regex));
    matches.forEach((match) => {
      if (match.index !== undefined) {
        connectiveMatches.push({
          match: match[0],
          type,
          index: match.index,
        });
      }
    });
  });

  connectiveMatches.sort((a, b) => a.index - b.index);

  connectiveMatches.forEach(({ match, type, index }) => {
    connectives.push({
      type,
      original: match.trim(),
      position: index,
    });
  });

  let parts: string[] = [];

  if (connectiveMatches.length === 0) {
    parts = [input.trim()];
  } else {
    let lastIndex = 0;
    connectiveMatches.forEach(({ index, match }) => {
      if (index > lastIndex) {
        parts.push(input.substring(lastIndex, index).trim());
      }
      lastIndex = index + match.length;
    });
    if (lastIndex < input.length) {
      parts.push(input.substring(lastIndex).trim());
    }
  }

  const letters = "PQRSTUVWXYZ";
  let letterIndex = 0;

  parts
    .filter((part) => part.length > 0)
    .forEach((part) => {
      const cleaned = part
        .replace(/^(que|which|that)\s+/i, "")
        .replace(/\s+(que|which|that)$/i, "")
        .trim();

      if (cleaned.length > 3 && letterIndex < letters.length) {
        propositions.push({
          letter: letters[letterIndex],
          description: cleaned,
        });
        letterIndex++;
      }
    });

  if (propositions.length === 0) {
    propositions.push({
      letter: "P",
      description: input.trim(),
    });
  }

  return { propositions, connectives };
}

export function buildLogicFormula(
  propositions: Proposition[],
  connectives: FoundConnective[],
): string {
  if (propositions.length === 0) {
    return "";
  }

  if (propositions.length === 1 && connectives.length === 0) {
    return propositions[0].letter;
  }

  let formula = "";
  let propIndex = 0;

  const hasBiconditional = connectives.some(
    (c) => c.type === LogicConnective.BICONDITIONAL,
  );
  if (hasBiconditional && propositions.length >= 2) {
    const mid = Math.floor(propositions.length / 2);
    const left = propositions
      .slice(0, mid)
      .map((p) => p.letter)
      .join(" ∧ ");
    const right = propositions
      .slice(mid)
      .map((p) => p.letter)
      .join(" ∧ ");
    return `(${left}) ↔ (${right})`;
  }

  const hasConditional = connectives.some(
    (c) => c.type === LogicConnective.CONDITIONAL,
  );
  if (hasConditional && propositions.length >= 2) {
    const antecedent = propositions[0].letter;
    const consequents = propositions
      .slice(1)
      .map((p) => p.letter)
      .join(" ∧ ");
    return `${antecedent} → (${consequents})`;
  }

  const hasConjunction = connectives.some(
    (c) => c.type === LogicConnective.CONJUNCTION,
  );
  const hasDisjunction = connectives.some(
    (c) => c.type === LogicConnective.DISJUNCTION,
  );
  const hasNegation = connectives.some(
    (c) => c.type === LogicConnective.NEGATION,
  );

  if (hasNegation) {
    formula = `¬${propositions[0].letter}`;
    propIndex = 1;
  } else {
    formula = propositions[0].letter;
    propIndex = 1;
  }

  while (propIndex < propositions.length) {
    const connector = hasConjunction ? " ∧ " : hasDisjunction ? " ∨ " : " ∧ ";
    formula += connector + propositions[propIndex].letter;
    propIndex++;
  }

  return formula;
}

export function buildTruthTable(
  propositions: Proposition[],
  formula: string,
): TruthTable {
  const numProps = propositions.length;
  const numRows = Math.pow(2, numProps);

  const headers = [...propositions.map((p) => p.letter), "Resultado"];

  const rows: TruthTableRow[] = [];

  for (let i = 0; i < numRows; i++) {
    const inputs: Record<string, boolean> = {};

    for (let j = 0; j < numProps; j++) {
      const letter = propositions[j].letter;
      const value = ((i >> (numProps - 1 - j)) & 1) === 1;
      inputs[letter] = value;
    }

    const result = evaluateFormula(formula, inputs);

    rows.push({
      inputs,
      result,
    });
  }

  return { headers, rows };
}

function evaluateFormula(
  formula: string,
  values: Record<string, boolean>,
): boolean {
  let expr = formula;

  Object.entries(values).forEach(([letter, value]) => {
    const replacement = value ? "true" : "false";
    const regex = new RegExp(letter, "g");
    expr = expr.replace(regex, replacement);
  });

  expr = expr.replace(/\s+/g, "");

  expr = expr.replace(/¬/g, "!");
  expr = expr.replace(/∧/g, "&&");
  expr = expr.replace(/∨/g, "||");

  expr = expr.replace(/(\w+|true|false)→(\w+|true|false)/g, "(!$1||$2)");

  expr = expr.replace(
    /(\w+|true|false)↔(\w+|true|false)/g,
    "((!$1||$2)&&(!$2||$1))",
  );

  try {
    return eval(expr);
  } catch (error) {
    console.error("Erro ao avaliar fórmula:", error);
    return false;
  }
}

export function toNaturalLanguage(
  propositions: Proposition[],
  connectives: FoundConnective[],
): string {
  if (propositions.length === 0) {
    return "";
  }

  if (propositions.length === 1 && connectives.length === 0) {
    return propositions[0].description;
  }

  let result = "";

  const hasNegation = connectives.some(
    (c) => c.type === LogicConnective.NEGATION,
  );
  const hasConditional = connectives.some(
    (c) => c.type === LogicConnective.CONDITIONAL,
  );
  const hasBiconditional = connectives.some(
    (c) => c.type === LogicConnective.BICONDITIONAL,
  );
  const hasConjunction = connectives.some(
    (c) => c.type === LogicConnective.CONJUNCTION,
  );
  const hasDisjunction = connectives.some(
    (c) => c.type === LogicConnective.DISJUNCTION,
  );

  if (hasBiconditional && propositions.length >= 2) {
    const mid = Math.floor(propositions.length / 2);
    const left = propositions
      .slice(0, mid)
      .map((p) => p.description)
      .join(" e ");
    const right = propositions
      .slice(mid)
      .map((p) => p.description)
      .join(" e ");
    result = `${left}, se e somente se, ${right}`;
  } else if (hasConditional && propositions.length >= 2) {
    const antecedent = propositions[0].description;
    const consequent = propositions
      .slice(1)
      .map((p) => p.description)
      .join(" e ");
    result = `Se ${antecedent}, então ${consequent}`;
  } else if (hasNegation && propositions.length >= 1) {
    const negated = propositions[0].description;
    const rest = propositions.slice(1);
    result = `Não é verdade que ${negated}`;
    if (rest.length > 0) {
      const connector = hasConjunction
        ? " e "
        : hasDisjunction
          ? " ou "
          : " e ";
      result += connector + rest.map((p) => p.description).join(connector);
    }
  } else {
    const connector = hasConjunction ? " e " : hasDisjunction ? " ou " : " e ";
    result = propositions.map((p) => p.description).join(connector);
  }

  result = result.charAt(0).toUpperCase() + result.slice(1);
  if (!result.endsWith(".")) {
    result += ".";
  }

  return result;
}

export function toMathematicalLanguage(
  propositions: Proposition[],
  formula: string,
): string {
  let result = "Seja:\n";

  propositions.forEach((prop) => {
    result += `  ${prop.letter}: "${prop.description}"\n`;
  });

  result += `\nEntão a fórmula lógica é:\n  ${formula}`;

  return result;
}
