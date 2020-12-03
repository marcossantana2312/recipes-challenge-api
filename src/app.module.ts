import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { RecipesModule } from "./recipe/recipe.module";

@Module({
    imports: [RecipesModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
