<script setup lang="ts">
import { useEventListener } from '@composables/eventListener.composable'
import BaseButton from '@components/base/BaseButton.vue'

interface Props {
  buttonClasses?: string
  autoClose?: boolean
}

const { buttonClasses, autoClose = true } = defineProps<Props>()

let wrapper = $ref<HTMLDivElement>()
let menuVisible = $ref(false)

function toggleMenu() {
  menuVisible = !menuVisible
}

useEventListener(document.documentElement, 'click', (e: PointerEvent) => {
  const target = e.target as HTMLElement

  if (!(wrapper === target || wrapper.contains(target))) {
    menuVisible = false
  }
})
</script>

<template>
  <div ref="wrapper" class="relative inline-block">
    <base-button type="clear" class="px-4" :class="buttonClasses" @click="toggleMenu">
      <slot name="buttonContent">...</slot>
    </base-button>

    <Transition>
      <div
        v-if="menuVisible && $slots['menuContent']"
        class="z-50 absolute right-0 bg-white rounded border border-gray-200 shadow-sm"
        style="top: calc(100% + 0.5rem)"
        @click="autoClose ? (menuVisible = false) : undefined"
      >
        <slot name="menuContent"></slot>
      </div>
    </Transition>
  </div>
</template>
