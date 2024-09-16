import { defineStore } from 'pinia'
import type { Ref } from 'vue'
import { ref, watch } from 'vue'
import { COUNTRIES } from '@/data/dataset'
import type { TCountryCode, TCurrencySymbol } from '@/types/countries'
import type { TPeriod } from '@/types/expenses'

export type TConfiguration = {
  income: number
  incomeGain: number
  savings: {
    initialAmount: number
    interest: number
    interestPeriod: TPeriod
    years: number
  }
  countryCode: TCountryCode
  countries: TCountryCode[]
  currencySymbol: TCurrencySymbol
}

export const useConfigStore = defineStore('configuration', () => {
  const config: Ref<TConfiguration> = ref({
    income: 50000,
    incomeGain: 10,
    savings: {
      initialAmount: 10000,
      interest: 3,
      interestPeriod: 'day',
      years: 3
    },
    countryCode: 'ES',
    countries: Object.keys(COUNTRIES).map((key) => key as TCountryCode),
    currencySymbol: '€'
  })

  const localStorage = window.localStorage.getItem('ra-configuration')
  if (localStorage) {
    config.value = JSON.parse(localStorage)
  }

  watch(config, () => {
    window.localStorage.setItem('ra-configuration', JSON.stringify(config.value))
  })

  function setIncome(income: number): void {
    config.value = {
      ...config.value,
      income: income
    }
  }

  function setIncomeGain(incomeGain: number): void {
    config.value = {
      ...config.value,
      incomeGain: incomeGain
    }
  }

  function setSavingsInterest(interest: number): void {
    config.value = {
      ...config.value,
      savings: {
        ...config.value.savings,
        interest: interest
      }
    }
  }

  function setSavingsYears(years: number): void {
    config.value = {
      ...config.value,
      savings: {
        ...config.value.savings,
        years: years
      }
    }
  }

  function setSavingsInitialAmount(amount: number): void {
    config.value = {
      ...config.value,
      savings: {
        ...config.value.savings,
        initialAmount: amount
      }
    }
  }

  function selectCountry(countryCode: TCountryCode): void {
    config.value = {
      ...config.value,
      countryCode: countryCode
    }

    // const countryCurrencySymbol = computed(() => useCurrencySymbol(COUNTRIES[selectedCountry.value.key as TCountryCode].currency))
  }

  function filterCountries(countries: TCountryCode[]): void {
    config.value = {
      ...config.value,
      countries: countries
    }

    if (!countries.includes(config.value.countryCode)) {
      selectCountry(countries[0])
    }
  }

  return {
    config,
    setIncome,
    setIncomeGain,
    setSavingsInterest,
    setSavingsYears,
    setSavingsInitialAmount,
    selectCountry,
    filterCountries
  }
})
