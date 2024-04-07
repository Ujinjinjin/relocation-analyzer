<script setup lang="ts">
import RaChart from '@/components/RaChart.vue'
import { usePieChart } from '@/composable/usePieChart'
import { computed, type Ref, ref } from 'vue'
import { useCountryData } from '@/composable/useCountryData'
import RaInput from '@/components/RaInput.vue'
import RaSelect from '@/components/RaSelect.vue'
import { COUNTRIES } from '@/data/countries'
import type { TSelectionOption } from '@/components/RaSelect.model'
import type { TCountryCode } from '@/types/countries'

const countrySelectionOptions: TSelectionOption[] = Object.entries(COUNTRIES).map(
  ([key, value]) => {
    return {
      key: key,
      value: value.name
    }
  }
)

const selectedCountry: Ref<TSelectionOption> = ref(countrySelectionOptions[0])
const yearlyIncome: Ref<number> = ref(50000)

const countryData = computed(() =>
  useCountryData(selectedCountry.value.key as TCountryCode, yearlyIncome.value)
)
const chartOptions = computed(() => usePieChart(countryData.value))
</script>

<template>
  <div class="w-64">
    <RaSelect label="Country" :options="countrySelectionOptions" v-model="selectedCountry" />
    <RaInput label="Income" v-model="yearlyIncome" />
  </div>
  <RaChart :options="chartOptions" />
</template>
