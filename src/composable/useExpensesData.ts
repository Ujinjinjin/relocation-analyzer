import type { TChartData } from '@/types/echarts'
import { COUNTRIES } from '@/data/dataset'
import { useIncomeData } from '@/composable/useIncomeData'
import type { TCountryCode } from '@/types/countries'

export function useExpensesData(yearlyIncome: number): TChartData[] {
  const data: TChartData[] = []

  Object.entries(COUNTRIES)
    .forEach(([countryCode, countryData]) => {
      const countryExpenses = useIncomeData(countryCode as TCountryCode, yearlyIncome)
      const expensesSum = countryExpenses
        .slice(0, -1)
        .reduce((sum, current) => sum + current.value, 0)

      data.push({
        name: countryData.name,
        value: expensesSum,
      })
    })

  return data
}
