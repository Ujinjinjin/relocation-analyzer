import type { TCountryDataDict } from '@/types/countries'

export const COUNTRIES: TCountryDataDict = {
  ES: {
    name: 'Spain',
    expenses: {
      taxes: [
        { name: 'Income', value: 25 },
        { name: 'Social', value: 6.45 }
      ],
      other: [
        { name: 'Rent', value: 1000, period: 'month' },
        { name: 'Gas', value: 30, period: 'month' },
        { name: 'Water', value: 40, period: 'month' },
        { name: 'Electricity', value: 80, period: 'month' },
        { name: 'Other', value: 3000, period: 'year' },
        { name: 'Living', value: 500, period: 'month' }
      ]
    }
  },
  RO: {
    name: 'Romania',
    expenses: {
      taxes: [{ name: 'Income', value: 10 }],
      other: [
        { name: 'Rent', value: 500, period: 'month' },
        { name: 'Living', value: 500, period: 'month' }
      ]
    }
  }
}
