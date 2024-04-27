import { type EChartsOption } from 'echarts'
import type { TChartParams } from '@/types/echarts'

export function usePieChart({ series, ...params }: TChartParams): EChartsOption {
  return {
    legend: {
      top: 'center',
      right: '0%',
      orient: 'vertical'
    },
    tooltip: {
      trigger: 'item'
    },
    title: {
      show: !!params.title,
      text: params.title,
      left: '50%'
    },
    series: series.map((seriesItem) => ({
      type: 'pie',
      center: ['40%', '50%'],
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      labelLine: {
        show: true
      },
      data: seriesItem.data
    }))
  }
}
