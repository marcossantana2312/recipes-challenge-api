import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { RecipesModule } from "./recipe/recipe.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        RecipesModule
    ],
})
export class AppModule {}
