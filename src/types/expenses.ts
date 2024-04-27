export type TExpense = {
  value: number
  name: string
}

export type TPeriod = 'year' | 'month' | 'day'

export type TPeriodicExpense = TExpense & {
  period: TPeriod
}

export type TLivingExpenses = {
  taxes: {
    personal: TExpense[]
    corporate: TExpense[]
  }
  other: TPeriodicExpense[]
}
