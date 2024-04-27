<script setup lang="ts">
import RaChart from '@/components/RaChart.vue'
import { useConfigStore } from '@/stores/config.store'
import { computed } from 'vue'
import { useSavingsData } from '@/composable/useSavingsData'
import { useBarChart } from '@/composable/useBarChart'

const configStore = useConfigStore()

const savingsData = computed(() => useSavingsData(configStore.config.income))
const savingsChart = computed(() => useBarChart({
  data: savingsData.value,
  title: 'Per year',
}))
</script>

<template>
  <div class="flex flex-col space-x-2 items-center py-4 space-y-4">
    <RaChart :options="savingsChart" class="h-96 w-full" />
  </div>
</template>

<style scoped>

</style>
