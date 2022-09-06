<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
interface Props {
  modelValue: any
  id: string
  type: 'text' | 'email' | 'password' | 'textarea'
  label?: string
  errors?: string[]
  containerClasses?: string
}

const { modelValue, id, type, label, errors, containerClasses } =
  defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
}>()

// TODO: whats the best way to do this?
const value = $computed({
  get() {
    return modelValue
  },

  set(value) {
    emit('update:modelValue', value)
  }
})

const hasError = $computed(() => !!errors?.length)
</script>

<template>
  <div class="flex flex-col" :class="containerClasses">
    <label v-if="label" :for="id" class="mb-2 text-gray-600 text-sm">
      {{ label }}
    </label>

    <textarea
      v-if="type === 'textarea'"
      :id="id"
      v-model="value"
      v-bind="$attrs"
      :name="id"
    ></textarea>

    <input
      v-else
      :id="id"
      v-model="value"
      v-bind="$attrs"
      :type="type"
      :name="id"
      class="h-10 border rounded-md px-2 text-gray-700 outline-none focus:ring-1 transition"
      :class="{ 'ring-1 ring-red-300': hasError }"
    />

    <ul v-if="hasError" class="mt-2">
      <!-- TODO: what to do if we don't have a uniuqe key? -->
      <li
        v-for="(error, index) of errors"
        :key="index"
        class="text-sm text-red-600"
      >
        {{ error }}
      </li>
    </ul>
  </div>
</template>

<!-- TODO: check sizes and colors consistency -->
