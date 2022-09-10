<script setup lang="ts">
import { watch } from 'vue'
import { useRouter } from 'vue-router'
import { useGetArticles, useDeleteArticle } from '@composables/articles.composable'
import BaseTable, { TableColumns } from '@components/base/BaseTable.vue'
import BaseMenu from '@components/base/BaseMenu.vue'
import BaseButton from '@components/base/BaseButton.vue'

const router = useRouter()

const excerptLengthLimit = 40
const titleLengthLimit = 40
const tagsCountLimit = 5

const columns: TableColumns = {
  title: { header: 'Title' },
  author: { header: 'Author', visibility: 'sm' },
  tagList: { header: 'Tags', visibility: 'lg' },
  excerpt: { header: 'Excerpt', visibility: 'xl' },
  createdAt: { header: 'Created', visibility: 'sm' },
  actions: { header: '' }
}

const { attempt: getArticles, loading: articlesLoading, data } = $(useGetArticles())
const { attempt: deleteArticle, loading: deleteArticleLoading } = $(useDeleteArticle())

let limit = $ref(6)
let page = $computed(() => Number(router.currentRoute.value.query?.page) || 1)

let offset = $computed(() => (page - 1) * limit)
let totalCount = $computed(() => data?.articlesCount ?? 0)
let hasNext = $computed(() => totalCount >= limit)

async function fetchData() {
  try {
    await getArticles({ offset, limit })

    if (!data?.articlesCount) {
      router.push({ name: 'Articles', query: { page: 1 } })
    }
  } catch (err) {
    console.error(err)
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
    await deleteArticle(articleToDeleteSlug as string)

    closeDeleteModal()
    fetchData()
  } catch (err) {
    console.error(err)
  }
}

fetchData()
watch([$$(limit), $$(offset)], fetchData)
</script>

<template>
  <div class="p-4 lg:p-8">
    <h1 class="text-3xl text-center sm:text-left sm:text-4xl font-light mt-4 lg:mt-0 mb-8 text-gray-500">
      All Articles
    </h1>

    <base-table
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

      <template #tagList-col="{ column }">
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
        <base-menu>
          <template #menuContent>
            <ul>
              <li>
                <router-link
                  class="pl-4 pr-20 h-10 flex items-center text-gray-700 hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-100 transition-colors"
                  :to="{ name: 'UpdateArticle', params: { slug: row.slug } }"
                >
                  Update
                </router-link>
              </li>

              <li>
                <base-button type="clear" class="w-full !justify-start" @click="initDelete(row.slug)">
                  Delete
                </base-button>
              </li>
            </ul>
          </template>
        </base-menu>
      </template>
    </base-table>

    <Modal v-model="deleteModalVisible" :options="{ transition: 150 }" :close="closeDeleteModal" class="z-40">
      <div class="bg-white rounded-md">
        <h6 class="p-5 text-lg border-b">Delete article</h6>

        <p class="p-5 text-sm">Once deleted, an article can't be brought back! Continue?</p>

        <div class="flex justify-end gap-1 p-5">
          <base-button type="clear" :disabled="deleteArticleLoading" @click="closeDeleteModal"> Cancel </base-button>

          <base-button
            type="failure"
            :loading="deleteArticleLoading"
            :disabled="deleteArticleLoading"
            @click="handleDeleteConfirm"
          >
            Delete
          </base-button>
        </div>
      </div>
    </Modal>
  </div>
</template>
