<script setup lang="ts">
import { computed, type ComputedRef } from 'vue'
import RaChart from '@/components/RaChart.vue'
import type { TRaNavigationTabNameMap } from '@/components/RaNavigationTabs.model'
import RaNavigationTabs from '@/components/RaNavigationTabs.vue'
import RaTable from '@/components/RaTable.vue'
import { useDistributionData } from '@/composable/data-formatters/useDistributionData'
import { usePayrollData } from '@/composable/data-formatters/usePayrollData'
import { useBarChart } from '@/composable/useBarChart'
import { usePieChart } from '@/composable/usePieChart'
import { useConfigStore } from '@/stores/config.store'
import { useNavigationStore } from '@/stores/navigation.store'
import type { TCountryCode } from '@/types/countries'
import type { TTabCode } from '@/types/navigation'
import RaConfigSection from '@/views/sections/RaConfigSection.vue'
import RaFinancesSection from '@/views/sections/RaFinancesSection.vue'

const configStore = useConfigStore()
const navigationStore = useNavigationStore()

const incomeData = computed(() =>
  useDistributionData(configStore.config.countryCode as TCountryCode, configStore.config.income)
)
const incomeChart = computed(() => usePieChart({ series: [{ data: incomeData.value }] }))
const incomeTableHeaders = computed(() => [
  'Budget segment',
  `Amount (${configStore.config.currencySymbol})`
])
const incomeTableRows = computed(() => incomeData.value.map((item) => [item.name, `${item.value}`]))

const payrollData = computed(() => usePayrollData(configStore.config.income))
const payrollChart = computed(() => useBarChart({ series: [{ data: payrollData.value }] }))

const navigationTabs: TRaNavigationTabNameMap = {
  distribution: 'Distribution',
  finances: 'Finances',
  payroll: 'Payroll Cost'
}
const defaultTab: ComputedRef<TTabCode> = computed(
  () => navigationStore.lastTab ?? Object.keys(navigationTabs)[0]
)

function onTabSelected(payload: string): void {
  navigationStore.navigatedTo(payload as TTabCode)
}
</script>

<template>
  <div class="flex mx-16 mt-16 w-5/6">
    <div class="min-w-64 space-y-4">
      <RaConfigSection />
    </div>
    <RaNavigationTabs
      :tabs="navigationTabs"
      class="w-full"
      :default-tab="defaultTab"
      @tabSelected="onTabSelected"
    >
      <template v-slot:distribution>
        <div class="w-full m-auto flex flex-col space-x-2 items-center">
          <RaChart :options="incomeChart" class="h-96 w-full" />
          <RaTable
            class="max-h-[32rem] w-full"
            :headers="incomeTableHeaders"
            :rows="incomeTableRows"
          />
        </div>
      </template>

      <template v-slot:finances>
        <RaFinancesSection class="w-full m-auto" />
      </template>

      <template v-slot:payroll>
        <div class="w-full m-auto flex flex-col space-x-2 items-center">
          <RaChart :options="payrollChart" class="h-96 w-full" />
        </div>
      </template>
    </RaNavigationTabs>
  </div>
</template>
