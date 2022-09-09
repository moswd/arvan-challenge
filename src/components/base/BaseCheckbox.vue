<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
interface Props {
  modelValue: any // TODO: change type?
  inputValue: any // TODO: change type? what's the deal with these?
  id: string
  label?: string
  containerClasses?: string
}

const { modelValue, inputValue, id, label, containerClasses } =
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

    <label v-if="label" :for="id" class="ml-2 py-2 text-gray-600 text-sm">
      {{ label }}
    </label>
  </div>
</template>

<!-- TODO: check sizes and colors consistency -->
