import { BadRequestException, Injectable } from "@nestjs/common";
import { RecipesIntegration } from "./recipe.integration";

@Injectable()
export class RecipesService {
    constructor(private readonly recipesIntegration: RecipesIntegration) {}
    public async getRecipes(ingredients: string) {
        const ingredientsArray = this.validateIngredients(ingredients);
        const recipes = await this.recipesIntegration.getRecipesData(ingredientsArray);
        return {
            keywords: ingredientsArray,
            recipes: await Promise.all(
                recipes.map(async (recipe) => ({
                    title: recipe.title,
                    ingredients: recipe.ingredients,
                    link: recipe.href,
                    gif: await this.recipesIntegration.getRecipesGif(recipe.title),
                })),
            ),
        };
    }

    public validateIngredients(ingredients?: string) {
        if (!ingredients) {
            throw new BadRequestException("You must send at least 1 ingredient");
        }

        const ingredientsArray = ingredients.split(",").sort();

        if (ingredientsArray.length > 3) {
            throw new BadRequestException("The max number of ingredients is 3");
        }
        return ingredientsArray;
    }
}
