<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import { onMounted } from 'vue'

interface Props {
  modelValue: any
  id: string
  type: 'text' | 'email' | 'password' | 'textarea'
  label?: string
  errors?: string[]
  containerClasses?: string
  autoFocus?: boolean
}

const { modelValue, id, type, label, errors, containerClasses, autoFocus = false } = defineProps<Props>()

let inputRef = $ref<HTMLInputElement | HTMLTextAreaElement>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
}>()

const value = $computed({
  get() {
    return modelValue
  },

  set(value) {
    emit('update:modelValue', value)
  }
})

const hasError = $computed(() => !!errors?.length)

onMounted(() => {
  if (autoFocus && inputRef) {
    inputRef?.focus()
  }
})
</script>

<template>
  <div class="flex flex-col" :class="containerClasses">
    <label v-if="label" :for="id" class="mb-2 text-gray-600 text-sm">
      {{ label }}
    </label>

    <textarea
      v-if="type === 'textarea'"
      :id="id"
      v-bind="$attrs"
      ref="inputRef"
      v-model="value"
      :name="id"
      class="border rounded p-2 text-tiny text-gray-700 outline-none focus:ring-1 transition"
      :class="{ 'ring-1 ring-red-300': hasError }"
    ></textarea>

    <input
      v-else
      :id="id"
      v-bind="$attrs"
      ref="inputRef"
      v-model="value"
      :type="type"
      :name="id"
      class="h-9 border rounded px-2 text-tiny text-gray-700 outline-none focus:ring-1 transition"
      :class="{ 'ring-1 ring-red-300': hasError }"
    />

    <ul v-if="hasError" class="mt-2">
      <li v-for="error of errors" :key="error" class="text-sm text-red-600">
        {{ error }}
      </li>
    </ul>
  </div>
</template>
