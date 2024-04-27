<script setup lang="ts">
import { computed, type ComputedRef, useSlots } from 'vue'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import type {
  TRaNavigationTabsEmits,
  TRaNavigationTabsProps
} from '@/components/RaNavigationTabs.model'

const props = defineProps<TRaNavigationTabsProps>()
const emit = defineEmits<TRaNavigationTabsEmits>()

const slots = useSlots()
const slotNames: ComputedRef<string[]> = computed(() => Object.keys(slots))

const tabNames: ComputedRef<string[]> = computed(() =>
  slotNames.value.map((name) => props.tabs[name])
)
const defaultIndex: ComputedRef<number> = computed(() => {
  const index = slotNames.value.indexOf(props.defaultTab || '')
  return index >= 0 ? index : 0
})

function onTabChange(payload: number): void {
  emit('tabSelected', slotNames.value[payload])
}
</script>

<template>
  <div class="flex flex-col items-center">
    <TabGroup @change="onTabChange" :default-index="defaultIndex">
      <TabList class="flex space-x-1 max-w-md rounded-xl bg-gray-100 p-1 w-full">
        <Tab v-for="tabName in tabNames" as="template" :key="tabName" v-slot="{ selected }">
          <button
            :class="[
              'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
              'ring-white/60 ring-offset-2',
              selected ? 'bg-white shadow' : 'hover:bg-gray-200/75'
            ]"
          >
            {{ tabName }}
          </button>
        </Tab>
      </TabList>

      <TabPanels class="mt-2 w-full">
        <TabPanel v-for="slot of slotNames" :key="slot">
          <slot :name="slot" />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>
