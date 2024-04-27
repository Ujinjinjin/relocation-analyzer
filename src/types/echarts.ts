export type TChartData = {
  value: number
  name: string
}

export type TChartSeries = {
  name?: string
  stack?: string
  data: TChartData[]
}

export type TChartAxis = {
  labels?: string[]
}

export type TChartParams = {
  series: TChartSeries[]
  title?: string
  xAxis?: TChartAxis
}
