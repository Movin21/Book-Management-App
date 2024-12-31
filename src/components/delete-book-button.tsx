"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { deleteBookFromLibrary } from "@/app/actions/books";
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface DeleteBookButtonProps {
  bookId: string;
}

export function DeleteBookButton({ bookId }: DeleteBookButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        const result = await deleteBookFromLibrary(bookId);
        if (result) {
          router.refresh();
        } else {
          throw new Error("Failed to delete book from library");
        }
      } catch (error) {
        console.error("Error deleting book:", error);
        // You might want to show an error message to the user here
      }
    });
  };

  return (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <Button
        onClick={handleDelete}
        variant="destructive"
        size="sm"
        disabled={isPending}
      >
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Trash2 className="h-4 w-4" />
        )}
        <span className="sr-only">Delete book</span>
      </Button>
    </motion.div>
  );
}
