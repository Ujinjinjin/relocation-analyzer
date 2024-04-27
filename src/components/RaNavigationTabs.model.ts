export type TRaNavigationTabNameMap = {
  [key: string]: string
}

export type TRaNavigationTabsProps = {
  tabs: TRaNavigationTabNameMap
  defaultTab?: string
}

export type TRaNavigationTabsEmits = {
  tabSelected: [name: string]
}
