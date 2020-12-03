import { BadRequestException, HttpException, HttpService, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class RecipesService {
    constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) {}
    public async getRecipes(ingredients: string) {
        const ingredientsArray = this.validateIngredients(ingredients);
        const recipes = await this.getRecipesData(ingredientsArray);
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

    public async getRecipesData(ingredients: string[]) {
        return this.httpService
            .get<{ results: IResult[] }>(this.configService.get("RECIPES_URL"), {
                params: {
                    i: ingredients.join(","),
                },
            })
            .toPromise()
            .then((response) => response.data.results)
            .catch((err) => {
                throw new HttpException("External Service Unavailable", 503);
            });
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
            .then((response) => response.data.data[0].url as string)
            .catch((err) => {
                throw new HttpException("External Service Unavailable", 503);
            });
    }
}

interface IResult {
    title: string;
    href: string;
    ingredients: string;
    thumbnail: string;
}
