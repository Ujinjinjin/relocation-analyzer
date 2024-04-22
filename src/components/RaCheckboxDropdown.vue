<script setup lang="ts">
import type {
  TCheckOption,
  TRaCheckboxDropdownEmits,
  TRaCheckboxDropdownProps
} from '@/components/RaCheckboxDropdown.model'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { ref, type Ref } from 'vue'

const props = defineProps<TRaCheckboxDropdownProps>()
const emit = defineEmits<TRaCheckboxDropdownEmits>()

const options: Ref<TCheckOption[]> = ref(props.options)
function onChange(event: Event): void {
  options.value = options.value.map((item) => ({
    ...item,
    checked: item.key === (event.target as any).value
      ? (event.target as any).checked
      : item.checked,
  }))

  emit('changeSelection', options.value)
}
</script>

<template>
  <button id="dropdownSearchButton" data-dropdown-toggle="dropdownItems" class="inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 w-full" type="button">
    {{props.label}}
    <ChevronDownIcon class="h-5 w-5" />
  </button>

  <!-- Dropdown menu -->
  <div id="dropdownItems" class="z-10 hidden bg-white rounded-lg shadow w-60">
    <ul class="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700" aria-labelledby="dropdownSearchButton">
      <li v-for="option in options" :key="option.key">
        <div class="flex items-center p-2 rounded hover:bg-gray-100">
          <input :id="option.key" type="checkbox" :checked="option.checked" :value="option.key" @change="onChange" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded">
          <label :for="option.key" class="w-full ms-2 text-sm font-medium text-gray-900 rounded">{{option.value}}</label>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>
