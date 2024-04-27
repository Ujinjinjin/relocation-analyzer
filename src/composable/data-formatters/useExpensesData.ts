import { useCountryCalculator } from '@/composable/data-formatters/useCountryCalculator'
import { COUNTRIES } from '@/data/dataset'
import { useConfigStore } from '@/stores/config.store'
import type { TCountryCode } from '@/types/countries'
import type { TChartData } from '@/types/echarts'

export function useExpensesData(yearlyIncome: number): TChartData[] {
  const configStore = useConfigStore()
  const { getTaxes, getExpenses } = useCountryCalculator()
  const data: TChartData[] = []

  Object.entries(COUNTRIES)
    .filter(([countryCode, _]) =>
      configStore.config.countries.includes(countryCode as TCountryCode)
    )
    .forEach(([countryCode, countryData]) => {
      const expenses: TChartData[] = []
      expenses.push(...getTaxes(countryCode as TCountryCode, yearlyIncome))
      expenses.push(...getExpenses(countryCode as TCountryCode))

      const expensesSum = expenses.reduce((sum, current) => sum + current.value, 0)

      data.push({
        name: countryData.name,
        value: expensesSum
      })
    })

  return data
}
