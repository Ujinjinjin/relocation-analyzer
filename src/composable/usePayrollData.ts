import type { TChartData } from '@/types/echarts'
import { COUNTRIES } from '@/data/dataset'

export function usePayrollData(yearlyIncome: number): TChartData[] {
  const data: TChartData[] = []

  Object.values(COUNTRIES)
    .forEach((countryData) => {
      const payrollCost = countryData.expenses.taxes.corporate
        .map(item => yearlyIncome * item.value / 100)
        .reduce((sum, current) => sum + current, 0)

      data.push({
        name: countryData.name,
        value: Math.ceil(payrollCost)
      })
    })

  return data
}
