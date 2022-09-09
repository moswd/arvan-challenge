<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import { faker } from '@faker-js/faker'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import {
  useGetArticleBySlug,
  useCreateArticle,
  useUpdateArticle
} from '@composables/articles.composable'
import BaseInput from '@components/base/BaseInput.vue'
import BaseButton from '@components/base/BaseButton.vue'
import BaseCheckbox from '@components/base/BaseCheckbox.vue'
import BaseSpinner from '@components/base/BaseSpinner.vue'

const router = useRouter()

const {
  attempt: getArticleBySlug,
  loading: getArticleBySlugLoading,
  data: articleToUpdate
} = $(useGetArticleBySlug())

const {
  attempt: createArticle,
  loading: createArticleLoading,
  abortController: createArticleAbortController
} = $(useCreateArticle())

const {
  attempt: updateArticle,
  loading: updateArticleLoading,
  abortController: updateArticleAbortController
} = $(useUpdateArticle())

// TODO: order of code script
let updateSlug = $computed(() => router.currentRoute.value.params?.slug) // TODO: check type

let newTag = $ref('')

const article = reactive({
  title: '',
  desc: '',
  body: '',
  tags: [] as string[], // TODO: maybe an interface for object?
  selectedTags: [] as string[] // TODO: maybe an interface for object?
})

const articleRules = {
  title: { required },
  desc: { required },
  body: { required },
  tags: {},
  selectedTags: {}
}

const validator = useVuelidate(articleRules, article)

const titleErrors = $computed(() =>
  validator.value.title.$error
    ? validator.value.title.$errors.map((err) => err.$message)
    : []
)

const descErrors = $computed(() =>
  validator.value.desc.$error
    ? validator.value.desc.$errors.map((err) => err.$message)
    : []
)

const bodyErrors = $computed(() =>
  validator.value.body.$error
    ? validator.value.body.$errors.map((err) => err.$message)
    : []
)

function addTag() {
  if (!newTag || article.tags.includes(newTag)) return

  article.tags.push(newTag)
  article.selectedTags.push(newTag)

  newTag = ''
}

async function submit() {
  const credsValid = await validator.value.$validate()
  if (!credsValid) return

  createArticleAbortController?.abort()
  updateArticleAbortController?.abort()

  try {
    if (updateSlug) {
      await updateArticle({
        slug: updateSlug as string, // TODO: remove as
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
    // TODO: log somewhere -- sentry?
    console.log(err)
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
      await getArticleBySlug(updateSlug as string) // TODO: why string[]

      article.title = articleToUpdate?.title ?? '' // TODO: remove checks
      article.desc = articleToUpdate?.description ?? ''
      article.body = articleToUpdate?.body ?? ''
      article.tags = articleToUpdate?.tagList.slice() ?? []
      article.selectedTags = articleToUpdate?.tagList.slice() ?? []
    } catch (err) {
      router.push({ name: 'Articles' })
    }
  }
}

onMounted(fetchArticleToUpdate)
watch($$(updateSlug), fetchArticleToUpdate)
</script>

<template>
  <div class="p-8">
    <div class="mb-4 flex items-center">
      <!-- TODO: what about h1 -->
      <h2 class="text-4xl">{{ updateSlug ? 'Edit' : 'New' }} Article</h2>

      <base-spinner
        v-if="updateSlug && getArticleBySlugLoading"
        class="h-6 w-6 ml-2"
      ></base-spinner>

      <base-button
        v-if="!updateSlug && !createArticleLoading"
        type="clear"
        class="text-sm px-2 h-8 rounded-md bg-gray-100 ml-2"
        @click="randomize"
        >Randomize!</base-button
      >
    </div>

    <div class="flex gap-4">
      <div class="w-2/3">
        <base-input
          id="email"
          v-model="article.title"
          type="text"
          label="Title"
          placeholder="Title"
          :disabled="updateSlug && getArticleBySlugLoading"
          :errors="(titleErrors as string[])"
        ></base-input>
        <!-- TODO: extract updateSlug && getArticleBySlugLoading to a computed -->

        <base-input
          id="desc"
          v-model="article.desc"
          type="text"
          label="Description"
          placeholder="Description"
          container-classes="mt-4"
          :disabled="updateSlug && getArticleBySlugLoading"
          :errors="(descErrors as string[])"
        ></base-input>

        <base-input
          id="body"
          v-model="article.body"
          type="textarea"
          label="Body"
          placeholder="Body"
          class="h-80"
          container-classes="mt-4"
          :disabled="updateSlug && getArticleBySlugLoading"
          :errors="(bodyErrors as string[])"
        ></base-input>

        <!-- TODO: extract createArticleLoading || updateArticleLoading || getArticleBySlugLoading to computed -->
        <base-button
          :disabled="
            createArticleLoading ||
            updateArticleLoading ||
            getArticleBySlugLoading
          "
          :loading="createArticleLoading || updateArticleLoading"
          class="mt-4 px-4"
          @click="submit"
          >Submit</base-button
        >
      </div>

      <div class="w-1/3">
        <base-input
          id="body"
          v-model="newTag"
          type="text"
          label="Tags"
          placeholder="New Tag"
          :disabled="updateSlug"
          @keyup.enter="addTag"
        ></base-input>

        <!-- TODO: maybe add validation message for already existing tags -->
        <div
          v-if="article.tags.length"
          class="border mt-4 py-2 px-4 rounded-md"
        >
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
  </div>
</template>
