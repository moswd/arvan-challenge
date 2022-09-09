<script setup lang="ts">
import { useEventListener } from '@composables/eventListener.composable'

interface Props {
  autoClose?: boolean
}

const { autoClose = true } = defineEmits<Props>()

let sidebar = $ref<HTMLElement>()
let sidebarExpanded = $ref(false)

function toggleSidebar() {
  sidebarExpanded = !sidebarExpanded
}

useEventListener(document.documentElement, 'click', (e: PointerEvent) => {
  const target = e.target as HTMLElement
  const clickedOnSelf = sidebar === target || sidebar.contains(target)
  const clickedOnToggleBtn = target.id === 'sidebar-toggle-btn'

  if (!(clickedOnSelf || clickedOnToggleBtn)) {
    sidebarExpanded = false
  }
})

defineExpose({
  toggleSidebar
})
</script>

<template>
  <aside
    ref="sidebar"
    class="w-52 z-20 -left-52 lg:left-0 text-sm bg-gray-50 border-r shadow-md border-r-gray-200 fixed top-16 h-full transition-all"
    :class="{ 'left-0': sidebarExpanded }"
  >
    <nav class="mt-2 px-2">
      <ul @click="autoClose ? (sidebarExpanded = false) : undefined">
        <li>
          <router-link
            :to="{ name: 'Articles' }"
            active-class="bg-gray-100 !text-cyan-700"
            class="block text-gray-600 px-4 py-2 rounded hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-100 transition-colors"
          >
            All Articles
          </router-link>
        </li>

        <li>
          <router-link
            :to="{ name: 'CreateArticle' }"
            active-class="bg-gray-100 !text-cyan-700"
            class="mt-1 block text-gray-600 px-4 py-2 rounded hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-100 transition-colors"
          >
            New Article
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>
