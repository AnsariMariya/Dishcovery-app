import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchInputProps {
  onSearch: (ingredients: string) => void;
  isLoading?: boolean;
}

const SearchInput = ({ onSearch, isLoading = false }: SearchInputProps) => {
  const [ingredients, setIngredients] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ingredients.trim()) {
      onSearch(ingredients.trim());
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <Input
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="tomatoes, onion, garlic"
            className="text-lg py-4 px-6 pr-12 rounded-xl border-2 border-border focus:border-primary transition-colors"
          />
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
        </div>
        
        <div className="flex justify-center">
          <Button
            type="submit"
            disabled={!ingredients.trim() || isLoading}
            className="search-button text-lg px-12 py-4 min-w-[140px]"
          >
            {isLoading ? "SEARCHING..." : "SEARCH"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchInput;