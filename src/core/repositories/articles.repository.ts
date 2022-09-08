import { createAxiosInstance } from '@clients/httpClient'
import { ApiResponse } from '@models/api.model'
import { Article, PaginatedArticles } from '@models/articles.model'
import {
  ArticleDTO,
  ArticlesParams,
  CreateArticleDTO,
  SingleArticleResponse,
  PaginatedArticlesDTO,
  toDomainArticle,
  toDomainPaginatedArticles,
  UpdateArticleDTO,
  UpdateArticleParams
} from '@repositories/articles.dto'

// TODO: repositories should be plural

const BASE_PATH = '/api/articles'

const httpClient = createAxiosInstance(true)

export class ArticlesRepository {
  async get(
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

  async getBySlug(
    slug: string,
    abortSignal?: AbortSignal
  ): Promise<ApiResponse<Article>> {
    const result = (await httpClient.get(`${BASE_PATH}/${slug}`, {
      signal: abortSignal
    })) as ApiResponse<SingleArticleResponse>

    return {
      ...result,
      data: toDomainArticle(result.data!.article as ArticleDTO) // TODO: remove ! and .article
    }
  }

  async create(
    article: CreateArticleDTO,
    abortSignal?: AbortSignal
  ): Promise<ApiResponse<Article>> {
    const result = (await httpClient.post(
      BASE_PATH,
      { article },
      { signal: abortSignal }
    )) as ApiResponse<SingleArticleResponse>

    return {
      ...result,
      data: toDomainArticle(result.data!.article as ArticleDTO) // TODO: remove ! and .article
    }
  }

  async update(
    { slug, article }: UpdateArticleParams,
    abortSignal?: AbortSignal
  ): Promise<ApiResponse<Article>> {
    const result = (await httpClient.put(
      `${BASE_PATH}/${slug}`,
      { article },
      { signal: abortSignal }
    )) as ApiResponse<SingleArticleResponse>

    return {
      ...result,
      data: toDomainArticle(result.data!.article as ArticleDTO) // TODO: remove ! and .article
    }
  }

  async delete(
    slug: string,
    abortSignal?: AbortSignal
  ): Promise<ApiResponse<undefined>> {
    return (await httpClient.delete(`${BASE_PATH}/${slug}`, {
      signal: abortSignal
    })) as ApiResponse<undefined>
  }
}
