import { useCountryCalculator } from '@/composable/data-formatters/useCountryCalculator'
import type { TCountryCode } from '@/types/countries'
import type { TChartData } from '@/types/echarts'

export function useDistributionData(code: TCountryCode, yearlyIncome: number): TChartData[] {
  const { getTaxes, getExpenses } = useCountryCalculator()

  const data: TChartData[] = []
  let remainingAmount = yearlyIncome

  data.push(...getTaxes(code, yearlyIncome))
  data.push(...getExpenses(code))

  data.forEach((item) => (remainingAmount -= item.value))

  data.push({
    name: 'Savings',
    value: remainingAmount
  })

  return data
}
