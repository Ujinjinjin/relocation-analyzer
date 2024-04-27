import { COUNTRIES } from '@/data/dataset'
import { useConfigStore } from '@/stores/config.store'
import type { TCountryCode } from '@/types/countries'
import type { ICategoryChartData } from '@/types/echarts'

export function usePayrollData(yearlyIncome: number): ICategoryChartData[] {
  const configStore = useConfigStore()
  const data: ICategoryChartData[] = []

  Object.entries(COUNTRIES)
    .filter(([countryCode, _]) =>
      configStore.config.countries.includes(countryCode as TCountryCode)
    )
    .forEach(([_, countryData]) => {
      const payrollCost = countryData.expenses.taxes.corporate
        .map((item) => (yearlyIncome * item.value) / 100)
        .reduce((sum, current) => sum + current, 0)

      data.push({
        name: countryData.name,
        value: Math.ceil(payrollCost)
      })
    })

  return data
}
