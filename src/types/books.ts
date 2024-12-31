export interface BookSearchResult {
  id: string
  volumeInfo: {
    title: string
    authors?: string[]
    imageLinks?: {
      thumbnail: string
    }
    publishedDate?: string
    description?: string
  }
}

export interface BookSearchResponse {
  items: BookSearchResult[]
  totalItems: number
}

export interface BookDetails {
  id: string
  title: string
  authors: string[]
  description: string
  publishedDate: string
  pageCount: number
  categories: string[]
  imageLinks: {
    thumbnail?: string
    small?: string
    medium?: string
    large?: string
  }
  language: string
  averageRating: number
  ratingsCount: number
}

