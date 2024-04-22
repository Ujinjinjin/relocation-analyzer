import type { TChartData } from '@/types/echarts'
import { COUNTRIES } from '@/data/dataset'
import { useIncomeData } from '@/composable/useIncomeData'
import type { TCountryCode } from '@/types/countries'
import { useConfigStore } from '@/stores/config.store'

export function useExpensesData(yearlyIncome: number): TChartData[] {
  const configStore = useConfigStore()
  const data: TChartData[] = []

  Object.entries(COUNTRIES)
    .filter(([countryCode, _]) => configStore.config.countries.includes(countryCode as TCountryCode))
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
