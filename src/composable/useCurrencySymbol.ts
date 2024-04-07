import type { TCurrencyCode, TCurrencySymbol } from '@/types/countries'

export function useCurrencySymbol(code: TCurrencyCode): TCurrencySymbol {
  switch (code) {
    case 'EUR':
      return '€'
    case 'USD':
      return '$'
    case 'GEL':
      return '₾'
    case 'RUB':
      return '₽'
    case 'RON':
      return 'lei'
  }
}
