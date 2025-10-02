import { Clock, Users } from "lucide-react";
import tomatoPastaImg from "@/assets/tomato-pasta.png";
import garlicButterRiceImg from "@/assets/garlic-butter-rice.png";
import vegetableStirFryImg from "@/assets/vegetable-stir-fry.png";
import mushroomOmeletImg from "@/assets/mushroom-omelet.png";
import lemonHerbChickenImg from "@/assets/lemon-herb-chicken.png";
import { Recipe } from "@/data/sampleRecipes";

const recipeImages: Record<string, string> = {
  "tomato-pasta": tomatoPastaImg,
  "garlic-butter-rice": garlicButterRiceImg,
  "vegetable-stir-fry": vegetableStirFryImg,
  "mushroom-omelet": mushroomOmeletImg,
  "lemon-herb-chicken": lemonHerbChickenImg,
};

interface RecipeCardProps {
  recipe: Recipe;
  matchPercentage?: number;
}

const RecipeCard = ({ recipe, matchPercentage }: RecipeCardProps) => {
  const recipeImage = recipeImages[recipe.image];

  return (
    <div className="bg-card rounded-3xl p-6 shadow-sm border border-border w-full max-w-md mx-auto">
      <div className="flex items-start gap-4 mb-6">
        <div className="flex-shrink-0">
          <img 
            src={recipeImage} 
            alt={recipe.title}
            className="w-20 h-20 rounded-2xl object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-bold text-foreground">
              {recipe.title}
            </h3>
            {matchPercentage && (
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                {matchPercentage}% match
              </span>
            )}
          </div>
          <div className="flex items-center text-muted-foreground text-sm">
            <Clock className="h-4 w-4 mr-1" />
            <span>{recipe.cookingTime} min</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <ul className="space-y-1">
            {recipe.ingredients.slice(0, 4).map((ingredient, index) => (
              <li key={index} className="text-muted-foreground capitalize text-lg">
                {ingredient}
              </li>
            ))}
            {recipe.ingredients.length > 4 && (
              <li className="text-muted-foreground text-lg">
                +{recipe.ingredients.length - 4} more ingredients
              </li>
            )}
          </ul>
        </div>

        <div>
          <ol className="space-y-2">
            {recipe.instructions.slice(0, 3).map((step, index) => (
              <li key={index} className="text-muted-foreground text-lg">
                <span className="font-medium text-foreground">{index + 1}.</span> {step}
              </li>
            ))}
            {recipe.instructions.length > 3 && (
              <li className="text-muted-foreground text-lg">
                +{recipe.instructions.length - 3} more steps
              </li>
            )}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;