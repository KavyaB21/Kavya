import{Page} from'@playwright/test';
import * as selectors from './checkoutPageSelectors';
export class CheckoutPage{
    private readonly page:Page;
    constructor(page:Page){
        this.page = page;
    }
    async clickCheckOut():Promise<void>{
        console.log('click on check out button')
        await this.page.click(selectors.checkOut);
    }
    async subTotal():Promise<string>{
        const price = await this.page.textContent(selectors.subTotal);
        console.log("SubTotal is:",price);
        return price;
    }
}