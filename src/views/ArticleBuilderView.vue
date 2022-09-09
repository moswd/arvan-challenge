<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import { faker } from '@faker-js/faker'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { useGetArticleBySlug, useCreateArticle, useUpdateArticle } from '@composables/articles.composable'
import BaseInput from '@components/base/BaseInput.vue'
import BaseButton from '@components/base/BaseButton.vue'
import BaseCheckbox from '@components/base/BaseCheckbox.vue'
import BaseSpinner from '@components/base/BaseSpinner.vue'

const router = useRouter()

const { attempt: getArticleBySlug, loading: getArticleBySlugLoading, data: articleToUpdate } = $(useGetArticleBySlug())

const { attempt: createArticle, loading: createArticleLoading } = $(useCreateArticle())

const { attempt: updateArticle, loading: updateArticleLoading } = $(useUpdateArticle())

let updateSlug = $computed(() => router.currentRoute.value.params?.slug)

const article = reactive({
  title: '',
  desc: '',
  body: '',
  newTag: '',
  tags: [] as string[],
  selectedTags: [] as string[]
})

const articleRules = {
  title: { required },
  desc: { required },
  body: { required },
  newTag: {},
  tags: {},
  selectedTags: {}
}

const validator = $(useVuelidate(articleRules, article))

const titleErrors = $computed(() => validator.title.$errors.map((err) => err.$message))

const descErrors = $computed(() => validator.desc.$errors.map((err) => err.$message))

const bodyErrors = $computed(() => validator.body.$errors.map((err) => err.$message))

function addTag() {
  if (!article.newTag) return

  if (!article.selectedTags.includes(article.newTag)) {
    article.selectedTags.push(article.newTag)
  }

  if (!article.tags.includes(article.newTag)) {
    article.tags.push(article.newTag)
  }

  article.newTag = ''
}

async function submit() {
  const credsValid = await validator.$validate()
  if (!credsValid) return

  try {
    if (updateSlug) {
      await updateArticle({
        slug: updateSlug as string,
        article: {
          title: article.title,
          description: article.desc,
          body: article.body
        }
      })
    } else {
      await createArticle({
        title: article.title,
        description: article.desc,
        body: article.body,
        tagList: article.selectedTags
      })
    }

    router.push({ name: 'Articles' })
  } catch (err) {
    console.error(err)
  }
}

function randomize() {
  const tagsRandomNumber = Math.floor(Math.random() * 10)
  const tags = [...new Set(faker.lorem.words(tagsRandomNumber).split(' '))]

  article.title = faker.lorem.lines(1)
  article.desc = faker.lorem.lines(1)
  article.body = faker.lorem.paragraphs(Math.ceil(Math.random() * 10))
  article.tags = tagsRandomNumber ? tags.slice() : []
  article.selectedTags = tagsRandomNumber ? tags.slice() : []
}

function resetData() {
  article.title = ''
  article.desc = ''
  article.body = ''
  article.tags = []
  article.selectedTags = []
}

async function fetchArticleToUpdate() {
  resetData()

  if (updateSlug) {
    try {
      await getArticleBySlug(updateSlug as string)

      article.title = articleToUpdate?.title ?? ''
      article.desc = articleToUpdate?.description ?? ''
      article.body = articleToUpdate?.body ?? ''
      article.tags = articleToUpdate?.tagList.slice() ?? []
      article.selectedTags = articleToUpdate?.tagList.slice() ?? []
    } catch (err) {
      router.push({ name: 'Articles' })
    }
  }
}

let fetchingArticleToUpdate = $computed(() => updateSlug && getArticleBySlugLoading)

let actionInProcess = $computed(() => createArticleLoading || updateArticleLoading)

onMounted(fetchArticleToUpdate)
watch($$(updateSlug), fetchArticleToUpdate)
</script>

<template>
  <div class="p-4 lg:p-8">
    <div class="mt-4 lg:mt-0 mb-8 flex justify-center sm:justify-start items-center">
      <h1 class="text-3xl sm:text-4xl font-light text-gray-500">{{ updateSlug ? 'Edit' : 'New' }} Article</h1>
      <base-spinner v-if="fetchingArticleToUpdate" class="h-6 w-6 ml-2"></base-spinner>

      <base-button
        v-if="!updateSlug && !createArticleLoading"
        type="clear"
        class="px-2 bg-gray-100 ml-2"
        @click="randomize"
      >
        Randomize!
      </base-button>
    </div>

    <div class="flex flex-col order sm:flex-row gap-4">
      <div class="w-full sm:w-2/3">
        <base-input
          id="email"
          v-model="article.title"
          type="text"
          label="Title"
          placeholder="Title"
          :disabled="fetchingArticleToUpdate"
          :errors="(titleErrors as string[])"
        ></base-input>

        <base-input
          id="desc"
          v-model="article.desc"
          type="text"
          label="Description"
          placeholder="Description"
          container-classes="mt-4"
          :disabled="fetchingArticleToUpdate"
          :errors="(descErrors as string[])"
        ></base-input>

        <base-input
          id="body"
          v-model="article.body"
          type="textarea"
          label="Body"
          placeholder="Body"
          class="h-64"
          container-classes="mt-4"
          :disabled="fetchingArticleToUpdate"
          :errors="(bodyErrors as string[])"
        ></base-input>
      </div>

      <div class="w-full sm:w-1/3">
        <base-input
          id="body"
          v-model="article.newTag"
          type="text"
          label="Tags"
          placeholder="New Tag"
          :disabled="updateSlug"
          @keyup.enter="addTag"
        ></base-input>

        <div v-if="article.tags.length" class="border mt-4 py-2 px-4 rounded">
          <base-checkbox
            v-for="tag in article.tags"
            :id="`${tag}-tag-checkbox`"
            :key="tag"
            v-model="article.selectedTags"
            :input-value="tag"
            :label="tag"
            :disabled="updateSlug"
          ></base-checkbox>
        </div>
      </div>
    </div>

    <base-button
      :disabled="actionInProcess || getArticleBySlugLoading"
      :loading="actionInProcess"
      class="mt-4 px-4"
      @click="submit"
    >
      Submit
    </base-button>
  </div>
</template>
