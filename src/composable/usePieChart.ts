import { type EChartsOption } from 'echarts'
import type { TChartData } from '@/types/echarts'

export function usePieChart(data: TChartData[]): EChartsOption {
  return {
    title: {
      show: true,
      text: 'Income Distribution'
    },
    legend: {
      top: 'center',
      right: '0%',
      orient: 'vertical'
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: 'Income Distribution',
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
        data: data
      }
    ]
  }
}
