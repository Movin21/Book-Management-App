import { getUserBookIds } from "@/app/actions/books";
import { getBookDetails } from "@/app/utils/googleBooksApi";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { BookDetails } from "@/types/books";
import { DeleteBookButton } from "@/components/delete-book-button";
import { AnimatedBookList } from "@/components/animated-book-list";

function getSecureImageUrl(imageUrl: string | undefined): string {
  if (!imageUrl) return "/placeholder.svg?height=300&width=200";
  const secureUrl = imageUrl.replace("http://", "https://");
  return `/api/proxy-image?url=${encodeURIComponent(secureUrl)}`;
}

export default async function MyBooksPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h1 className="text-2xl font-bold">Sign in to view your books</h1>
        <Button asChild>
          <LoginLink>Sign In</LoginLink>
        </Button>
      </div>
    );
  }

  let bookIds: string[] = [];
  let error: string | null = null;

  try {
    bookIds = await getUserBookIds();
    console.log("Fetched book IDs:", bookIds);
  } catch (e) {
    console.error("Error fetching book IDs:", e);
    error = "Failed to load your books. Please try again later.";
  }

  let books: (BookDetails | null)[] = [];
  if (bookIds.length > 0) {
    books = await Promise.all(bookIds.map((id) => getBookDetails(id)));
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-4xl w-full px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">My Books</h1>
        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : books.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 mb-4">
              You haven't added any books to your library yet.
            </p>
            <Button asChild>
              <Link href="/">Browse Books</Link>
            </Button>
          </div>
        ) : (
          <AnimatedBookList
            books={books.filter((book): book is BookDetails => book !== null)}
          />
        )}
      </div>
    </div>
  );
}
