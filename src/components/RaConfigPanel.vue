<script setup lang="ts">
import RaInput from '@/components/RaInput.vue'
import RaSelect from '@/components/RaSelect.vue'
import type { TSelectionOption } from '@/components/RaSelect.model'
import { COUNTRIES } from '@/data/dataset'
import { computed, type ComputedRef, effect, ref, type Ref } from 'vue'
import { useConfigStore } from '@/stores/config.store'
import type { TCountryCode } from '@/types/countries'
import RaCheckboxDropdown from '@/components/RaCheckboxDropdown.vue'
import type { TCheckOption } from '@/components/RaCheckboxDropdown.model'

const configStore = useConfigStore()

const countrySelectionOptions: Ref<TCheckOption[]> = ref(
  Object.entries(COUNTRIES).map(([key, value]) => ({
    key: key,
    value: value.name,
    checked: true,
  }))
)

const currentCountryOptions: ComputedRef<TSelectionOption[]> = computed(() => {
  return configStore.config.countries.map((key) => ({
    key: key,
    value: COUNTRIES[key].name,
  }))
})

const selectedCountry: Ref<TSelectionOption> = ref(
  currentCountryOptions.value.filter((item) => item.key === configStore.config.countryCode)[0]
)
effect(() => {
  configStore.selectCountry(selectedCountry.value.key as TCountryCode)
})

const income: Ref<number> = ref(configStore.config.income)
effect(() => {
  configStore.setIncome(income.value)
})

function onChangeSelection(options: TCheckOption[]): void {
  const countryCodes = options
    .filter((item) => item.checked)
    .map((item) => item.key as TCountryCode)

  configStore.filterCountries(countryCodes)
}
</script>

<template>
  <RaSelect label="Country" :options="currentCountryOptions" v-model="selectedCountry" />
  <RaInput label="Income" v-model="income" :symbol="configStore.config.currencySymbol" />
  <RaCheckboxDropdown label="Select Countries" :options="countrySelectionOptions" @changeSelection="onChangeSelection" />
</template>

<style scoped>

</style>
