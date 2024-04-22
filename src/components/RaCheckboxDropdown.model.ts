export type TCheckOption = {
  key: string
  value: string
  checked: boolean
}

export type TRaCheckboxDropdownProps = {
  label: string
  options: TCheckOption[]
}

export type TRaCheckboxDropdownEmits = {
  changeSelection: [e: TCheckOption[]]
}
