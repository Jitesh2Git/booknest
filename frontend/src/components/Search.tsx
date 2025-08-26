import { Input } from "@/components/ui/input";
import type { SearchProps } from "@/lib/types";
import { SearchIcon, X } from "lucide-react";
import { useState, useEffect } from "react";

const Search = ({ onSearch }: SearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      onSearch(searchTerm);
    }, 500);

    return () => clearTimeout(delayedSearch);
  }, [searchTerm, onSearch]);

  const handleClear = () => {
    setSearchTerm("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="flex flex-col items-center text-center mt-10 max-w-xl mx-auto">
      <p className="text-sm text-custom-light-100 uppercase">
        Discover your next great read:
      </p>

      <h1 className="text-4xl sm:text-5xl font-semibold text-white mt-4 mb-6">
        Explore And Search for{" "}
        <span className="text-custom-primary">Any Book</span> In Our Library
      </h1>

      <form onSubmit={handleSubmit} className="search">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <SearchIcon className="w-5 h-5 text-custom-light-100" />
        </div>

        <Input
          type="text"
          placeholder="Search by title or author"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-custom-light-100 
            hover:text-custom-primary cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </form>
    </div>
  );
};

export default Search;
