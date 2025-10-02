export interface Recipe {
  id: string;
  title: string;
  cookingTime: number;
  servings: number;
  ingredients: string[];
  instructions: string[];
  tags: string[];
  image: string;
}

export interface RecipeMatch {
  recipe: Recipe;
  matchPercentage: number;
}

export const sampleRecipes: Recipe[] = [
  {
    id: "1",
    title: "Tomato Pasta",
    cookingTime: 30,
    servings: 4,
    ingredients: ["pasta", "tomatoes", "onion", "garlic", "olive oil", "basil", "salt", "pepper"],
    instructions: [
      "Cook the pasta according to package directions.",
      "Sauté onion and garlic in olive oil until fragrant.",
      "Add chopped tomatoes and simmer for 15 minutes.",
      "Season with salt, pepper, and fresh basil.",
      "Combine pasta with sauce and serve."
    ],
    tags: ["vegetarian", "quick", "italian"],
    image: "tomato-pasta"
  },
  {
    id: "2",
    title: "Garlic Butter Rice",
    cookingTime: 25,
    servings: 3,
    ingredients: ["rice", "garlic", "butter", "onion", "vegetable broth", "salt"],
    instructions: [
      "Sauté minced garlic and onion in butter.",
      "Add rice and toast for 2 minutes.",
      "Pour in vegetable broth and bring to boil.",
      "Reduce heat, cover and simmer for 18 minutes.",
      "Fluff with fork and serve."
    ],
    tags: ["vegetarian", "side-dish", "comfort-food"],
    image: "garlic-butter-rice"
  },
  {
    id: "3",
    title: "Vegetable Stir Fry",
    cookingTime: 15,
    servings: 2,
    ingredients: ["onion", "garlic", "carrots", "bell peppers", "soy sauce", "oil", "ginger"],
    instructions: [
      "Heat oil in a large pan or wok.",
      "Add garlic and ginger, stir for 30 seconds.",
      "Add onion and carrots, cook for 3 minutes.",
      "Add bell peppers and stir fry for 2 minutes.",
      "Add soy sauce and toss everything together."
    ],
    tags: ["vegan", "healthy", "quick", "asian"],
    image: "vegetable-stir-fry"
  },
  {
    id: "4",
    title: "Mushroom Omelet",
    cookingTime: 10,
    servings: 1,
    ingredients: ["eggs", "mushrooms", "onion", "cheese", "butter", "salt", "pepper"],
    instructions: [
      "Sauté sliced mushrooms and onion in butter.",
      "Beat eggs with salt and pepper.",
      "Pour eggs into the pan with vegetables.",
      "Add cheese and fold omelet in half.",
      "Serve immediately while hot."
    ],
    tags: ["vegetarian", "breakfast", "protein", "quick"],
    image: "mushroom-omelet"
  },
  {
    id: "5",
    title: "Lemon Herb Chicken",
    cookingTime: 35,
    servings: 4,
    ingredients: ["chicken", "lemon", "garlic", "herbs", "olive oil", "onion", "salt", "pepper"],
    instructions: [
      "Season chicken with salt, pepper, and herbs.",
      "Heat olive oil in a skillet.",
      "Brown chicken on both sides, about 6 minutes each.",
      "Add sliced onion and garlic to the pan.",
      "Squeeze lemon juice over everything and simmer until chicken is cooked through."
    ],
    tags: ["protein", "healthy", "main-dish"],
    image: "lemon-herb-chicken"
  }
];

export const findRecipesByIngredients = (userIngredients: string[]): RecipeMatch[] => {
  const normalizedUserIngredients = userIngredients.map(ing => ing.toLowerCase().trim());
  
  return sampleRecipes
    .map(recipe => {
      const matchCount = recipe.ingredients.filter(ingredient =>
        normalizedUserIngredients.some(userIng =>
          ingredient.toLowerCase().includes(userIng) || userIng.includes(ingredient.toLowerCase())
        )
      ).length;
      
      const matchPercentage = Math.round((matchCount / recipe.ingredients.length) * 100);
      return { recipe, matchPercentage };
    })
    .filter(item => item.matchPercentage >= 25) // Require at least 25% match
    .sort((a, b) => b.matchPercentage - a.matchPercentage) // Sort by match percentage
    .slice(0, 3); // Return top 3 matches
};