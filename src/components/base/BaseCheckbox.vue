<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
interface Props {
  modelValue: any
  inputValue: any
  id: string
  label?: string
  containerClasses?: string
}

const { modelValue, inputValue, id, label, containerClasses } = defineProps<Props>()

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
</script>

<template>
  <div class="flex items-center" :class="containerClasses">
    <input
      :id="id"
      v-model="value"
      v-bind="$attrs"
      :value="inputValue"
      type="checkbox"
      :name="id"
      class="outline-none focus:ring-4 transition"
    />

    <label v-if="label" :for="id" class="ml-2 py-2 text-gray-600 text-tiny flex-grow break-all">
      {{ label }}
    </label>
  </div>
</template>
