import { COUNTRIES, SHARED_EXPENSES } from '@/data/dataset'
import type { TCountryCode } from '@/types/countries'
import type { TChartData } from '@/types/echarts'

export function useCountryCalculator() {
  function getTaxes(code: TCountryCode, yearlyIncome: number): TChartData[] {
    return COUNTRIES[code].expenses.taxes.personal.map((segment) => {
      const value = (yearlyIncome * segment.value) / 100
      const item: TChartData = {
        name: `Tax (${segment.name})`,
        value: value
      }

      return item
    })
  }

  function getExpenses(code: TCountryCode): TChartData[] {
    return COUNTRIES[code].expenses.other.concat(SHARED_EXPENSES).map((segment) => {
      const multiplier = segment.period === 'year' ? 1 : 12
      const value = segment.value * multiplier
      const item: TChartData = {
        name: segment.name,
        value: value
      }

      return item
    })
  }

  return {
    getTaxes: getTaxes,
    getExpenses: getExpenses
  }
}
