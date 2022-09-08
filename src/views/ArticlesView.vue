<script setup lang="ts">
import { watch } from 'vue'
import { useRouter } from 'vue-router'
import BaseTable from '@components/BaseTable.vue'
import BaseMenu from '@components/BaseMenu.vue'
import BaseButton from '@components/BaseButton.vue'
import {
  useGetArticles,
  useDeleteArticle
} from '@composables/articles.composable'

const router = useRouter()

const excerptLengthLimit = 40
const titleLengthLimit = 40
const tagsCountLimit = 5
const headers = ['Title', 'Author', 'Tags', 'Excerpt', 'Created', '']
const columns = [
  'title',
  'author',
  'tagList',
  'excerpt',
  'createdAt',
  'actions'
]

const {
  attempt: getArticles,
  loading: articlesLoading,
  data,
  abortController: getArticlesAbortController
} = $(useGetArticles())

const {
  attempt: deleteArticle,
  loading: deleteArticleLoading,
  abortController: deleteArticleAbortController
} = $(useDeleteArticle())

let limit = $ref(8)
let page = $computed(() => Number(router.currentRoute.value.query?.page) || 1)

let offset = $computed(() => (page - 1) * limit)
let totalCount = $computed(() => data?.articlesCount ?? 0)
let hasNext = $computed(() => totalCount >= limit)

async function fetchData() {
  getArticlesAbortController?.abort()
  await getArticles({ offset, limit })

  if (!data?.articlesCount) {
    router.push({ name: 'Articles', query: { page: 1 } })
  }
}

function changePage(newPage: number) {
  const newPageInRange = newPage > page ? hasNext : newPage

  if (newPageInRange) {
    router.push({ name: 'Articles', query: { page: newPage } })
  }
}

let articleToDeleteSlug = $ref('')
let deleteModalVisible = $ref(false)

function closeDeleteModal() {
  if (deleteArticleLoading) return

  articleToDeleteSlug = ''
  deleteModalVisible = false
}

function initDelete(slug: string) {
  if (!slug) return

  articleToDeleteSlug = slug
  deleteModalVisible = true
}

async function handleDeleteConfirm() {
  if (!articleToDeleteSlug) return

  try {
    deleteArticleAbortController?.abort()
    await deleteArticle(articleToDeleteSlug as string)

    closeDeleteModal()
    fetchData()
  } catch (err) {
    console.log(err)
  }
}

fetchData()
watch([$$(limit), $$(offset)], fetchData)
</script>

<template>
  <div class="p-8">
    <!-- TODO: what about h1 -->
    <h2 class="text-4xl mb-4">All Articles</h2>

    <!-- TODO: extract to it's own component -->
    <Modal
      v-model="deleteModalVisible"
      :options="{ transition: 150 }"
      :close="closeDeleteModal"
      class="z-40"
    >
      <div class="bg-white rounded-md">
        <h6 class="p-5 text-lg border-b">Delete article</h6>

        <p class="p-5">
          Once deleted, an article can't be brought back! Continue?
        </p>

        <div class="flex justify-end gap-1 p-5">
          <base-button
            type="clear"
            class="rounded-md hover:bg-gray-200 active:bg-gray-200 focus:bg-gray-200"
            :disabled="deleteArticleLoading"
            @click="closeDeleteModal"
            >Cancel</base-button
          >
          <base-button
            type="failure"
            :loading="deleteArticleLoading"
            :disabled="deleteArticleLoading"
            @click="handleDeleteConfirm"
            >Delete</base-button
          >
        </div>
      </div>
    </Modal>

    <base-table
      :headers="headers"
      :columns="columns"
      :data="data?.articles"
      columns-key="slug"
      :page="page"
      :has-next="hasNext"
      :loading="articlesLoading"
      @page-changed="changePage"
    >
      <template #title-col="{ row }">
        <span :title="row.title">
          {{ row.title.slice(0, titleLengthLimit) }}
          {{ row.title.length > titleLengthLimit ? '...' : '' }}
        </span>
      </template>

      <template #author-col="{ column }">
        {{ column.username }}
      </template>

      <!-- TODO: how to use dash? -->
      <template #tagList-col="{ column }">
        <!-- TODO: limit the number -->
        {{ column.slice(0, tagsCountLimit).join(', ') }}
        {{ column.length > tagsCountLimit ? '...' : '' }}
      </template>

      <template #excerpt-col="{ row }">
        {{ row.body.slice(0, excerptLengthLimit) }}
        {{ row.body.length > excerptLengthLimit ? '...' : '' }}
      </template>

      <template #createdAt-col="{ column }">
        {{
          column.toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
          })
        }}
      </template>

      <template #actions-col="{ row }">
        <!-- TODO: too many styles for clear -->
        <base-menu
          button-classes="rounded-md hover:bg-gray-200 focus:bg-gray-200 active:bg-gray-200 transition-colors"
        >
          <template #menuContent>
            <ul>
              <!-- TODO: change all router-links to this format -->
              <li>
                <router-link
                  class="pl-4 pr-20 h-10 flex items-center text-gray-700 hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-100 transition-colors"
                  :to="{ name: 'UpdateArticle', params: { slug: row.slug } }"
                  >Update</router-link
                >
              </li>

              <li>
                <base-button
                  type="clear"
                  class="pl-4 w-full !justify-start hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-100 transition-colors"
                  @click="initDelete(row.slug)"
                  >Delete</base-button
                >
              </li>
            </ul>
          </template>
        </base-menu>
      </template>
    </base-table>
  </div>
</template>
