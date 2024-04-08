import type { TCountryCode } from '@/types/countries'
import type { TChartData } from '@/types/echarts'
import { COUNTRIES, SHARED_EXPENSES } from '@/data/dataset'

export function useCountryData(code: TCountryCode, yearlyIncome: number): TChartData[] {
  const countryData = COUNTRIES[code]
  const data: TChartData[] = []
  let remainingAmount = yearlyIncome

  countryData.expenses.taxes.personal.forEach((segment) => {
    const value = (yearlyIncome * segment.value) / 100
    const item: TChartData = {
      name: `Tax (${segment.name})`,
      value: value
    }
    remainingAmount -= value
    data.push(item)
  })

  countryData.expenses.other.forEach((segment) => {
    const multiplier = segment.period === 'year' ? 1 : 12
    const value = segment.value * multiplier
    const item: TChartData = {
      name: segment.name,
      value: value
    }
    remainingAmount -= value
    data.push(item)
  })

  SHARED_EXPENSES.forEach((segment) => {
    const multiplier = segment.period === 'year' ? 1 : 12
    const value = segment.value * multiplier
    const item: TChartData = {
      name: segment.name,
      value: value
    }
    remainingAmount -= value
    data.push(item)
  })

  data.push({
    name: 'Savings',
    value: remainingAmount
  })

  return data
}
