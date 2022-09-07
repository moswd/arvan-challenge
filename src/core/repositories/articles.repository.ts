import { createAxiosInstance } from '@clients/httpClient'
import { ApiResponse } from '@models/api.model'
import { PaginatedArticles } from '@models/articles.model'
import {
  ArticlesParams,
  PaginatedArticlesDTO,
  toDomainPaginatedArticles
} from '@repositories/articles.dto'

// TODO: repositories should be plural

const BASE_PATH = '/api/articles'

const httpClient = createAxiosInstance(true)

export class ArticlesRepository {
  async getArticles(
    // TODO: naming convension
    { offset = 0, limit = 10 }: ArticlesParams,
    abortSignal?: AbortSignal
  ): Promise<ApiResponse<PaginatedArticles>> {
    const result = (await httpClient.get(BASE_PATH, {
      params: {
        offset,
        limit
      },
      signal: abortSignal
    })) as ApiResponse<PaginatedArticlesDTO>

    return {
      ...result,
      data: toDomainPaginatedArticles(result.data as PaginatedArticlesDTO)
    }
  }
}
