import { useDistributionData } from '@/composable/data-formatters/useDistributionData'
import { COUNTRIES } from '@/data/dataset'
import type { TCountryCode } from '@/types/countries'
import type { ITimeChartData, TChartSeries } from '@/types/echarts'
import type { TPeriod } from '@/types/expenses'

export function useSavingsData(
  countries: TCountryCode[],
  yearlyIncome: number,
  yearlyIncomeGain: number,
  initiallySaved: number,
  interest: number,
  interestPeriod: TPeriod,
  years: number
): TChartSeries<ITimeChartData>[] {
  const partialInterest = getPartialInterest(interest, interestPeriod)

  return Object.entries(COUNTRIES)
    .filter(([countryCode, _]) => countries.includes(countryCode as TCountryCode))
    .map(([countryCode, countryData]) => {
      const data: ITimeChartData[] = []
      let currentYearlyIncome = yearlyIncome
      let topUpAmount = useTopUpAmount(countryCode, currentYearlyIncome)
      let currentAmount = initiallySaved - countryData.expenses.relocation.value

      let dateIterator = getToday()
      const endDate = addYears(dateIterator, years)
      while (dateIterator < endDate) {
        if (isPromotionDate(dateIterator)) {
          currentYearlyIncome += (currentYearlyIncome * yearlyIncomeGain) / 100
          topUpAmount = useTopUpAmount(countryCode, currentYearlyIncome)
        }

        if (isTopUpDate(dateIterator)) {
          currentAmount += topUpAmount
        }
        if (isInterestDate(dateIterator, interestPeriod)) {
          currentAmount += (currentAmount * partialInterest) / 100
        }

        if (isReportDate(dateIterator)) {
          data.push({
            date: dateIterator,
            value: currentAmount
          })
        }

        dateIterator = getTomorrow(dateIterator)
      }

      return {
        name: countryData.name,
        data: data
      }
    })
}

const useTopUpAmount = (countryCode: TCountryCode, yearlyIncome: number): number => {
  const countryExpenses = useDistributionData(countryCode as TCountryCode, yearlyIncome)
  const surplus = countryExpenses[countryExpenses.length - 1].value
  return surplus / 12
}
const isTopUpDate = (date: Date): boolean => {
  return date.getUTCDate() === 1
}
const isReportDate = (date: Date): boolean => {
  return date.getUTCDate() === 1
}
const isInterestDate = (date: Date, interestPeriod: TPeriod): boolean => {
  return interestPeriod === 'month' ? date.getUTCDate() === 1 : true
}
const getPartialInterest = (interest: number, interestPeriod: TPeriod): number => {
  switch (interestPeriod) {
    case 'year':
      return interest
    case 'month':
      return interest / 12
    case 'day':
      return interest / 365
  }
}
const isPromotionDate = (date: Date): boolean => {
  return date.getMonth() === 1 && date.getUTCDate() === 1
}
const getToday = (): Date => {
  const now = new Date()
  return new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
}
const getTomorrow = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
}
const getNextMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, date.getDate())
}
const addYears = (date: Date, years: number) => {
  return new Date(date.getFullYear() + years, date.getMonth(), date.getDate())
}
