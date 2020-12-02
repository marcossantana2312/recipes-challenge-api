import { NestFactory } from "@nestjs/core";
import { config } from "dotenv";
import { AppModule } from "./app.module";

config();

const PORT = process.env.PORT || 3000;
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(PORT, () => {
        if (!process.env.RECIPES_URL || !process.env.GIPHY_KEY || !process.env.GIPHY_URL) {
            console.warn(
                `Some of the following variables: RECIPES_URL (${process.env.RECIPES_URL}), GIPHY_KEY (${process.env.GIPHY_KEY}), GIPHY_URL (${process.env.GIPHY_URL}) was not set`,
            );
        }
        console.log(`listening at http://localhost:${PORT}`);
    });
}
bootstrap();
