import { GiphyFetch } from "@giphy/js-fetch-api";
import { Injectable } from "@nestjs/common";
import ax from "axios";

@Injectable()
export class RecipiesService {
    public async getRecipies(ingredients: string) {
        const ingredientsArray = this.validateIngredients(ingredients);
        const recipes = await this.getRecipiesData(ingredientsArray);
        return {
            keywords: ingredientsArray,
            recipes: await Promise.all(
                recipes.map(async (recipe) => ({
                    title: recipe.title,
                    ingredients: recipe.ingredients,
                    link: recipe.href,
                    gif: await this.getRecipesGif(recipe.title),
                })),
            ),
        };
    }

    public validateIngredients(ingredients?: string) {
        if (!ingredients) {
            throw new Error("You must send at least 1 ingredient");
        }

        const ingredientsArray = ingredients.split(",").sort();

        if (ingredientsArray.length > 3) {
            throw new Error("The max number of ingredients is 3");
        }
        return ingredientsArray;
    }

    public async getRecipiesData(ingredients: string[]) {
        return ax.get(`${process.env.RECIPES_URL}/?i=${ingredients.join(",")}`).then((res) => res.data.results as IResult[]);
    }

    public async getRecipesGif(recipeName: string) {
        return ax.get(`${process.env.GIPHY_URL}?api_key=${process.env.GIPHY_KEY}&q=${recipeName}&limit=1`).then((res) => res.data.data[0].url);
    }
}

interface IResult {
    title: string;
    href: string;
    ingredients: string;
    thumbnail: string;
}
