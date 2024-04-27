<script setup lang="ts">
import RaChart from '@/components/RaChart.vue'
import RaTable from '@/components/RaTable.vue'
import { computed } from 'vue'
import { useDistributionData } from '@/composable/data-formatters/useDistributionData'
import type { TCountryCode } from '@/types/countries'
import { usePieChart } from '@/composable/usePieChart'
import { useConfigStore } from '@/stores/config.store'

const configStore = useConfigStore()

const incomeData = computed(() =>
  useDistributionData(configStore.config.countryCode as TCountryCode, configStore.config.income)
)
const incomeChart = computed(() => usePieChart({ series: [{ data: incomeData.value }] }))
const incomeTableHeaders = computed(() => [
  'Budget segment',
  `Amount (${configStore.config.currencySymbol})`
])
const incomeTableRows = computed(() => incomeData.value.map((item) => [item.name, `${item.value}`]))
</script>

<template>
  <div class="flex flex-col space-x-2 items-center">
    <RaChart :options="incomeChart" class="h-96 w-full" />
    <RaTable
      class="max-h-[32rem] w-full"
      :headers="incomeTableHeaders"
      :rows="incomeTableRows"
    />
  </div>
</template>
