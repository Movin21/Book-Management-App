import { SearchBar } from "@/components/search-bar";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Discover Your Next Great Read
        </h1>
        <p className="text-2xl text-gray-600">
          Search millions of books to find your next favorite.
        </p>
      </div>
      <div className="max-w-12xl mx-auto">
        <SearchBar />
      </div>
    </div>
  );
}
