import { Controller, Get, Query } from "@nestjs/common";
import { RecipesService } from "./recipe.service";

@Controller("recipes")
export class RecipesController {
    constructor(private readonly recipiesService: RecipesService) {}

    @Get()
    public async getRecipies(@Query("i") ingredients: string) {
        return this.recipiesService.getRecipes(ingredients);
    }
}
