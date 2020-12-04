import { HttpModule, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { RecipesController } from "./recipe.controller";
import { RecipesIntegration } from "./recipe.integration";
import { RecipesService } from "./recipe.service";

@Module({
    imports: [
        HttpModule,
        ConfigModule.forRoot({
            isGlobal: true,
        }),
    ],
    controllers: [RecipesController],
    providers: [RecipesService, RecipesIntegration],
})
export class RecipesModule {}
