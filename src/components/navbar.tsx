"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Book, BookOpen, Users, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

export function NavBar() {
  return (
    <nav className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Book className="h-8 w-8 text-primary" />
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  href="/my-books"
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <BookOpen className="inline-block mr-1 h-4 w-4" />
                  My Books
                </Link>
              </div>
            </div>
          </div>
          <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
            {/* This div is kept empty as per the provided code */}
          </div>
          <div className="flex items-center">
            <Button asChild>
              <LogoutLink>Log out</LogoutLink>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
