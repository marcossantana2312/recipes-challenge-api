import { Test, TestingModule } from "@nestjs/testing";
import * as faker from "faker";

import { HttpModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { RecipesController } from "./recipe.controller";
import { RecipesIntegration } from "./recipe.integration";
import { RecipesService } from "./recipe.service";

describe("RecipiesService", () => {
    let recipiesService: RecipesService;

    beforeEach(async () => {
        const app = await Test.createTestingModule({
            imports: [HttpModule, ConfigModule],
            controllers: [RecipesController],
            providers: [RecipesService, RecipesIntegration],
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
