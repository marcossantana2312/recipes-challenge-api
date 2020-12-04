import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as faker from "faker";
import "jest-extended";
import * as request from "supertest";
import { RecipesIntegration } from "./../src/recipe/recipe.integration";
import { RecipesModule } from "./../src/recipe/recipe.module";

describe("RecipeController (e2e)", () => {
    let app: INestApplication;
    const recipesIntegration = {
        getRecipesData: (ingredients: string[]) => {
            return ingredients.map(ingredient => ({
                title: faker.name.title(),
                ingredients: ingredient,
                href: faker.internet.url()
            }));
        },
        getRecipesGif: (recipeName: string) => faker.image.imageUrl()
    };

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [RecipesModule],
        })
            .overrideProvider(RecipesIntegration)
            .useValue(recipesIntegration)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it("/recipe (GET)", async () => {
        const ingredients = new Array(3).fill(null).map(i => faker.name.jobArea()).join(",");
        const ingredientsArray = ingredients.split(",").sort();
        const res = await request(app.getHttpServer())
            .get(`/recipes?i=${ingredients}`)
            .expect(200)
            .then(response => {
                expect(response.body).toMatchObject({
                    keywords: ingredientsArray,
                    recipes: expect.toBeArray()
                });
            });
    });
});
