import { Test, TestingModule } from "@nestjs/testing";
import * as faker from "faker";

import { RecipesController } from "./recipe.controller";
import { RecipesService } from "./recipe.service";

describe("RecipiesService", () => {
    let recipiesService: RecipesService;

    beforeEach(async () => {
        const app = await Test.createTestingModule({
            controllers: [RecipesController],
            providers: [RecipesService],
        }).compile();

        recipiesService = app.get<RecipesService>(RecipesService);
    });

    it("should return a ingredients array", () => {
        const ingredientString = `${faker.commerce.productName()},${faker.commerce.productName()},${faker.commerce.productName()}`;

        expect(recipiesService.validateIngredients(ingredientString)).toStrictEqual(ingredientString.split(",").sort());
    });

    it("should return error message when no ingredients was passed", () => {
        const ingredientString = ``;

        const testIngredients = () => {
            recipiesService.validateIngredients(ingredientString);
        };

        expect(testIngredients).toThrowError(new Error("You must send at least 1 ingredient"));
    });

    it("should return error message when more than 3 ingredients was passed", () => {
        const ingredientString = `${faker.commerce.productName()},${faker.commerce.productName()},${faker.commerce.productName()},${faker.commerce.productName()}`;

        const testIngredients = () => {
            recipiesService.validateIngredients(ingredientString);
        };

        expect(testIngredients).toThrowError(new Error("The max number of ingredients is 3"));
    });
});
