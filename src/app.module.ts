import { Module } from "@nestjs/common";
import { RecipesModule } from "./recipe/recipe.module";

@Module({
    imports: [RecipesModule],
})
export class AppModule {}
