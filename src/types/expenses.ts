export type TExpense = {
  value: number
  name: string
}

export type TExpensePeriod = 'year' | 'month'

export type TPeriodicExpense = TExpense & {
  period: TExpensePeriod
}

export type TLivingExpenses = {
  taxes: {
    personal: TExpense[]
    corporate: TExpense[]
  }
  other: TPeriodicExpense[]
}
