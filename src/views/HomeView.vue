<script setup lang="ts">
import RaChart from '@/components/RaChart.vue'
import { usePieChart } from '@/composable/usePieChart'
import { computed } from 'vue'
import { useIncomeData } from '@/composable/useIncomeData'
import type { TCountryCode } from '@/types/countries'
import RaTable from '@/components/RaTable.vue'
import RaNavigationTabs from '@/components/RaNavigationTabs.vue'
import type { TRaNavigationTabNameMap } from '@/components/RaNavigationTabs.model'
import { usePayrollData } from '@/composable/usePayrollData'
import { useBarChart } from '@/composable/useBarChart'
import { useExpensesData } from '@/composable/useExpensesData'
import { useSavingsData } from '@/composable/useSavingsData'
import RaConfigPanel from '@/components/RaConfigPanel.vue'
import { useConfigStore } from '@/stores/config.store'

const configStore = useConfigStore()

const incomeData = computed(() =>
  useIncomeData(configStore.config.countryCode as TCountryCode, configStore.config.income)
)
const incomeChart = computed(() => usePieChart(incomeData.value))
const incomeTableHeaders = computed(() => ['Budget segment', `Amount (${configStore.config.currencySymbol})`])
const incomeTableRows = computed(() => incomeData.value.map((item) => [item.name, `${item.value}`]))

const expensesData = computed(() => useExpensesData(configStore.config.income))
const expensesChart = computed(() => useBarChart(expensesData.value))

const savingsData = computed(() => useSavingsData(configStore.config.income))
const savingsChart = computed(() => useBarChart(savingsData.value))

const payrollData = computed(() => usePayrollData(configStore.config.income))
const payrollChart = computed(() => useBarChart(payrollData.value))

const navigationTabs: TRaNavigationTabNameMap = {
  'income': 'Income Distribution',
  'expenses': 'Expenses',
  'savings': 'Savings',
  'payroll': 'Payroll Cost'
}
</script>

<template>
  <div class="flex mx-16 mt-16 w-5/6">
    <div class="min-w-64 space-y-4">
      <RaConfigPanel />
    </div>
    <RaNavigationTabs :tabs="navigationTabs" class="w-full">
      <template v-slot:income>
        <div class="w-full m-auto flex flex-col space-x-2 items-center">
          <RaChart :options="incomeChart" class="h-96 w-full" />
          <RaTable class="max-h-[32rem] w-full" :headers="incomeTableHeaders" :rows="incomeTableRows" />
        </div>
      </template>

      <template v-slot:expenses>
        <div class="w-full m-auto flex flex-col space-x-2 items-center">
          <RaChart :options="expensesChart" class="h-96 w-full" />
        </div>
      </template>

      <template v-slot:savings>
        <div class="w-full m-auto flex flex-col space-x-2 items-center">
          <RaChart :options="savingsChart" class="h-96 w-full" />
        </div>
      </template>

      <template v-slot:payroll>
        <div class="w-full m-auto flex flex-col space-x-2 items-center">
          <RaChart :options="payrollChart" class="h-96 w-full" />
        </div>
      </template>
    </RaNavigationTabs>
  </div>
</template>
