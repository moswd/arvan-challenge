<script setup lang="ts">
import { useUserStore } from '@store/user'
import BaseButton from './base/BaseButton.vue'

const emit = defineEmits<{
  (e: 'sidebarToggle'): void
}>()

const { username } = useUserStore()
</script>

<template>
  <header class="fixed z-30 w-full h-16 bg-zinc-800 px-4 flex items-center">
    <base-button
      id="sidebar-toggle-btn"
      type="clear"
      class="lg:hidden mr-4 !text-white text-lg !bg-zinc-700 shadow-lg"
      @click="emit('sidebarToggle')"
    >
      &#9776;
    </base-button>
    <span class="text-white text-lg sm:text-2xl font-light">Arvan Challenge</span>
    <span class="hidden sm:inline text-tiny text-gray-200 mr-4 ml-auto">{{ username }}</span>
    <router-link
      class="!h-8 border border-red-500 text-tiny px-4 flex items-center text-red-500 rounded ml-auto sm:ml-0"
      :to="{ name: 'Logout' }"
    >
      Logout
    </router-link>
  </header>
</template>
