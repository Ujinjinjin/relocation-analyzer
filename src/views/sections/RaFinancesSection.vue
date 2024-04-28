<script setup lang="ts">
import { computed } from 'vue'
import RaChart from '@/components/RaChart.vue'
import { useExpensesData } from '@/composable/data-formatters/useExpensesData'
import { useSavingsData } from '@/composable/data-formatters/useSavingsData'
import { useSurplusData } from '@/composable/data-formatters/useSurplusData'
import { useBarChart } from '@/composable/useBarChart'
import { useLineChart } from '@/composable/useLineChart'
import { useConfigStore } from '@/stores/config.store'

const configStore = useConfigStore()

const surplusData = computed(() => useSurplusData(configStore.config.income))
const expensesData = computed(() => useExpensesData(configStore.config.income))
const ratioBarChart = computed(() =>
  useBarChart({
    title: 'Ratio',
    series: [
      {
        name: 'Expenses',
        data: expensesData.value,
        stack: 'total'
      },
      {
        name: 'Surplus',
        data: surplusData.value,
        stack: 'total'
      }
    ],
    xAxis: {
      labels: surplusData.value.map((item) => item.name)
    }
  })
)

const savingsData = computed(() => {
  return useSavingsData(
    configStore.config.countries,
    configStore.config.income,
    configStore.config.savings.initialAmount,
    configStore.config.savings.interest,
    'day',
    configStore.config.savings.years
  )
})
const savingsLineChart = computed(() =>
  useLineChart({
    title: 'Savings',
    series: savingsData.value
  })
)
</script>

<template>
  <div class="flex flex-col space-x-2 items-center py-4 space-y-4">
    <RaChart :options="ratioBarChart" class="h-96 w-full" />
    <RaChart :options="savingsLineChart" :refresh="true" class="h-96 w-full" />
  </div>
</template>

<style scoped></style>
