<script setup lang="ts">
import * as echarts from 'echarts'
import { nanoid } from 'nanoid'
import { onMounted, type Ref, ref, watch } from 'vue'
import type { TRaChartProps } from '@/components/RaChart.model'

const props = defineProps<TRaChartProps>()

const chartContainer: Ref<HTMLElement | undefined> = ref()
const chart: Ref<echarts.ECharts | undefined> = ref()
const chartId: Ref<string> = ref(`chart-container-${nanoid(8)}`)

onMounted(() => {
  if (!chartContainer.value) {
    return
  }

  chart.value = echarts.init(chartContainer.value, null, { renderer: 'svg' })
  chart.value.setOption(props.options)
})

watch(props, () => {
  chart.value && chart.value.setOption(props.options)
})
</script>

<template>
  <div :id="chartId" ref="chartContainer" />
</template>
