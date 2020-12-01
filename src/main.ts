import { NestFactory } from "@nestjs/core";
import { config } from "dotenv";
import { AppModule } from "./app.module";

config();

const PORT = process.env.PORT || 3000;
async function bootstrap() {
  
    const app = await NestFactory.create(AppModule);
    await app.listen(PORT, () => {
      if(!process.env.RECIPIES_URL || !process.env.GIPHY_KEY) {
        console.warn(`Some of the following variables:
          RECIPIES_URL (${process.env.RECIPIES_URL}), GIPHY_KEY (${process.env.GIPHY_KEY}) was not set`);
      }
      console.log(`listening at http://localhost:${PORT}`);
    });
}
bootstrap();
