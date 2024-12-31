import { BookSearchResult } from "@/types/books";

export async function searchBooks(query: string): Promise<BookSearchResult[]> {
  if (!query.trim()) return [];

  const API_KEY = "AIzaSyAdVkCcTZ99Omam_iNU-4UG6ieytmVmnss";

  if (!API_KEY) {
    console.error("Google Books API key is not configured");
    return [];
  }

  try {
    const url = new URL("https://www.googleapis.com/books/v1/volumes");
    url.searchParams.append("q", query);
    url.searchParams.append("key", API_KEY);
    url.searchParams.append("maxResults", "5");

    const response = await fetch(url.toString());

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `API responded with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    console.log("API Response:", data);

    // Validate the response structure
    if (!data || typeof data !== "object") {
      throw new Error("Invalid API response format");
    }

    // Check if we have items in the response
    if (!Array.isArray(data.items)) {
      return [];
    }

    // Map and validate each item
    return data.items.map((item: any) => ({
      id: item.id || "",
      volumeInfo: {
        title: item.volumeInfo?.title || "Untitled",
        authors: item.volumeInfo?.authors || [],
        imageLinks: {
          thumbnail: item.volumeInfo?.imageLinks?.thumbnail || "",
        },
        publishedDate: item.volumeInfo?.publishedDate || "",
        description: item.volumeInfo?.description || "",
      },
    }));
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error searching books:", {
        message: error.message,
        stack: error.stack,
      });
    } else {
      console.error("Unknown error searching books:", error);
    }
    return [];
  }
}
