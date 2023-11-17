import { Page} from "playwright";
import * as selectors from './placeOrderSelectors';
export class PlaceOrderPage{
    private readonly page:Page;
    constructor(page:Page){
        this.page=page;
    }
async getCheckoutPageSubTotal():Promise<string>{
    const checkoutSubTotal = await this.page.textContent(selectors.afterDisSubTotal);
    console.log("CheckoutSubTotal:",checkoutSubTotal);
    return checkoutSubTotal;
}
}