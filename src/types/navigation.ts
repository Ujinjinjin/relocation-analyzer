export type TTabCode =
 | 'income'
 | 'expenses'
 | 'savings'
 | 'payroll'

export type TPageNavigation = {
  home: TTabCode
}

export type TPageCode = keyof TPageNavigation
