<script setup lang="ts"></script>

<!-- TODO: this should be layout -->
<template>
  <header class="fixed w-full h-16 bg-gray-700 px-4 flex items-center">
    <h1 class="text-white text-2xl text-bold">Arvan Challenge</h1>
    <span class="text-white ml-4">Welcome test</span>

    <router-link
      class="border border-blue-500 px-4 py-2 text-blue-400 rounded-md ml-auto"
      to="/logout"
      >Logout</router-link
    >
  </header>

  <div class="flex w-full flex-grow">
    <aside
      class="w-64 bg-gray-50 border-r border-r-gray-200 fixed top-16 h-full"
    >
      <nav class="mt-2">
        <ul>
          <li>
            <router-link to="/articles" class="block px-4 py-2"
              >All Articles</router-link
            >
          </li>

          <li>
            <router-link to="/articles/create" class="block px-4 py-2"
              >New Article</router-link
            >
          </li>
        </ul>
      </nav>
    </aside>

    <div class="flex-grow ml-64 mt-16">
      <router-view></router-view>
    </div>
  </div>
</template>
