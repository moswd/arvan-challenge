<script setup lang="ts">
import BaseSpinner from '@components/BaseSpinner.vue'

interface Props {
  data?: any // TODO: change type
  headers: string[]
  columns: string[]
  columnsKey: string
  loading?: boolean
}

const {
  data,
  headers,
  columns,
  columnsKey,
  loading = false
} = defineProps<Props>()
</script>

<template>
  <div class="relative">
    <table v-if="data" class="text-gray-700 border border-gray-200 w-full">
      <thead>
        <tr>
          <th
            v-for="headerItem in headers"
            :key="headerItem"
            class="text-sm text-gray-500 p-3 border-b border-gray-300"
          >
            {{ headerItem }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="item of data"
          :key="(item[columnsKey] as string)"
          class="[&:nth-child(2n)]:bg-gray-100"
        >
          <td v-for="column in columns" :key="column" class="p-3">
            {{ item[column] }}
          </td>
        </tr>
      </tbody>
    </table>

    <div
      v-if="loading"
      class="absolute inset-0 flex items-center justify-center bg-white"
    >
      <base-spinner class="border-red-500 w-12 h-12"></base-spinner>
    </div>
  </div>
</template>
