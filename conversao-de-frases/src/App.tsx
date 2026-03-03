import React, { useState } from "react";
import { LogicAnalysisResult } from "./types";
import { runAllValidations } from "./logic/validator";
import {
  isSentence,
  identifyPropositionsAndConnectives,
  buildLogicFormula,
  buildTruthTable,
  toNaturalLanguage,
  toMathematicalLanguage,
} from "./logic/logicAnalyzer";
import { ValidationResults } from "./components/ValidationResults";
import { LogicAnalysis } from "./components/LogicAnalysis";
import { TruthTable } from "./components/TruthTable";

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<LogicAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleAnalyze = () => {
    if (!input.trim()) return;

    setIsAnalyzing(true);

    // Simula um pequeno delay para mostrar o loading
    setTimeout(() => {
      // Executa validações
      const validations = runAllValidations(input);

      // Verifica se há erros críticos
      const hasCriticalErrors = validations.some((v) => v.status === "ERRO");

      let analysisResult: LogicAnalysisResult = {
        originalPhrase: input,
        detectedLanguage:
          validations.find((v) => v.id === "V4")?.message || "Desconhecido",
        validations,
        isSentence: false,
        sentenceJustification: "",
        propositions: [],
        connectives: [],
        logicFormula: "",
        truthTable: { headers: [], rows: [] },
        naturalLanguage: "",
        mathematicalLanguage: "",
      };

      if (!hasCriticalErrors) {
        // Etapa 1: Verifica se é sentença
        const sentenceCheck = isSentence(input);
        analysisResult.isSentence = sentenceCheck.isSentence;
        analysisResult.sentenceJustification = sentenceCheck.justification;

        if (sentenceCheck.isSentence) {
          // Etapa 2: Identifica proposições e conectivos
          const { propositions, connectives } =
            identifyPropositionsAndConnectives(input);
          analysisResult.propositions = propositions;
          analysisResult.connectives = connectives;

          // Etapa 3: Constrói fórmula lógica
          const formula = buildLogicFormula(propositions, connectives);
          analysisResult.logicFormula = formula;

          // Etapa 4: Constrói tabela verdade
          if (propositions.length > 0 && propositions.length <= 6) {
            const truthTable = buildTruthTable(propositions, formula);
            analysisResult.truthTable = truthTable;
          }

          // Etapa 5: Conversões
          analysisResult.naturalLanguage = toNaturalLanguage(
            propositions,
            connectives,
          );
          analysisResult.mathematicalLanguage = toMathematicalLanguage(
            propositions,
            formula,
          );
        }
      }

      setResult(analysisResult);
      setIsAnalyzing(false);
    }, 500);
  };

  const handleClear = () => {
    setInput("");
    setResult(null);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div
      className={`min-h-screen bg-background-light dark:bg-background-dark transition-colors ${isDarkMode ? "dark" : ""}`}
    >
      <div className="relative min-h-screen flex flex-col w-full max-w-md mx-auto bg-logic-pattern bg-fixed shadow-2xl">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-primary/10 px-5 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-xl text-primary">
                <span className="material-symbols-outlined text-2xl">
                  functions
                </span>
              </div>
              <h1 className="font-bold text-xl tracking-tight text-text-main dark:text-white">
                LogiLang
              </h1>
            </div>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              aria-label="Toggle dark mode"
            >
              <span className="material-symbols-outlined text-text-muted">
                {isDarkMode ? "light_mode" : "dark_mode"}
              </span>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-5 py-6 space-y-6">
          {/* Hero Section */}
          {!result && (
            <section className="space-y-4">
              <div className="space-y-2">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full">
                  Lógica Proposicional v2.0
                </span>
                <h2 className="text-3xl font-bold text-text-main dark:text-white leading-tight">
                  Conversor de Sentenças Lógicas
                </h2>
                <p className="text-text-muted dark:text-slate-400 leading-relaxed">
                  Analise frases em qualquer idioma e converta-as em sentenças
                  lógicas formais com validações completas.
                </p>
              </div>
            </section>
          )}

          {/* Input Section */}
          <section className="space-y-3">
            <label
              htmlFor="phrase-input"
              className="block text-sm font-semibold text-text-main dark:text-white"
            >
              Digite uma frase para análise
            </label>
            <textarea
              id="phrase-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ex: Se chove então a rua fica molhada..."
              className="w-full min-h-[120px] px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark text-text-main dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors resize-none"
              disabled={isAnalyzing}
            />
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>{input.length} / 500 caracteres</span>
              {input.length > 0 && (
                <button
                  onClick={handleClear}
                  className="text-primary hover:underline font-semibold"
                  disabled={isAnalyzing}
                >
                  Limpar
                </button>
              )}
            </div>
          </section>

          {/* Action Button */}
          <button
            onClick={handleAnalyze}
            disabled={!input.trim() || isAnalyzing}
            className="w-full bg-primary hover:bg-primary-light disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <span className="material-symbols-outlined animate-spin">
                  progress_activity
                </span>
                <span>Analisando...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined">psychology</span>
                <span>Analisar Frase</span>
              </>
            )}
          </button>

          {/* Results */}
          {result && (
            <div className="space-y-6 pb-8">
              {/* Original Phrase */}
              <section className="bg-surface-light dark:bg-surface-dark rounded-xl p-5 border border-slate-200 dark:border-slate-700">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Frase Original
                </h3>
                <p className="text-sm text-text-main dark:text-white italic">
                  "{result.originalPhrase}"
                </p>
                <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-semibold">Idioma detectado:</span>{" "}
                  {result.detectedLanguage}
                </div>
              </section>

              {/* Validations */}
              <ValidationResults validations={result.validations} />

              {/* Logic Analysis */}
              <LogicAnalysis
                isSentence={result.isSentence}
                justification={result.sentenceJustification}
                propositions={result.propositions}
                connectives={result.connectives}
                logicFormula={result.logicFormula}
                naturalLanguage={result.naturalLanguage}
                mathematicalLanguage={result.mathematicalLanguage}
              />

              {/* Truth Table */}
              {result.isSentence && result.truthTable.rows.length > 0 && (
                <TruthTable truthTable={result.truthTable} />
              )}

              {/* New Analysis Button */}
              <button
                onClick={handleClear}
                className="w-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-text-main dark:text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">refresh</span>
                <span>Nova Análise</span>
              </button>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="py-4 px-5 border-t border-slate-200 dark:border-slate-700 text-center text-xs text-slate-500 dark:text-slate-400">
          <p>© 2026 LogiLang - Lógica Proposicional e Matemática Discreta</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
