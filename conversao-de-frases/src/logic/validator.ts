import { ValidationResult } from "../types";

export function validateEmpty(input: string): ValidationResult {
  const trimmed = input.trim();

  if (trimmed.length === 0) {
    return {
      id: "V1",
      name: "Entrada vazia",
      status: "ERRO",
      message: "Nenhuma entrada foi fornecida. Por favor, insira uma frase.",
    };
  }

  return {
    id: "V1",
    name: "Entrada vazia",
    status: "OK",
    message: "OK",
  };
}

export function validateSize(input: string): ValidationResult {
  const length = input.trim().length;

  if (length < 3) {
    return {
      id: "V2",
      name: "Tamanho",
      status: "ERRO",
      message: `A entrada possui apenas ${length} caracteres. Mínimo: 3 caracteres.`,
    };
  }

  if (length > 500) {
    return {
      id: "V2",
      name: "Tamanho",
      status: "AVISO",
      message: `A entrada possui ${length} caracteres. Máximo recomendado: 500 caracteres.`,
    };
  }

  return {
    id: "V2",
    name: "Tamanho",
    status: "OK",
    message: `OK (${length} caracteres)`,
  };
}

export function validateCharacters(input: string): ValidationResult {
  if (/^\d+$/.test(input.trim())) {
    return {
      id: "V3",
      name: "Caracteres",
      status: "ERRO",
      message: "A entrada contém apenas números sem nenhuma palavra.",
    };
  }

  const emojiRegex = /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/u;
  if (emojiRegex.test(input)) {
    return {
      id: "V3",
      name: "Caracteres",
      status: "ERRO",
      message: "A entrada contém emojis ou símbolos gráficos.",
    };
  }

  const validCharsRegex = /^[\p{L}\p{N}\p{Z}\p{P}\s]+$/u;
  if (!validCharsRegex.test(input)) {
    return {
      id: "V3",
      name: "Caracteres",
      status: "ERRO",
      message:
        "A entrada contém caracteres inválidos ou não reconhecidos como linguagem natural.",
    };
  }

  const nonsenseRegex = /[bcdfghjklmnpqrstvwxyz]{7,}/i;
  if (nonsenseRegex.test(input)) {
    return {
      id: "V3",
      name: "Caracteres",
      status: "AVISO",
      message: "A entrada pode conter sequências sem sentido de caracteres.",
    };
  }

  return {
    id: "V3",
    name: "Caracteres",
    status: "OK",
    message: "OK",
  };
}

export function validateLanguage(input: string): ValidationResult {
  const scripts = {
    latin: /[\p{Script=Latin}]/u,
    cyrillic: /[\p{Script=Cyrillic}]/u,
    arabic: /[\p{Script=Arabic}]/u,
    chinese: /[\p{Script=Han}]/u,
    japanese: /[\p{Script=Hiragana}\p{Script=Katakana}]/u,
    greek: /[\p{Script=Greek}]/u,
  };

  let detectedScript = "desconhecido";
  for (const [name, regex] of Object.entries(scripts)) {
    if (regex.test(input)) {
      detectedScript = name;
      break;
    }
  }

  const languageMap: Record<string, string> = {
    latin: "Português/Inglês/Espanhol (Latino)",
    cyrillic: "Russo/Ucraniano (Cirílico)",
    arabic: "Árabe",
    chinese: "Chinês",
    japanese: "Japonês",
    greek: "Grego",
  };

  if (detectedScript === "desconhecido") {
    return {
      id: "V4",
      name: "Idioma",
      status: "AVISO",
      message: "Idioma não reconhecido. A análise pode ser imprecisa.",
      details: "Sistema de escrita não identificado",
    };
  }

  return {
    id: "V4",
    name: "Idioma",
    status: "OK",
    message: languageMap[detectedScript] || detectedScript,
  };
}

export function validateStructure(input: string): ValidationResult {
  const trimmed = input.trim();

  if (/[?!]$/.test(trimmed)) {
    return {
      id: "V5",
      name: "Pontuação/Estrutura",
      status: "AVISO",
      message:
        'A frase termina com "?" ou "!". Pode ser uma pergunta ou exclamação, não uma sentença lógica.',
    };
  }

  const commonVerbs =
    /\b(é|são|está|estão|foi|eram|ser|ter|tem|há|existe|am|is|are|was|were|be|have|has)/i;
  if (!commonVerbs.test(trimmed)) {
    return {
      id: "V5",
      name: "Pontuação/Estrutura",
      status: "AVISO",
      message:
        "Estrutura sintática pode ser insuficiente para análise lógica (nenhum verbo comum identificado).",
    };
  }

  return {
    id: "V5",
    name: "Pontuação/Estrutura",
    status: "OK",
    message: "OK",
  };
}

export function validateAmbiguity(input: string): ValidationResult {
  const issues: string[] = [];

  const vaguePronouns =
    /\b(ele|ela|isso|aquilo|este|esse|aquele|it|this|that)\b/i;
  if (vaguePronouns.test(input)) {
    issues.push("Contém pronomes sem referente claro");
  }

  const subjectiveTerms =
    /\b(bonito|feio|bom|ruim|interessante|chato|agradável|nice|good|bad|beautiful)\b/i;
  if (subjectiveTerms.test(input)) {
    issues.push("Contém termos subjetivos que impedem valor de verdade");
  }

  if (/\bou\b/i.test(input) || /\bor\b/i.test(input)) {
    issues.push('Uso de "ou" pode ser ambíguo (inclusivo vs. exclusivo)');
  }

  if (issues.length > 0) {
    return {
      id: "V6",
      name: "Ambiguidade",
      status: "AVISO",
      message: "Ambiguidade detectada: " + issues.join("; "),
      details: "Pode ter múltiplas interpretações lógicas",
    };
  }

  return {
    id: "V6",
    name: "Ambiguidade",
    status: "OK",
    message: "OK",
  };
}

export function validateComplexity(input: string): ValidationResult {
  const connectives = [
    /\b(e|and)\b/gi,
    /\b(ou|or)\b/gi,
    /\b(se|if)\b/gi,
    /\b(então|entao|then)\b/gi,
    /\b(não|nao|not)\b/gi,
  ];

  let propositionCount = 1;
  connectives.forEach((regex) => {
    const matches = input.match(regex);
    if (matches) {
      propositionCount += matches.length;
    }
  });

  if (propositionCount > 5) {
    return {
      id: "V7",
      name: "Complexidade",
      status: "AVISO",
      message: `${propositionCount} proposições detectadas. A tabela verdade terá ${Math.pow(2, propositionCount)} linhas.`,
      details: "Considere simplificar a frase",
    };
  }

  return {
    id: "V7",
    name: "Complexidade",
    status: "OK",
    message: `OK (${propositionCount} proposições detectadas)`,
  };
}

export function validateRedundancy(input: string): ValidationResult {
  const words = input.toLowerCase().match(/\b\w+\b/g) || [];
  const wordCounts = new Map<string, number>();

  words.forEach((word) => {
    wordCounts.set(word, (wordCounts.get(word) || 0) + 1);
  });

  const repeated = Array.from(wordCounts.entries()).filter(
    ([_, count]) => count > 2,
  );

  if (repeated.length > 0) {
    return {
      id: "V8",
      name: "Redundância",
      status: "AVISO",
      message: `Possível redundância detectada: palavras repetidas (${repeated.map(([w]) => w).join(", ")})`,
      details: "Considere unificar proposições com mesmo significado",
    };
  }

  return {
    id: "V8",
    name: "Redundância",
    status: "OK",
    message: "OK",
  };
}

export function validateNegations(input: string): ValidationResult {
  const negations = [
    /\bnão\b/gi,
    /\bnao\b/gi,
    /\bnot\b/gi,
    /\bninguém\b/gi,
    /\bninguem\b/gi,
    /\bnunca\b/gi,
    /\bjamais\b/gi,
    /\bnever\b/gi,
    /\nnobody\b/gi,
  ];

  let negationCount = 0;
  const foundNegations: string[] = [];

  negations.forEach((regex) => {
    const matches = input.match(regex);
    if (matches) {
      negationCount += matches.length;
      foundNegations.push(...matches);
    }
  });

  if (negationCount > 1) {
    return {
      id: "V9",
      name: "Negações",
      status: "AVISO",
      message: `${negationCount} negações encontradas: ${foundNegations.join(", ")}`,
      details: "Dupla negação ou negações encadeadas detectadas",
    };
  }

  if (negationCount === 1) {
    return {
      id: "V9",
      name: "Negações",
      status: "OK",
      message: `OK (1 negação: ${foundNegations[0]})`,
    };
  }

  return {
    id: "V9",
    name: "Negações",
    status: "OK",
    message: "OK (nenhuma negação)",
  };
}

export function validateConnectives(input: string): ValidationResult {
  const implicitConnectives: Array<{
    pattern: RegExp;
    equivalent: string;
    type: string;
  }> = [
    { pattern: /\bmas\b/gi, equivalent: "∧ (conjunção)", type: "adversativo" },
    {
      pattern: /\bporém\b/gi,
      equivalent: "∧ (conjunção)",
      type: "adversativo",
    },
    {
      pattern: /\bcontudo\b/gi,
      equivalent: "∧ (conjunção)",
      type: "adversativo",
    },
    {
      pattern: /\bentretanto\b/gi,
      equivalent: "∧ (conjunção)",
      type: "adversativo",
    },
    {
      pattern: /\blogo\b/gi,
      equivalent: "→ (condicional)",
      type: "conclusivo",
    },
    {
      pattern: /\bportanto\b/gi,
      equivalent: "→ (condicional)",
      type: "conclusivo",
    },
    {
      pattern: /\bassim\b/gi,
      equivalent: "→ (condicional)",
      type: "conclusivo",
    },
    {
      pattern: /\bhowever\b/gi,
      equivalent: "∧ (conjunção)",
      type: "adversativo",
    },
    {
      pattern: /\btherefore\b/gi,
      equivalent: "→ (condicional)",
      type: "conclusivo",
    },
  ];

  const found: string[] = [];

  implicitConnectives.forEach(({ pattern, equivalent, type }) => {
    const matches = input.match(pattern);
    if (matches) {
      matches.forEach((match) => {
        found.push(`"${match}" → ${equivalent} (${type})`);
      });
    }
  });

  if (found.length > 0) {
    return {
      id: "V10",
      name: "Conectivos implícitos",
      status: "AVISO",
      message: `Conectivos implícitos detectados: ${found.join("; ")}`,
      details: "Interpretação lógica foi mapeada",
    };
  }

  return {
    id: "V10",
    name: "Conectivos implícitos",
    status: "OK",
    message: "OK",
  };
}

export function runAllValidations(input: string): ValidationResult[] {
  return [
    validateEmpty(input),
    validateSize(input),
    validateCharacters(input),
    validateLanguage(input),
    validateStructure(input),
    validateAmbiguity(input),
    validateComplexity(input),
    validateRedundancy(input),
    validateNegations(input),
    validateConnectives(input),
  ];
}
