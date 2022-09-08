import { useApi } from '@composables/api.composable'
import { Article, PaginatedArticles } from '@models/articles.model'
import {
  ArticlesParams,
  CreateArticleDTO,
  UpdateArticleParams
} from '@repositories/articles.dto'
import { ArticlesRepository } from '@repositories/articles.repository'
import { useToast } from 'vue-toastification'

const articlesRepository = new ArticlesRepository()

export function useGetArticles() {
  return useApi<ArticlesParams, PaginatedArticles>(articlesRepository.get)
}

export function useGetArticleBySlug() {
  return useApi<string, Article>(articlesRepository.getBySlug)
}

export function useCreateArticle() {
  return useApi<CreateArticleDTO, Article>(articlesRepository.create, () => {
    const toast = useToast() // TODO: should we provide this in app?

    toast.success('Article successfully created', { timeout: 2000 }) // TODO: keep all messages in the same place
  })
}

export function useUpdateArticle() {
  return useApi<UpdateArticleParams, Article>(articlesRepository.update, () => {
    const toast = useToast() // TODO: should we provide this in app?

    toast.success('Article successfully updated', { timeout: 2000 }) // TODO: keep all messages in the same place
  })
}

export function useDeleteArticle() {
  return useApi<string, undefined>(articlesRepository.delete, () => {
    const toast = useToast() // TODO: should we provide this in app?

    // TODO: check grammer for all messages
    toast.success('Article successfully deleted', { timeout: 2000 }) // TODO: keep all messages in the same place
  })
}
