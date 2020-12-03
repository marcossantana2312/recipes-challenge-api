import { HttpModule, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { RecipiesController } from "./recipe.controller";
import { RecipiesService } from "./recipe.service";

@Module({
    imports: [
        HttpModule,
        ConfigModule.forRoot({
            isGlobal: true,
        }),
    ],
    controllers: [RecipiesController],
    providers: [RecipiesService],
})
export class RecipiesModule {}
