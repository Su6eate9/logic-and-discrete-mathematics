import React from "react";
import { TruthTable as TruthTableType } from "../types";

interface TruthTableProps {
  truthTable: TruthTableType;
}

export const TruthTable: React.FC<TruthTableProps> = ({ truthTable }) => {
  if (!truthTable || truthTable.rows.length === 0) {
    return null;
  }

  const { headers, rows } = truthTable;

  return (
    <section className="bg-surface-light dark:bg-surface-dark rounded-xl p-5 border border-slate-200 dark:border-slate-700">
      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
        [Etapa 4] Tabela Verdade
      </h3>

      {rows.length > 32 && (
        <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <p className="text-xs text-yellow-700 dark:text-yellow-300">
            ⚠️ Tabela verdade extensa ({rows.length} linhas). Considere
            simplificar a frase.
          </p>
        </div>
      )}

      <div className="overflow-x-auto -mx-5 px-5">
        <div className="inline-block min-w-full">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-primary/10 dark:bg-primary/20">
                {headers.map((header, idx) => (
                  <th
                    key={idx}
                    className={`px-4 py-3 text-sm font-bold ${
                      header === "Resultado"
                        ? "text-primary border-l-2 border-primary/30"
                        : "text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIdx) => (
                <tr
                  key={rowIdx}
                  className={`border-b border-slate-200 dark:border-slate-700 ${
                    rowIdx % 2 === 0
                      ? "bg-slate-50/50 dark:bg-slate-800/30"
                      : "bg-white dark:bg-surface-dark"
                  }`}
                >
                  {headers.map((header, colIdx) => {
                    const isResult = header === "Resultado";
                    const value = isResult ? row.result : row.inputs[header];
                    const displayValue = value ? "V" : "F";
                    const cellColor = value
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400";

                    return (
                      <td
                        key={colIdx}
                        className={`px-4 py-3 text-sm font-mono font-bold ${cellColor} ${
                          isResult
                            ? "border-l-2 border-primary/30 bg-primary/5"
                            : ""
                        }`}
                      >
                        {displayValue}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-4 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-bold text-green-600 dark:text-green-400">
              V
            </span>
            <span>= Verdadeiro</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-red-600 dark:text-red-400">F</span>
            <span>= Falso</span>
          </div>
          <div className="ml-auto">
            <span className="font-semibold">{rows.length} linhas</span>
          </div>
        </div>
      </div>
    </section>
  );
};
