<script setup lang="ts">
import { type ModelRef, ref, type Ref } from 'vue'
import type { TRaInputProps } from '@/components/RaInput.model'
import { nanoid } from 'nanoid'

defineProps<TRaInputProps>()
const valueModel: ModelRef<string | undefined> = defineModel()

const inputId: Ref<string> = ref(nanoid(8))
</script>

<template>
  <div>
    <label v-if="label" :for="inputId" class="block text-sm font-medium leading-6 text-gray-900">{{
      label
    }}</label>
    <div class="relative mt-2 rounded-md shadow-sm">
      <div
        v-if="symbol"
        class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
      >
        <span class="text-gray-500 sm:text-sm">{{ symbol }}</span>
      </div>
      <input
        v-model="valueModel"
        :id="inputId"
        type="number"
        class="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder="0"
      />
    </div>
  </div>
</template>

<style scoped></style>
