export interface IChartData {
  value: number
}

export interface ICategoryChartData extends IChartData {
  name: string
}

export interface ITimeChartData extends IChartData {
  date: Date
}

export type TChartSeries<T extends IChartData> = {
  name?: string
  stack?: string
  data: T[]
}

export type TChartAxis = {
  labels?: string[]
}

export type TChartParams<T extends IChartData> = {
  series: TChartSeries<T>[]
  title?: string
  xAxis?: TChartAxis
}
