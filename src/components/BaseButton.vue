<script setup lang="ts">
import BaseSpinner from '@components/BaseSpinner.vue'

interface Props {
  type?: 'default' | 'success' | 'failure' | 'warning' // TODO: extract to enum
  loading?: boolean
  disabled?: boolean
}

const {
  type = 'default',
  loading = false,
  disabled = false
} = defineProps<Props>()

let styleClasses = {
  default: 'bg-cyan-600 border-cyan-700',
  success: 'bg-green-600 border-green-700',
  failure: 'bg-red-600 border-red-700',
  warning: 'bg-orange-400 border-orange-600'
}

const disabledClasses =
  'bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed'
</script>

<template>
  <button
    class="h-10 px-2 border rounded-md transition-colors text-white font-bold flex justify-center items-center"
    :disabled="disabled"
    :class="disabled ? disabledClasses : styleClasses[type]"
  >
    <base-spinner v-if="loading" class="mr-2"></base-spinner>
    <slot></slot>
  </button>
</template>
