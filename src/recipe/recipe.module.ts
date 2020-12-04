import { HttpModule, Module } from "@nestjs/common";
import { RecipesController } from "./recipe.controller";
import { RecipesIntegration } from "./recipe.integration";
import { RecipesService } from "./recipe.service";

@Module({
    imports: [
        HttpModule,
    ],
    controllers: [RecipesController],
    providers: [RecipesService, RecipesIntegration],
})
export class RecipesModule {}
