import type { TChartData } from '@/types/echarts'
import { COUNTRIES } from '@/data/dataset'
import { useIncomeData } from '@/composable/useIncomeData'
import type { TCountryCode } from '@/types/countries'

export function useSavingsData(yearlyIncome: number): TChartData[] {
  const data: TChartData[] = []

  Object.entries(COUNTRIES)
    .forEach(([countryCode, countryData]) => {
      const countryExpenses = useIncomeData(countryCode as TCountryCode, yearlyIncome)

      data.push({
        name: countryData.name,
        value: countryExpenses[countryExpenses.length - 1].value,
      })
    })

  return data
}
