import { Page } from "playwright";
import * as selectors from './desertPageSelectors';
export class DesertPage{
    private readonly page : Page;
    constructor (page:Page){
        this.page=page;
    }
    async clickDesert():Promise<void>{
        console.log('click on desert');
        await this.page.click(selectors.dessertButton);
    }
    async clickChcoLava():Promise<void>{
        console.log('click on chocoLava');
        await this.page.click(selectors.ChocoLavaButton);
    }
    async clickButterScotch():Promise<void>{
        console.log('click on butter scotch');
        await this.page.click(selectors.ButterScotchButton);
    }
    async getText():Promise<string>{
        const text = await this.page.textContent(selectors.text);
        console.log('Tag is:',text);
        return text;
    }
    async getChocoLavaPrice():Promise<string>{
       const price = await this.page.textContent(selectors.chocoLavaPrice);
       console.log("Choco Lava Price",price);
       return price;
    }
    async getButterScotchPrice():Promise<string>{
        const price = await this.page.textContent(selectors.butterScotchPrice);
        console.log("Butter Scotch Price:",price);
        return price;
    }
}