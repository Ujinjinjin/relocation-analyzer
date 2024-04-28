import { useCountryCalculator } from '@/composable/data-formatters/useCountryCalculator'
import type { TCountryCode } from '@/types/countries'
import type { ICategoryChartData } from '@/types/echarts'

export function useDistributionData(
  code: TCountryCode,
  yearlyIncome: number
): ICategoryChartData[] {
  const { getTaxes, getExpenses } = useCountryCalculator()

  const data: ICategoryChartData[] = []
  let remainingAmount = yearlyIncome

  data.push(...getTaxes(code, yearlyIncome))
  data.push(...getExpenses(code))

  data.forEach((item) => (remainingAmount -= item.value))

  data.push({
    name: 'Surplus',
    value: remainingAmount
  })

  return data
}
