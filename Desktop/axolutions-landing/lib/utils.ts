import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formata uma data para o formato brasileiro
 * @param dateString String de data ou objeto Date
 * @param options Opções de formatação
 * @returns String formatada no estilo brasileiro (dia/mês/ano)
 */
export function formatDate(
  dateString: string | Date,
  options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  },
  locale = "pt-BR",
): string {
  const date = typeof dateString === "string" ? new Date(dateString) : dateString
  return date.toLocaleDateString(locale, options)
}
