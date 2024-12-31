import { notFound } from "next/navigation";
import Image from "next/image";
import { BookOpen, Calendar, Globe, Star, Users } from "lucide-react";
import { BookDetails } from "@/types/books";
import { ToggleLibraryButton } from "@/components/toggle-library-button";
import { isBookInLibrary } from "@/app/actions/books";

// Helper function to get a secure image URL
function getSecureImageUrl(imageUrl: string | undefined): string {
  if (!imageUrl) return "/placeholder.svg?height=300&width=200";
  // Replace http with https
  const secureUrl = imageUrl.replace("http://", "https://");
  // Create a data URL for the image
  return `/api/proxy-image?url=${encodeURIComponent(secureUrl)}`;
}

async function getBookDetails(id: string): Promise<BookDetails | null> {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;
  if (!API_KEY) {
    console.error("API key is not configured");
    return null;
  }

  try {
    const url = new URL(
      `https://www.googleapis.com/books/v1/volumes/${encodeURIComponent(id)}`
    );
    url.searchParams.append("key", API_KEY);

    const response = await fetch(url.toString(), {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`API responded with status ${response.status}`);
    }

    const data = await response.json();

    return {
      id: data.id,
      title: data.volumeInfo.title,
      authors: data.volumeInfo.authors || [],
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

export default async function BookPage({ params }: { params: { id: string } }) {
  const [book, inLibrary] = await Promise.all([
    getBookDetails(params.id),
    isBookInLibrary(params.id),
  ]);

  if (!book) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-shrink-0">
          <div className="relative w-[200px] h-[300px]">
            <Image
              src={getSecureImageUrl(book.imageLinks.thumbnail)}
              alt={book.title}
              fill
              className="rounded-lg shadow-lg object-cover"
              sizes="200px"
            />
          </div>
        </div>
        <div className="flex-grow">
          <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
          <p className="text-xl text-gray-600 mb-4">
            by {book.authors.join(", ")}
          </p>
          <div className="flex items-center mb-4">
            <Star className="text-yellow-400 mr-1" />
            <span className="font-bold mr-2">
              {book.averageRating.toFixed(1)}
            </span>
            <span className="text-gray-600">({book.ratingsCount} ratings)</span>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center">
              <Calendar className="mr-2 text-gray-400" />
              <span>{new Date(book.publishedDate).getFullYear()}</span>
            </div>
            <div className="flex items-center">
              <BookOpen className="mr-2 text-gray-400" />
              <span>{book.pageCount} pages</span>
            </div>
            <div className="flex items-center">
              <Globe className="mr-2 text-gray-400" />
              <span>{book.language.toUpperCase()}</span>
            </div>
            <div className="flex items-center">
              <Users className="mr-2 text-gray-400" />
              <span>{book.categories.join(", ")}</span>
            </div>
          </div>
          <div className="flex space-x-4 mb-6">
            <ToggleLibraryButton
              bookId={book.id}
              title={book.title}
              authors={book.authors}
              thumbnail={book.imageLinks.thumbnail}
              initialInLibrary={inLibrary}
            />
          </div>
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-gray-700">{book.description}</p>
        </div>
      </div>
    </div>
  );
}
