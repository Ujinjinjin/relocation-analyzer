<script setup lang="ts">
import RaInput from '@/components/RaInput.vue'
import RaSelect from '@/components/RaSelect.vue'
import type { TSelectionOption } from '@/components/RaSelect.model'
import { COUNTRIES } from '@/data/dataset'
import { computed, type ComputedRef, effect, ref, type Ref } from 'vue'
import { useConfigStore } from '@/stores/config.store'
import type { TCountryCode } from '@/types/countries'

const configStore = useConfigStore()

const countrySelectionOptions: ComputedRef<TSelectionOption[]> = computed(() => {
  return configStore.config.countries.map((key) => ({
    key: key,
    value: COUNTRIES[key].name,
  }))
})

const selectedCountry: Ref<TSelectionOption> = ref(
  countrySelectionOptions.value.filter((item) => item.key === configStore.config.countryCode)[0]
)
effect(() => {
  configStore.selectCountry(selectedCountry.value.key as TCountryCode)
})

const income: Ref<number> = ref(configStore.config.income)
effect(() => {
  configStore.setIncome(income.value)
})
</script>

<template>
  <RaSelect label="Country" :options="countrySelectionOptions" v-model="selectedCountry" />
  <RaInput label="Income" v-model="income" :symbol="configStore.config.currencySymbol" />
</template>

<style scoped>

</style>
