<script setup lang="ts">
import TheHeader from '@components/TheHeader.vue'
import TheSidebar from '@components/TheSidebar.vue'

let sidebarRef = $ref<InstanceType<typeof TheSidebar>>()

function toggleSidebar() {
  if (sidebarRef) sidebarRef.toggleSidebar()
}
</script>

<template>
  <the-header @sidebar-toggle="toggleSidebar"></the-header>

  <div class="flex w-full flex-grow overflow-x-hidden">
    <the-sidebar ref="sidebarRef"></the-sidebar>

    <div class="flex-grow lg:ml-52 mt-16">
      <router-view></router-view>
    </div>
  </div>
</template>
