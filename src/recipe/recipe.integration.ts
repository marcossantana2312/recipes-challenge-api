import { HttpException, HttpService, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class RecipesIntegration {
    constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) {}

    public async getRecipesData(ingredients: string[]) {
        return this.httpService
            .get<{ results: IResult[] }>(this.configService.get("RECIPES_URL"), {
                params: {
                    i: ingredients.join(","),
                },
            })
            .toPromise()
            .then((response) => response.data.results)
            .catch((err) => {
                throw new HttpException("External Service Unavailable", 503);
            });
    }

    public async getRecipesGif(recipeName: string) {
        return this.httpService
            .get(this.configService.get("GIPHY_URL"), {
                params: {
                    api_key: this.configService.get("GIPHY_KEY"),
                    q: recipeName,
                    limit: 1,
                },
            })
            .toPromise()
            .then((response) => response.data.data[0].url as string)
            .catch((err) => {
                throw new HttpException("External Service Unavailable", 503);
            });
    }
}

interface IResult {
    title: string;
    href: string;
    ingredients: string;
    thumbnail: string;
}
