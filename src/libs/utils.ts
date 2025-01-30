import { clsx, type ClassValue } from 'clsx'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export function formatCurrencyInCents(value: string) {
  return ((parseFloat(value) * 100) / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export function formatDate(date: string, formatString = 'dd/MM/yyyy') {
  return format(new Date(date), formatString, { locale: ptBR })
}

export function formatDateWithMonth(date: Date) {
  return new Date(
    date.setHours(
      new Date().getHours(),
      new Date().getMinutes(),
      new Date().getSeconds(),
      new Date().getMilliseconds(),
    ),
  )
}
