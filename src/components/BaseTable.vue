<script setup lang="ts">
import BaseButton from '@components/BaseButton.vue'
import BaseSpinner from '@components/BaseSpinner.vue'

interface Props {
  data?: any // TODO: change type
  headers: string[]
  columns: string[]
  columnsKey: string
  page: number
  hasNext: boolean
  loading?: boolean
}

const {
  data,
  headers,
  columns,
  columnsKey,
  page,
  hasNext,
  loading = false
} = defineProps<Props>()

const emit = defineEmits<{
  (e: 'pageChanged', newPage: number): void
}>()
</script>

<template>
  <div class="relative min-h-[20rem]">
    <table v-if="data" class="text-gray-700 border border-gray-200 w-full">
      <thead>
        <tr>
          <th
            v-for="headerItem in headers"
            :key="headerItem"
            class="text-left text-sm text-gray-500 p-3 border-b border-gray-200"
          >
            {{ headerItem }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="row of data"
          :key="(row[columnsKey] as string)"
          class="[&:nth-child(2n)]:bg-gray-100"
        >
          <!-- TODO: is this best practice -->
          <td v-for="column in columns" :key="column" class="p-3">
            <template v-if="!$slots[`${column}-col`]">
              {{ row[column] }}
            </template>

            <slot
              :name="`${column}-col`"
              :column="row[column]"
              :row="row"
            ></slot>
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

  <div v-if="page" class="flex items-center justify-center gap-1 mt-4">
    <base-button
      :disabled="loading || page === 1"
      @click="emit('pageChanged', page - 1)"
      >Prev</base-button
    >

    <base-button
      :disabled="loading || !hasNext"
      @click="emit('pageChanged', page + 1)"
      >Next</base-button
    >
  </div>
</template>
