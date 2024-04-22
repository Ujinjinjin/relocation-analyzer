import { defineStore } from 'pinia'
import type { Ref } from 'vue'
import type { TCountryCode, TCurrencySymbol } from '@/types/countries'
import { ref } from 'vue'
import { COUNTRIES } from '@/data/dataset'

export type TConfiguration = {
  income: number
  countryCode: TCountryCode
  countries: TCountryCode[]
  currencySymbol: TCurrencySymbol,
}

export const useConfigStore = defineStore('configuration', () => {
  const config: Ref<TConfiguration> = ref({
    income: 50000,
    countryCode: 'ES',
    countries: Object.keys(COUNTRIES).map((key) => key as TCountryCode),
    currencySymbol: '€',
  })

  function setIncome(income: number): void {
    config.value = {
      ...config.value,
      income: income,
    }
  }

  function selectCountry(countryCode: TCountryCode): void {
    config.value = {
      ...config.value,
      countryCode: countryCode,
    }

    // const countryCurrencySymbol = computed(() => useCurrencySymbol(COUNTRIES[selectedCountry.value.key as TCountryCode].currency))
  }

  function filterCountries(countries: TCountryCode[]): void {
    config.value = {
      ...config.value,
      countries: countries,
    }

    if (!countries.includes(config.value.countryCode)) {
      selectCountry(countries[0])
    }
  }

  return {
    config,
    setIncome,
    selectCountry,
    filterCountries,
  }
})
