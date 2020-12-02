import { Controller, Get, Query } from "@nestjs/common";
import { RecipiesService } from "./recipe.service";

@Controller("recipes")
export class RecipiesController {
    constructor(private readonly recipiesService: RecipiesService) {}

    @Get()
    public async getRecipies(@Query("i") ingredients: string) {
        return this.recipiesService.getRecipies(ingredients);
    }
}
