<script setup lang="ts">
import BaseSpinner from '@components/base/BaseSpinner.vue'

interface Props {
  type?: 'default' | 'success' | 'failure' | 'warning' | 'clear' // TODO: extract to enum
  loading?: boolean
  disabled?: boolean
}

const {
  type = 'default',
  loading = false,
  disabled = false
} = defineProps<Props>()

let styleClasses = {
  default: 'border rounded-md bg-cyan-600 border-cyan-700 text-white font-bold',
  success:
    'border rounded-md bg-green-600 border-green-700 text-white font-bold',
  failure: 'border rounded-md bg-red-500 border-red-600 text-white font-bold',
  warning:
    'border rounded-md bg-orange-400 border-orange-600 text-white font-bold',
  clear: 'border-0 text-gray-700'
}

const disabledClasses =
  'bg-gray-200 border-gray-300 text-gray-400 border rounded-md font-bold'
</script>

<template>
  <!-- TODO: extract class to computed & find a better way to handle it -->
  <button
    class="h-10 px-4 transition-colors flex justify-center items-center"
    :class="disabled && type !== 'clear' ? disabledClasses : styleClasses[type]"
    :disabled="disabled"
  >
    <base-spinner v-if="loading" class="mr-2"></base-spinner>
    <slot></slot>
  </button>
</template>
