import { type EChartsOption } from 'echarts'
import type { TChartData } from '@/types/echarts'

export function usePieChart(data: TChartData[]): EChartsOption {
  return {
    color: [
      '#dc2626',
      '#ea580c',
      '#fbbf24',
      '#65a30d',
      '#4ade80',
      '#059669',
      '#0891b2',
      '#1d4ed8',
      '#4f46e5',
      '#7e22ce',
      '#a21caf',
      '#be185d',
      '#e11d48'
    ],
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
