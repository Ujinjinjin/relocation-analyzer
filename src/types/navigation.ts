export type TTabCode =
 | 'distribution'
 | 'finances'
 | 'payroll'

export type TPageNavigation = {
  home: TTabCode
}

export type TPageCode = keyof TPageNavigation
