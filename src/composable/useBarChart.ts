import { type EChartsOption } from 'echarts'
import type { TChartData } from '@/types/echarts'

export function useBarChart(data: TChartData[]): EChartsOption {
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
    xAxis: {
      type: 'category',
      data: data.map((item: TChartData) => item.name)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: data.map((item: TChartData) => item.value),
        type: 'bar',
        colorBy: 'data'
      }
    ]
  }
}
