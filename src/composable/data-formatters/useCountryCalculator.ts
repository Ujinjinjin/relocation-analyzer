import { COUNTRIES, SHARED_EXPENSES } from '@/data/dataset'
import type { TCountryCode } from '@/types/countries'
import type { ICategoryChartData } from '@/types/echarts'

export function useCountryCalculator() {
  function getTaxes(code: TCountryCode, yearlyIncome: number): ICategoryChartData[] {
    return COUNTRIES[code].expenses.taxes.personal.map((segment) => {
      const value = (yearlyIncome * segment.value) / 100
      const item: ICategoryChartData = {
        name: `Tax (${segment.name})`,
        value: value
      }

      return item
    })
  }

  function getExpenses(code: TCountryCode): ICategoryChartData[] {
    return COUNTRIES[code].expenses.other.concat(SHARED_EXPENSES).map((segment) => {
      const multiplier = segment.period === 'year' ? 1 : 12
      const value = segment.value * multiplier
      const item: ICategoryChartData = {
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
