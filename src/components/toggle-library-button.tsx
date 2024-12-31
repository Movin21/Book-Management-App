"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { toggleBookInLibrary } from "@/app/actions/books";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface ToggleLibraryButtonProps {
  bookId: string;
  initialInLibrary: boolean;
}

export function ToggleLibraryButton({
  bookId,
  initialInLibrary,
}: ToggleLibraryButtonProps) {
  const [inLibrary, setInLibrary] = useState(initialInLibrary);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleToggle = () => {
    startTransition(async () => {
      try {
        const result = await toggleBookInLibrary(bookId);
        if (typeof result === "object" && "added" in result) {
          setInLibrary(result.added);
          router.refresh();
        } else {
          throw new Error("Invalid response from toggleBookInLibrary");
        }
      } catch (error) {
        console.error("Error toggling book:", error);
        // Reset to previous state if there's an error
        setInLibrary(initialInLibrary);
      }
    });
  };

  return (
    <Button
      onClick={handleToggle}
      variant={inLibrary ? "outline" : "default"}
      disabled={isPending}
    >
      {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {inLibrary ? "Remove from My Books" : "Add to My Books"}
    </Button>
  );
}
