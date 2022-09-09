<script setup lang="ts">
export interface TableColumns {
  [key: string]: {
    header: string
    visibility?: string
  }
}

import BaseButton from '@components/base/BaseButton.vue'
import BaseSpinner from '@components/base/BaseSpinner.vue'

interface TableData {
  [key: string]: any
}

interface Props {
  data?: TableData
  columns: TableColumns
  columnsKey: string
  page: number
  hasNext: boolean
  loading?: boolean
}

const { data, columns, columnsKey, page, hasNext, loading = false } = defineProps<Props>()

const emit = defineEmits<{
  (e: 'pageChanged', newPage: number): void
}>()

let columnsEntries = $computed(() => Object.entries(columns))
</script>

<template>
  <div class="relative min-h-[24.744375rem]">
    <table v-if="data" class="text-gray-700 text-tiny sm:text-sm w-full">
      <thead>
        <tr>
          <th
            v-for="[col, colData] in columnsEntries"
            :key="col"
            class="text-left text-tiny bg-gray-50 text-gray-500 font-normal p-2"
            :class="{ [`hidden ${colData?.visibility ?? ''}:table-cell`]: !!colData?.visibility }"
          >
            {{ colData.header }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="row of data" :key="(row[columnsKey] as string)" class="[&:nth-child(2n)]:bg-gray-50">
          <td
            v-for="[col, colData] in columnsEntries"
            :key="col"
            class="p-3"
            :class="{ [`hidden ${colData?.visibility ?? ''}:table-cell`]: !!colData?.visibility }"
          >
            <template v-if="!$slots[`${col}-col`]">
              {{ row[col] }}
            </template>

            <slot :name="`${col}-col`" :column="row[col]" :row="row"></slot>
          </td>
        </tr>
      </tbody>
    </table>

    <Transition>
      <div v-if="loading" class="absolute inset-0 flex justify-center bg-white">
        <base-spinner class="border-red-500 mt-24 w-12 h-12"></base-spinner>
      </div>
    </Transition>
  </div>

  <Transition>
    <div v-if="page && !loading && !(page === 1 && !hasNext)" class="flex items-center justify-center gap-1 mt-4">
      <base-button :disabled="loading || page === 1" @click="emit('pageChanged', page - 1)">Previous</base-button>
      <base-button :disabled="loading || !hasNext" @click="emit('pageChanged', page + 1)">Next</base-button>
    </div>
  </Transition>
</template>
