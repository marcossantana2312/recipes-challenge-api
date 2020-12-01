import { Injectable } from "@nestjs/common";

@Injectable()
export class RecipiesService {
    public getRecipies(ingredients: string) {
        return {
            keywords: ["onion", "tomato"],
            recipes: [
                {
                    title: "Greek Omelet with Feta",
                    ingredients: ["eggs", "feta cheese", "garlic", "red onions", "spinach", "tomato", "water"],
                    link: "http://www.kraftfoods.com/kf/recipes/greek-omelet-feta-104508.aspx",
                    gif: "https://media.giphy.com/media/xBRhcST67lI2c/giphy.gif",
                },
                {
                    title: "Guacamole Dip Recipe",
                    ingredients: ["avocado", "onions", "tomato"],
                    link: "http://cookeatshare.com/recipes/guacamole-dip-2783",
                    gif: "https://media.giphy.com/media/I3eVhMpz8hns4/giphy.gif",
                },
            ],
        };
    }
}
