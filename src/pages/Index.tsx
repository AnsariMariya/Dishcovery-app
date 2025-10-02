import { useState } from "react";
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import RecipeCard from "@/components/RecipeCard";
import { findRecipesByIngredients, RecipeMatch } from "@/data/sampleRecipes";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [recipeMatches, setRecipeMatches] = useState<RecipeMatch[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (ingredientsInput: string) => {
    setIsLoading(true);
    setHasSearched(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const ingredientsList = ingredientsInput
        .split(',')
        .map(ing => ing.trim())
        .filter(ing => ing.length > 0);
      
      const foundMatches = findRecipesByIngredients(ingredientsList);
      setRecipeMatches(foundMatches);
      
      if (foundMatches.length === 0) {
        toast({
          title: "No recipes found",
          description: "Try adding more common ingredients or different combinations.",
          variant: "destructive"
        });
      } else {
        toast({
          title: `Found ${foundMatches.length} recipe${foundMatches.length === 1 ? '' : 's'}!`,
          description: "Perfect matches for your available ingredients."
        });
      }
    } catch (error) {
      toast({
        title: "Search failed",
        description: "Please try again in a moment.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <Header />
        
        <div className="mb-12">
          <SearchInput onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {hasSearched && (
          <div className="space-y-8">
            {recipeMatches.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recipeMatches.map((match) => (
                  <RecipeCard 
                    key={match.recipe.id} 
                    recipe={match.recipe} 
                    matchPercentage={match.matchPercentage} 
                  />
                ))}
              </div>
            ) : !isLoading && (
              <div className="text-center py-12">
                <p className="text-xl text-muted-foreground">
                  No recipes found with those ingredients. Try different combinations!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
