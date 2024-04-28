import { type EChartsOption } from 'echarts'
import type { ITimeChartData, TChartParams } from '@/types/echarts'

export function useLineChart({ series, title }: TChartParams<ITimeChartData>): EChartsOption {
  return {
    legend: {
      show: true,
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
        type: 'line',
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
      type: 'time'
    },
    yAxis: {
      type: 'value'
    },
    series: series.map((seriesItem) => ({
      type: 'line',
      name: seriesItem.name,
      showSymbol: false,
      smooth: true,
      data: seriesItem.data.map((item) => [item.date, item.value])
    }))
  }
}
