import React from "react";
import { ValidationResult } from "../types";

interface ValidationResultsProps {
  validations: ValidationResult[];
}

export const ValidationResults: React.FC<ValidationResultsProps> = ({
  validations,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "OK":
        return "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20";
      case "AVISO":
        return "text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20";
      case "ERRO":
        return "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20";
      default:
        return "text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "OK":
        return "check_circle";
      case "AVISO":
        return "warning";
      case "ERRO":
        return "error";
      default:
        return "info";
    }
  };

  const hasErrors = validations.some((v) => v.status === "ERRO");
  const hasWarnings = validations.some((v) => v.status === "AVISO");

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-text-main dark:text-white">
          Validações
        </h2>
        <div className="flex gap-2">
          {hasErrors && (
            <span className="text-xs px-2 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300">
              {validations.filter((v) => v.status === "ERRO").length} erro(s)
            </span>
          )}
          {hasWarnings && (
            <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300">
              {validations.filter((v) => v.status === "AVISO").length} aviso(s)
            </span>
          )}
          {!hasErrors && !hasWarnings && (
            <span className="text-xs px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
              Tudo OK
            </span>
          )}
        </div>
      </div>

      <div className="grid gap-2">
        {validations.map((validation) => (
          <div
            key={validation.id}
            className={`p-3 rounded-lg border ${
              validation.status === "ERRO"
                ? "border-red-200 dark:border-red-800"
                : validation.status === "AVISO"
                  ? "border-yellow-200 dark:border-yellow-800"
                  : "border-green-200 dark:border-green-800"
            } ${getStatusColor(validation.status)}`}
          >
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-xl mt-0.5">
                {getStatusIcon(validation.status)}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider opacity-70">
                    {validation.id}
                  </span>
                  <span className="text-xs font-semibold">
                    {validation.name}
                  </span>
                </div>
                <p className="text-sm font-medium">{validation.message}</p>
                {validation.details && (
                  <p className="text-xs mt-1 opacity-75">
                    {validation.details}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
