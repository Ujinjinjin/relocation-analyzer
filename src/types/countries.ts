import type { TLivingExpenses } from '@/types/expenses'

export type TCountryCode = 'ES' | 'RO'

export type TCountryData = {
  name: string
  expenses: TLivingExpenses
}

export type TCountryDataDict = {
  [key in TCountryCode]: TCountryData
}
