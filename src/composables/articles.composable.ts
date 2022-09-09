import { useToast } from 'vue-toastification'
import { useApi } from '@composables/api.composable'
import { Article, PaginatedArticles } from '@models/articles.model'
import { GetArticlesParams, CreateArticleDTO, UpdateArticleParams } from '@repositories/articles.dto'
import { ArticlesRepository } from '@repositories/articles.repository'

const articlesRepository = new ArticlesRepository()

export function useGetArticles() {
  return useApi<GetArticlesParams, PaginatedArticles>(articlesRepository.get)
}

export function useGetArticleBySlug() {
  return useApi<string, Article>(articlesRepository.getBySlug)
}

export function useCreateArticle() {
  return useApi<CreateArticleDTO, Article>(articlesRepository.create, () => {
    useToast().success('Article successfully created', { timeout: 2000 })
  })
}

export function useUpdateArticle() {
  return useApi<UpdateArticleParams, Article>(articlesRepository.update, () => {
    useToast().success('Article successfully updated', { timeout: 2000 })
  })
}

export function useDeleteArticle() {
  return useApi<string, undefined>(articlesRepository.delete, () => {
    useToast().success('Article successfully deleted', { timeout: 2000 })
  })
}
