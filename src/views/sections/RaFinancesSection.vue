<script setup lang="ts">
import RaChart from '@/components/RaChart.vue'
import { useConfigStore } from '@/stores/config.store'
import { computed } from 'vue'
import { useSurplusData } from '@/composable/data-formatters/useSurplusData'
import { useBarChart } from '@/composable/useBarChart'
import { useExpensesData } from '@/composable/data-formatters/useExpensesData'

const configStore = useConfigStore()

const surplusData = computed(() => useSurplusData(configStore.config.income))
const expensesData = computed(() => useExpensesData(configStore.config.income))
const ratioBarChart = computed(() => useBarChart({
  series: [
    {
      name: 'Expenses',
      data: expensesData.value,
      stack: 'total',
    },
    {
      name: 'Surplus',
      data: surplusData.value,
      stack: 'total',
    }
  ],
  xAxis: {
    labels: surplusData.value.map((item) => item.name),
  },
  title: 'Ratio',
}))
</script>

<template>
  <div class="flex flex-col space-x-2 items-center py-4 space-y-4">
    <RaChart :options="ratioBarChart" class="h-96 w-full" />
  </div>
</template>

<style scoped>

</style>
