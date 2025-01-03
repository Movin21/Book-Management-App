import Link from "next/link";
import { Facebook, Twitter, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Book Manager App. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
