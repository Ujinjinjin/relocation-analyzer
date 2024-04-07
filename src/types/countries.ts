import type { TLivingExpenses } from '@/types/expenses'

export type TCountryCode = 'ES' | 'RO'
export type TCurrencySymbol = '€' | '$' | '₾' | '₽' | 'lei'
export type TCurrencyCode = 'EUR' | 'USD' | 'GEL' | 'RUB' | 'RON'

export type TCountryData = {
  name: string
  currency: TCurrencyCode
  expenses: TLivingExpenses
}

export type TCountryDataDict = {
  [key in TCountryCode]: TCountryData
}
