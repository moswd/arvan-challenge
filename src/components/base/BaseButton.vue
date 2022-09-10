<script setup lang="ts">
import BaseSpinner from '@components/base/BaseSpinner.vue'

interface Props {
  type?: 'default' | 'success' | 'failure' | 'warning' | 'clear'
  loading?: boolean
  disabled?: boolean
}

const { type = 'default', loading = false, disabled = false } = defineProps<Props>()

let styleClasses = {
  default: 'border bg-cyan-600 border-cyan-700 text-white',
  success: 'border bg-green-600 border-green-700 text-white',
  failure: 'border bg-red-500 border-red-600 text-white',
  warning: 'border bg-orange-400 border-orange-600 text-white',
  clear: 'border-0 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-100 transition-colors'
}

const disabledClasses = 'bg-gray-100 border-gray-200 text-gray-400 border'
</script>

<template>
  <button
    class="h-9 px-4 rounded text-tiny transition-colors flex justify-center items-center"
    :class="disabled && type !== 'clear' ? disabledClasses : styleClasses[type]"
    :disabled="disabled"
  >
    <base-spinner v-if="loading" class="mr-2"></base-spinner>
    <slot></slot>
  </button>
</template>
