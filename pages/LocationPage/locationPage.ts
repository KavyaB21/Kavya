import{Page} from '@playwright/test'
import * as selectors from './locationPageSelectors';
export class LocationPage{
    private readonly page : Page;
    constructor(page: Page) {
    this.page = page;
}

    async clickAddress():Promise<void>{
        console.log('click address button');
        await this.page.click(selectors.addressButton);
    }
    async enterLocation(pinCode:string):Promise<void>{
        console.log('enter your location');
        await this.page.fill(selectors.area,pinCode);
    }
    async clickAllowButton():Promise<void>{
        console.log('click allow button');
        await this.page.click(selectors.allowButton);
    }
    async clickSuggestion():Promise<void>{
        console.log('select first suggestion');
        await this.page.click(selectors.firstSuggestion);
    }
    async getLocationFieldText():Promise<string>{
        const text=await this.page.textContent(selectors.locationText);
        console.log("Location:",text);
        return text;
    }
}