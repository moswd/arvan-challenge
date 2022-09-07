<script setup lang="ts">
import BaseSpinner from '@components/BaseSpinner.vue'
import BaseTable from '@components/BaseTable.vue'

import { useGetArticles } from '@composables/articles.composable'

const {
  attempt: getArticles,
  loading: articlesLoading,
  data
} = $(useGetArticles())

// data: [{ [key: string]: string | number | boolean }] // TODO: change type
// headers: string[]
// columns: string[]
// columnsKey: string
// loading?: boolean

const headers = ['Title', 'Slug', 'Author']
const columns = ['title', 'slug', 'author']

getArticles({ offset: 0, limit: 10 })

setInterval(() => {
  getArticles({ offset: 0, limit: 10 })
}, 3000)
</script>

<template>
  <div class="p-8">
    <!-- TODO: what about h1 -->
    <h2 class="text-4xl mb-4">All Articles</h2>

    <base-table
      :headers="headers"
      :columns="columns"
      :data="data?.articles"
      columns-key="slug"
      :loading="articlesLoading"
    ></base-table>

    <!-- <div class="relative">
      <table v-if="data?.articles" class="border w-full bg-green-200">
        <tr>
          <th>Title</th>
          <th>Slug</th>
          <th>Author</th>
        </tr>

        <tr v-for="article of data.articles" :key="article.slug">
          <td class="p-2 border border-gray-700">{{ article.title }}</td>
          <td class="p-2 border border-gray-700">{{ article.slug }}</td>
          <td class="p-2 border border-gray-700">{{ article.author }}</td>
        </tr>
      </table>

      <div class="absolute inset-0 flex items-center justify-center">
        <base-spinner class="border-red-500 w-12 h-12"></base-spinner>
      </div>
    </div> -->
  </div>
</template>
