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
    tooltip: {
      trigger: 'axis'
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
