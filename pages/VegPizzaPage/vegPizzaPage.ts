import { Page } from "playwright";
import * as selectors from './vegPizzaPageSelectors';
export class VegPizzaPage{
    private readonly page : Page;
    constructor(page:Page){
        this.page=page;
    }
    async clickVegPizza():Promise<void>{
        console.log('click on vegPizza');
        await this.page.click(selectors.vegPizza);
    }
    async clickMargherita():Promise<void>{
        console.log('click on marghrita pizza');
        await this.page.click(selectors.margheritaPizzaButton);
    }
    async clickNoThanks():Promise<void>{
        console.log('click on no thanks button');
        await this.page.click(selectors.noThanksButton);
    }
    async clickPeppyPaneer():Promise<void>{
        console.log('click on peppy paneer');
        await this.page.click(selectors.peppyPannerPizzaButton);
    }
    async clickCheesePaneer():Promise<void>{
        console.log('click on cheese paneer');
        await this.page.click(selectors.cheesePaneerPizzaButton);
    }
    async clickIncreaseMargherita():Promise<void>{
        console.log('click on increase margherita');
        await this.page.click(selectors.increaseMargheritaButton);
    }
    async clickIncreasePeppyPaneer():Promise<void>{
        console.log('click on increase peppy paneer');
        await this.page.click(selectors.increasePeppyPaneerButton);
    }
    async clickIncreaseCheesePaneer():Promise<void>{
        console.log('click on increase cheese paneer');
        await this.page.click(selectors.increaseCheesePaneerButton);
    }
    async clickDecreaseMargherita():Promise<void>{
        console.log('click on decrease cheese paneer')
        await this.page.click(selectors.decreaseMargheritaButton);
    }
    async getUrl():Promise<string>{
        const url = await this.page.url();
        console.log("URL is:",url);
        return url;
    }
    async getMargheritaPrice():Promise<string>{
        const price =await this.page.textContent(selectors.margheritaPrice);
        console.log("Margherita Pizza:",price);
        return price;
    }
    async getPeppyPaneerPrice():Promise<string>{
        const price = await this.page.textContent(selectors.peppyPaneerPrice);
        console.log("Peppy Paneer Price:",price);
        return price;
    }
    async getCheeseParathaPrice():Promise<string>{
        const price = await this.page.textContent(selectors.cheesePaneerPrice);
        console.log("Cheese Paratha Price:",price);
        return price;
    } 
}