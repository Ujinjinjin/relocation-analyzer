<script setup lang="ts">
import type { TRaTableProps } from '@/components/RaTable.model'

defineProps<TRaTableProps>()
</script>

<template>
  <div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
        <tr>
          <th v-for="(item, index) of headers" scope="col" class="px-6 py-3" :key="index">
            {{ item }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="bg-white border-b" v-for="(row, rowIndex) of rows" :key="rowIndex">
          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
            {{ row[0] }}
          </th>
          <td class="px-6 py-4" v-for="(item, itemIndex) of row.slice(1)" :key="itemIndex">
            {{ item }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
