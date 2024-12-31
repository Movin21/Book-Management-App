export interface BookSearchResult {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    imageLinks?: {
      thumbnail: string;
    };
    publishedDate?: string;
    description?: string;
  };
}

export interface BookSearchResponse {
  items: BookSearchResult[];
  totalItems: number;
}
