<script setup lang="ts">
import RaChart from '@/components/RaChart.vue'
import { computed } from 'vue'
import { usePayrollData } from '@/composable/data-formatters/usePayrollData'
import { useBarChart } from '@/composable/useBarChart'
import { useConfigStore } from '@/stores/config.store'

const configStore = useConfigStore()

const payrollData = computed(() => usePayrollData(configStore.config.income))
const payrollChart = computed(() => {
  return useBarChart({
    series: [{
      data: payrollData.value,
    }],
    xAxis: {
      labels: payrollData.value.map((item) => item.name),
    }
  })
})
</script>

<template>
  <div class="flex flex-col space-x-2 items-center">
    <RaChart :options="payrollChart" class="h-96 w-full" />
  </div>
</template>
