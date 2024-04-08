import type { TLivingExpenses } from '@/types/expenses'

export type TCountryCode = 'ES' | 'RO' | 'HU' | 'EE' | 'PL' | 'KZ'
export type TCurrencySymbol = '€' | '$' | '₾' | '₽' | 'lei' | 'Ft' | 'zł' | '₸'
export type TCurrencyCode = 'EUR' | 'USD' | 'GEL' | 'RUB' | 'RON' | 'HUF' | 'PLN' | 'KZT'

export type TCountryData = {
  name: string
  currency: TCurrencyCode
  expenses: TLivingExpenses
}

export type TCountryDataDict = {
  [key in TCountryCode]: TCountryData
}
