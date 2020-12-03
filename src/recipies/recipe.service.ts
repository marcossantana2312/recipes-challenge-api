import { BadRequestException, HttpService, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class RecipiesService {
    constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) {}
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
            throw new BadRequestException("You must send at least 1 ingredient");
        }

        const ingredientsArray = ingredients.split(",").sort();

        if (ingredientsArray.length > 3) {
            throw new BadRequestException("The max number of ingredients is 3");
        }
        return ingredientsArray;
    }

    public async getRecipiesData(ingredients: string[]) {
        return this.httpService
            .get<{ results: IResult[] }>(this.configService.get("RECIPES_URL"), {
                params: {
                    i: ingredients,
                },
            })
            .toPromise()
            .then((response) => response.data.results);
    }

    public async getRecipesGif(recipeName: string) {
        return this.httpService
            .get(this.configService.get("GIPHY_URL"), {
                params: {
                    api_key: this.configService.get("GIPHY_KEY"),
                    q: recipeName,
                    limit: 1,
                },
            })
            .toPromise()
            .then((response) => response.data.data[0].url as string);
    }
}

interface IResult {
    title: string;
    href: string;
    ingredients: string;
    thumbnail: string;
}
