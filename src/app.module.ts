import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { RecipiesModule } from "./recipies/recipe.module";

@Module({
    imports: [RecipiesModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
