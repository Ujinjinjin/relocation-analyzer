import { type EChartsOption } from 'echarts'
import type { ICategoryChartData, TChartParams } from '@/types/echarts'

export function useBarChart({
  series,
  xAxis,
  title
}: TChartParams<ICategoryChartData>): EChartsOption {
  return {
    legend: {
      top: 'center',
      right: '0%',
      orient: 'vertical'
    },
    grid: {
      right: '10%'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      valueFormatter: (value) => {
        return Math.ceil(parseFloat(value?.toString() ?? '0')).toLocaleString()
      }
    },
    title: {
      show: !!title,
      text: title,
      left: '50%'
    },
    xAxis: {
      type: 'category',
      data: xAxis?.labels
    },
    yAxis: {
      type: 'value'
    },
    series: series.map((seriesItem) => ({
      name: seriesItem.name,
      data: seriesItem.data.map((item: ICategoryChartData) => item.value),
      type: 'bar',
      stack: seriesItem.stack
    }))
  }
}
