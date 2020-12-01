import { Module } from "@nestjs/common";
import { RecipiesController } from "./recipe.controller";
import { RecipiesService } from "./recipe.service";

@Module({
    imports: [],
    controllers: [RecipiesController],
    providers: [RecipiesService],
})
export class RecipiesModule {}
