import {Page, chromium} from '@playwright/test';
export class BrowserPage{
    private readonly page:Page
    constructor(page:Page){
        this.page = page;
    }
    async browserLaunch():Promise<void>{
        await chromium.launch();
    }
    async dominosUrl(url:string):Promise<void>{
        await this.page.goto(url);
    }
}