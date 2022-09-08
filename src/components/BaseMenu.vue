<script setup lang="ts">
import { useEventListener } from '@composables/eventListener.composable'
import BaseButton from '@components/BaseButton.vue'

interface Props {
  buttonClasses?: string
  autoClose?: boolean
}

const { buttonClasses, autoClose = true } = defineProps<Props>()

let wrapper = $ref()
let menuVisible = $ref(false)

function toggleMenu() {
  menuVisible = !menuVisible
}

// TODO: extract to its own directive
useEventListener(window, 'click', (e: PointerEvent) => {
  // TODO: fix types
  if (
    !(
      wrapper == e.target ||
      (wrapper as HTMLElement).contains(e.target as HTMLElement)
    )
  ) {
    menuVisible = false
  }
})
</script>

<template>
  <div ref="wrapper" class="relative inline-block">
    <base-button
      type="clear"
      class="px-4"
      :class="buttonClasses"
      @click="toggleMenu"
    >
      <slot name="buttonContent">...</slot>
    </base-button>

    <!-- TODO: find a better way for top -->
    <!-- TODO: add animation to menu -->
    <div
      v-if="menuVisible && $slots['menuContent']"
      class="z-50 absolute right-0 bg-white rounded-md border border-gray-200 shadow"
      style="top: calc(100% + 0.5rem)"
      @click="autoClose ? (menuVisible = false) : undefined"
    >
      <slot name="menuContent"></slot>
    </div>
  </div>
</template>
