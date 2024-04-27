<script setup lang="ts">
import { computed, type ComputedRef, effect, ref, type Ref } from 'vue'
import type { TCheckOption } from '@/components/RaCheckboxDropdown.model'
import RaCheckboxDropdown from '@/components/RaCheckboxDropdown.vue'
import RaInput from '@/components/RaInput.vue'
import type { TSelectionOption } from '@/components/RaSelect.model'
import RaSelect from '@/components/RaSelect.vue'
import { COUNTRIES } from '@/data/dataset'
import { useConfigStore } from '@/stores/config.store'
import { useNavigationStore } from '@/stores/navigation.store'
import type { TCountryCode } from '@/types/countries'

const configStore = useConfigStore()
const navigationStore = useNavigationStore()

const countrySelectorVisible: ComputedRef<boolean> = computed(
  () => navigationStore.lastTab === 'distribution'
)

const countrySelectionOptions: Ref<TCheckOption[]> = ref(
  Object.entries(COUNTRIES).map(([key, value]) => ({
    key: key,
    value: value.name,
    checked: configStore.config.countries.includes(key as TCountryCode)
  }))
)

const currentCountryOptions: ComputedRef<TSelectionOption[]> = computed(() => {
  return configStore.config.countries.map((key) => ({
    key: key,
    value: COUNTRIES[key].name
  }))
})

const selectedCountry: Ref<TSelectionOption> = ref(
  currentCountryOptions.value.filter((item) => item.key === configStore.config.countryCode)[0] ??
    currentCountryOptions.value[0]
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

  if (!countryCodes.includes(selectedCountry.value.key as TCountryCode)) {
    selectedCountry.value = currentCountryOptions.value[0]
  }
}
</script>

<template>
  <RaInput label="Income" v-model="income" :symbol="configStore.config.currencySymbol" />
  <RaCheckboxDropdown
    label="Enabled Countries"
    :options="countrySelectionOptions"
    @changeSelection="onChangeSelection"
  />
  <RaSelect
    v-if="countrySelectorVisible"
    label="Country"
    :options="currentCountryOptions"
    v-model="selectedCountry"
  />
</template>

<style scoped></style>
