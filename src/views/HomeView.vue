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
import RaTable from '@/components/RaTable.vue'

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

const tableHeaders = ['Budget segment', 'Amount (€)']
const tableRows = computed(() => countryData.value.map((item) => [item.name, `${item.value}`]))
</script>

<template>
  <div class="flex mx-16 mt-16">
    <div class="w-64 m-auto space-y-4 max-h-screen">
      <RaSelect label="Country" :options="countrySelectionOptions" v-model="selectedCountry" />
      <RaInput label="Income" v-model="yearlyIncome" />
    </div>
    <div class="w-full m-auto mx-8 flex flex-col justify-center align-middle space-x-2">
      <RaChart :options="chartOptions" class="h-96 w-4/5" />
      <RaTable class="w-4/5 self-center" :headers="tableHeaders" :rows="tableRows" />
    </div>
  </div>
</template>
