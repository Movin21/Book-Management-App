"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { kv } from "@vercel/kv";

async function getUserId(): Promise<string | null> {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return user?.id || null;
}

export async function toggleBookInLibrary(bookId: string) {
  const userId = await getUserId();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const userBooksKey = `user:${userId}:books`;

  try {
    const exists = await kv.sismember(userBooksKey, bookId);

    if (exists === 1) {
      await kv.srem(userBooksKey, bookId);
    } else {
      await kv.sadd(userBooksKey, bookId);
    }

    revalidatePath("/my-books");
    revalidatePath(`/book/${bookId}`);
    return { success: true, added: !exists };
  } catch (error) {
    console.error("Error toggling book:", error);
    throw new Error("Failed to update library");
  }
}

export async function getUserBookIds(): Promise<string[]> {
  const userId = await getUserId();

  if (!userId) {
    console.log("No user ID found");
    return [];
  }

  try {
    const userBooksKey = `user:${userId}:books`;
    const bookIds = await kv.smembers(userBooksKey);

    console.log(`Found ${bookIds.length} book IDs for user`);
    return bookIds;
  } catch (error) {
    console.error("Error fetching user book IDs:", error);
    return [];
  }
}

export async function isBookInLibrary(bookId: string): Promise<boolean> {
  const userId = await getUserId();

  if (!userId) {
    return false;
  }

  try {
    const userBooksKey = `user:${userId}:books`;
    return await kv.sismember(userBooksKey, bookId);
  } catch (error) {
    console.error("Error checking book status:", error);
    return false;
  }
}

export async function deleteBookFromLibrary(bookId: string): Promise<boolean> {
  const userId = await getUserId();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const userBooksKey = `user:${userId}:books`;

  try {
    const removed = await kv.srem(userBooksKey, bookId);

    if (removed) {
      revalidatePath("/my-books");
      revalidatePath(`/book/${bookId}`);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error deleting book from library:", error);
    throw new Error("Failed to delete book from library");
  }
}
