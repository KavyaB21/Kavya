import{Page} from '@playwright/test';
import * as selectors from './homePageSelectors';
export class HomePage{
    private readonly page:Page
    constructor(page:Page){
        this.page = page;
    }
    async clickOrderOnlineButton():Promise<void>{
        console.log('click on order online button')
        await this.page.click(selectors.orderOnlineButton);
    }
}