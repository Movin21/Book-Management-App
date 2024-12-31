"use client";

import { useState, useEffect, useRef } from "react";
import { Search, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { searchBooks } from "@/services/books";
import type { BookSearchResult } from "@/types/books";
import Image from "next/image";
import Link from "next/link";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<BookSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (query) {
        setIsLoading(true);
        setError(null);
        try {
          const searchResults = await searchBooks(query);
          setResults(searchResults);
          setShowResults(true);
        } catch (err) {
          setError("Failed to search books. Please try again.");
          setResults([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
        setShowResults(false);
        setError(null);
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [query]);

  return (
    <div ref={searchRef} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search books..."
          className="pl-10 pr-4 h-12 text-lg"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {showResults && (results.length > 0 || isLoading || error) && (
        <div className="absolute mt-2 w-full rounded-md border bg-background shadow-lg z-10">
          {isLoading ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              Loading...
            </div>
          ) : error ? (
            <div className="flex items-center gap-2 p-4 text-sm text-destructive">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          ) : (
            <div className="max-h-[400px] overflow-auto">
              {results.map((book) => (
                <Link
                  key={book.id}
                  href={`/book/${book.id}`}
                  className="flex items-start gap-4 p-4 hover:bg-muted"
                  onClick={() => setShowResults(false)}
                >
                  {book.volumeInfo.imageLinks?.thumbnail ? (
                    <Image
                      src={book.volumeInfo.imageLinks.thumbnail.replace(
                        "http:",
                        "https:"
                      )}
                      alt={book.volumeInfo.title}
                      width={40}
                      height={60}
                      className="h-[60px] w-[40px] object-cover"
                    />
                  ) : (
                    <div className="h-[60px] w-[40px] bg-muted" />
                  )}
                  <div className="flex-1 overflow-hidden">
                    <h3 className="truncate font-medium">
                      {book.volumeInfo.title}
                    </h3>
                    {book.volumeInfo.authors && (
                      <p className="text-sm text-muted-foreground">
                        {book.volumeInfo.authors.join(", ")}
                      </p>
                    )}
                    {book.volumeInfo.publishedDate && (
                      <p className="text-sm text-muted-foreground">
                        {new Date(book.volumeInfo.publishedDate).getFullYear()}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
