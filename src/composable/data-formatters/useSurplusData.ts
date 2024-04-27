import { useDistributionData } from '@/composable/data-formatters/useDistributionData'
import { COUNTRIES } from '@/data/dataset'
import { useConfigStore } from '@/stores/config.store'
import type { TCountryCode } from '@/types/countries'
import type { TChartData } from '@/types/echarts'

export function useSurplusData(yearlyIncome: number): TChartData[] {
  const configStore = useConfigStore()
  const data: TChartData[] = []

  Object.entries(COUNTRIES)
    .filter(([countryCode, _]) =>
      configStore.config.countries.includes(countryCode as TCountryCode)
    )
    .forEach(([countryCode, countryData]) => {
      const countryExpenses = useDistributionData(countryCode as TCountryCode, yearlyIncome)

      data.push({
        name: countryData.name,
        value: countryExpenses[countryExpenses.length - 1].value
      })
    })

  return data
}
