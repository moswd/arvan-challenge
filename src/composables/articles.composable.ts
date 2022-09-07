import { useApi } from '@composables/api.composable'
import { PaginatedArticles } from '@models/articles.model'
import { ArticlesParams } from '@repositories/articles.dto'
import { ArticlesRepository } from '@repositories/articles.repository'

const articlesRepository = new ArticlesRepository()

export function useGetArticles() {
  return useApi<ArticlesParams, PaginatedArticles>(
    articlesRepository.getArticles,
    (data: PaginatedArticles) => {
      console.log('paginated data --------- from composable')
      console.log(data)
    }
  )
}
