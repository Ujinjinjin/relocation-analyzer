<script setup lang="ts">
import { computed, type ComputedRef } from 'vue'
import type { TRaNavigationTabNameMap } from '@/components/RaNavigationTabs.model'
import RaNavigationTabs from '@/components/RaNavigationTabs.vue'
import { useNavigationStore } from '@/stores/navigation.store'
import type { TTabCode } from '@/types/navigation'
import RaConfigSection from '@/views/sections/RaConfigSection.vue'
import RaDistributionSection from '@/views/sections/RaDistributionSection.vue'
import RaFinancesSection from '@/views/sections/RaFinancesSection.vue'
import RaPayrollSection from '@/views/sections/RaPayrollSection.vue'

const navigationStore = useNavigationStore()

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
        <RaDistributionSection class="w-full m-auto" />
      </template>

      <template v-slot:finances>
        <RaFinancesSection class="w-full m-auto" />
      </template>

      <template v-slot:payroll>
        <RaPayrollSection class="w-full m-auto" />
      </template>
    </RaNavigationTabs>
  </div>
</template>
