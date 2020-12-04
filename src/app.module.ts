import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { RecipesModule } from "./recipe/recipe.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ".env"
        }),
        RecipesModule
    ],
})
export class AppModule {}
