<script setup lang="ts">
import RaChart from '@/components/RaChart.vue'
import { usePieChart } from '@/composable/usePieChart'
import { computed, type Ref, ref } from 'vue'
import { useIncomeData } from '@/composable/useIncomeData'
import RaInput from '@/components/RaInput.vue'
import RaSelect from '@/components/RaSelect.vue'
import { COUNTRIES } from '@/data/dataset'
import type { TSelectionOption } from '@/components/RaSelect.model'
import type { TCountryCode, TCurrencySymbol } from '@/types/countries'
import RaTable from '@/components/RaTable.vue'
import RaNavigationTabs from '@/components/RaNavigationTabs.vue'
import type { TRaNavigationTabNameMap } from '@/components/RaNavigationTabs.model'
import { usePayrollData } from '@/composable/usePayrollData'
import { useBarChart } from '@/composable/useBarChart'
import { useExpensesData } from '@/composable/useExpensesData'
import { useSavingsData } from '@/composable/useSavingsData'

const countrySelectionOptions: TSelectionOption[] = Object.entries(COUNTRIES).map(
  ([key, value]) => {
    return {
      key: key,
      value: value.name
    }
  }
)

const yearlyIncome: Ref<number> = ref(50000)
const selectedCountry: Ref<TSelectionOption> = ref(countrySelectionOptions[0])
const countryCurrencySymbol: Ref<TCurrencySymbol> = ref('€')
// const countryCurrencySymbol = computed(() => useCurrencySymbol(COUNTRIES[selectedCountry.value.key as TCountryCode].currency))

const incomeData = computed(() =>
  useIncomeData(selectedCountry.value.key as TCountryCode, yearlyIncome.value)
)
const incomeChart = computed(() => usePieChart(incomeData.value))
const incomeTableHeaders = computed(() => ['Budget segment', `Amount (${countryCurrencySymbol.value})`])
const incomeTableRows = computed(() => incomeData.value.map((item) => [item.name, `${item.value}`]))

const expensesData = computed(() => useExpensesData(yearlyIncome.value))
const expensesChart = computed(() => useBarChart(expensesData.value))

const savingsData = computed(() => useSavingsData(yearlyIncome.value))
const savingsChart = computed(() => useBarChart(savingsData.value))

const payrollData = computed(() => usePayrollData(yearlyIncome.value))
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
      <RaSelect label="Country" :options="countrySelectionOptions" v-model="selectedCountry" />
      <RaInput label="Income" v-model="yearlyIncome" :symbol="countryCurrencySymbol" />
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
