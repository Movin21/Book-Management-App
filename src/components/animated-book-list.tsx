"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BookDetails } from "@/types/books";
import { DeleteBookButton } from "@/components/delete-book-button";

function getSecureImageUrl(imageUrl: string | undefined): string {
  if (!imageUrl) return "/placeholder.svg?height=300&width=200";
  const secureUrl = imageUrl.replace("http://", "https://");
  return `/api/proxy-image?url=${encodeURIComponent(secureUrl)}`;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

export function AnimatedBookList({ books }: { books: BookDetails[] }) {
  return (
    <motion.ul
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {books.map((book) => (
        <motion.li
          key={book.id}
          className="flex items-start space-x-4 p-4 bg-white shadow rounded-lg hover:shadow-md transition-shadow duration-200"
          variants={itemVariants}
        >
          <div className="flex-shrink-0 w-20">
            <Image
              src={getSecureImageUrl(book.imageLinks.thumbnail)}
              alt={book.title}
              width={80}
              height={120}
              className="object-cover rounded"
            />
          </div>
          <div className="flex-grow">
            <h2 className="text-xl font-semibold mb-1">
              <Link href={`/book/${book.id}`} className="hover:underline">
                {book.title}
              </Link>
            </h2>
            <p className="text-sm text-gray-600 mb-2">
              by {book.authors.join(", ")}
            </p>
            <p className="text-sm text-gray-500">
              Published: {new Date(book.publishedDate).getFullYear()}
            </p>
          </div>
          <div className="flex-shrink-0">
            <DeleteBookButton bookId={book.id} />
          </div>
        </motion.li>
      ))}
    </motion.ul>
  );
}
