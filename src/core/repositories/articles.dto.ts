import { Paginated } from '@models/api.model'
import { Article, Author, PaginatedArticles } from '@models/articles.model'

export interface ArticlesParams {
  offset: number
  limit: number
}

export interface ArticleDTO {
  slug: string
  title: string
  description: string
  body: string
  tagList: string[]
  createdAt: string
  updatedAt: string
  favorited: boolean
  favoritesCount: number
  author: AuthorDTO
}

export function toDomainArticle(dto: ArticleDTO): Article {
  return {
    ...dto,
    createdAt: new Date(dto.createdAt),
    updatedAt: new Date(dto.updatedAt),
    author: toDomainAuthor(dto.author)
  }
}

export interface AuthorDTO {
  username: string
  bio: string | null
  image: string | null
  following: boolean
}

export function toDomainAuthor(dto: AuthorDTO): Author {
  return {
    ...dto,
    bio: dto.bio ? dto.bio : undefined,
    image: dto.image ? dto.image : undefined
  }
}

export type PaginatedArticlesDTO = Paginated<ArticleDTO[], 'articles'>

export function toDomainPaginatedArticles(
  dto: PaginatedArticlesDTO
): PaginatedArticles {
  return {
    articles: dto.articles.map((article) => toDomainArticle(article)),
    articlesCount: dto.articlesCount
  }
}
