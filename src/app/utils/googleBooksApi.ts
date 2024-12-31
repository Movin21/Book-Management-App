import { BookDetails } from "@/types/books";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;

export async function getBookDetails(
  bookId: string
): Promise<BookDetails | null> {
  if (!API_KEY) {
    console.error("Google Books API key is not configured");
    return null;
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    const data = await response.json();

    return {
      id: data.id,
      title: data.volumeInfo.title || "Unknown Title",
      authors: data.volumeInfo.authors || ["Unknown Author"],
      description: data.volumeInfo.description || "",
      publishedDate: data.volumeInfo.publishedDate || "",
      pageCount: data.volumeInfo.pageCount || 0,
      categories: data.volumeInfo.categories || [],
      imageLinks: data.volumeInfo.imageLinks || {},
      language: data.volumeInfo.language || "",
      averageRating: data.volumeInfo.averageRating || 0,
      ratingsCount: data.volumeInfo.ratingsCount || 0,
    };
  } catch (error) {
    console.error("Error fetching book details:", error);
    return null;
  }
}
