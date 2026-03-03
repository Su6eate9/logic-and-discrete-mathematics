export type ValidationStatus = "OK" | "AVISO" | "ERRO";

export interface ValidationResult {
  id: string;
  name: string;
  status: ValidationStatus;
  message: string;
  details?: string;
}

export enum LogicConnective {
  NEGATION = "¬",
  CONJUNCTION = "∧",
  DISJUNCTION = "∨",
  CONDITIONAL = "→",
  BICONDITIONAL = "↔",
}

export interface Proposition {
  letter: string;
  description: string;
}

export interface TruthTableRow {
  inputs: Record<string, boolean>;
  subexpressions?: Record<string, boolean>;
  result: boolean;
}

export interface TruthTable {
  headers: string[];
  rows: TruthTableRow[];
}

export interface FoundConnective {
  type: LogicConnective;
  original: string;
  position: number;
}

export interface LogicAnalysisResult {
  originalPhrase: string;
  detectedLanguage: string;
  validations: ValidationResult[];
  isSentence: boolean;
  sentenceJustification: string;
  propositions: Proposition[];
  connectives: FoundConnective[];
  logicFormula: string;
  truthTable: TruthTable;
  naturalLanguage: string;
  mathematicalLanguage: string;
  possibleInterpretations?: string[];
}

export interface AnalysisState {
  input: string;
  isAnalyzing: boolean;
  result: LogicAnalysisResult | null;
  error: string | null;
}
