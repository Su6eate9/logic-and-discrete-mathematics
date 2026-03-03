import React from "react";
import { Proposition, FoundConnective } from "../types";

interface LogicAnalysisProps {
  isSentence: boolean;
  justification: string;
  propositions: Proposition[];
  connectives: FoundConnective[];
  logicFormula: string;
  naturalLanguage: string;
  mathematicalLanguage: string;
}

export const LogicAnalysis: React.FC<LogicAnalysisProps> = ({
  isSentence,
  justification,
  propositions,
  connectives,
  logicFormula,
  naturalLanguage,
  mathematicalLanguage,
}) => {
  return (
    <div className="space-y-6">
      {/* Etapa 1 - Classificação */}
      <section className="bg-surface-light dark:bg-surface-dark rounded-xl p-5 border border-slate-200 dark:border-slate-700">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
          [Etapa 1] Classificação
        </h3>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-lg font-bold text-primary">
            Sentença Lógica?
          </span>
          <span
            className={`px-3 py-1 rounded-full text-sm font-bold ${
              isSentence
                ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
            }`}
          >
            {isSentence ? "SIM" : "NÃO"}
          </span>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4">
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <span className="font-semibold">Justificativa:</span>{" "}
            {justification}
          </p>
        </div>
      </section>

      {isSentence && (
        <section className="bg-surface-light dark:bg-surface-dark rounded-xl p-5 border border-slate-200 dark:border-slate-700">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
            [Etapa 2] Proposições Identificadas
          </h3>

          <div className="space-y-3">
            {propositions.map((prop) => (
              <div
                key={prop.letter}
                className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 flex items-start gap-3"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  {prop.letter}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    "{prop.description}"
                  </p>
                </div>
              </div>
            ))}
          </div>

          {connectives.length > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2">
                Conectivos encontrados:
              </p>
              <div className="flex flex-wrap gap-2">
                {connectives.map((conn, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-mono"
                  >
                    {conn.type} ({conn.original})
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {isSentence && logicFormula && (
        <section className="bg-slate-900 dark:bg-black rounded-xl p-6 border border-slate-800 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>

          <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4 relative z-10">
            [Etapa 3] Fórmula Lógica
          </h3>

          <div className="relative z-10 text-3xl font-mono text-white tracking-wide text-center py-4">
            {logicFormula}
          </div>
        </section>
      )}

      {isSentence && (
        <section className="space-y-4">
          <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-5 border border-slate-200 dark:border-slate-700">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              [Etapa 5a] Linguagem Natural
            </h3>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {naturalLanguage}
              </p>
            </div>
          </div>

          <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-5 border border-slate-200 dark:border-slate-700">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              [Etapa 5b] Linguagem Matemática
            </h3>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
              <pre className="text-sm text-slate-700 dark:text-slate-300 font-mono whitespace-pre-wrap">
                {mathematicalLanguage}
              </pre>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
