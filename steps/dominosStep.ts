import{Browser, Page, expect} from '@playwright/test';
import {LocationPage, HomePage, DesertPage, CheckoutPage, VegPizzaPage, BrowserPage, PlaceOrderPage}  from '../pages'
export class DominosStep{
    private readonly page : Page;
    private readonly _locationPage : LocationPage;
    private readonly _homePage : HomePage;
    private readonly _desertPage : DesertPage;
    private readonly _vegPizzaPage : VegPizzaPage;
    private readonly _checkoutPage : CheckoutPage;
    private readonly _browserPage : BrowserPage;
    private readonly _placeOrderPage: PlaceOrderPage;
    constructor(page:Page){
        this._checkoutPage=new CheckoutPage(page);
        this._desertPage = new DesertPage(page);
        this._homePage = new HomePage(page);
        this._locationPage = new LocationPage(page);
        this._vegPizzaPage = new VegPizzaPage(page);
        this._browserPage =new BrowserPage(page);
        this._placeOrderPage=new PlaceOrderPage(page);
    }

    async browserLaunch():Promise<void>{
        await this._browserPage.browserLaunch();
    }
    async launchUrl(url:string):Promise<void>{
        await this._browserPage.dominosUrl(url);
    }
    async clickOrderOnlineButton():Promise<void>{
        await this._homePage.clickOrderOnlineButton();
      }
    async clickLocation(pinCode:string):Promise<void>{
        await this._locationPage.clickAddress();
        await this._locationPage.clickAllowButton();
        expect(await this._locationPage.getLocationFieldText()).toBe('Please select location, so that we can find a restaurant that delivers to you!');
        await this._locationPage.enterLocation(pinCode);
        await this._locationPage.clickSuggestion();
        
    }
    async vegPizza(increasePizza:JSON):Promise<number>{
        await this._vegPizzaPage.clickVegPizza();
        expect(await this._vegPizzaPage.getUrl()).toContain("pizzaonline.dominos");
        await this._vegPizzaPage.clickMargherita();
        const margheritaPrice = await this._vegPizzaPage.getMargheritaPrice();
        const peppyPaneerPrice =await this._vegPizzaPage.getPeppyPaneerPrice();
        const cheeseParathaPrice =await this._vegPizzaPage.getCheeseParathaPrice();
        await this._vegPizzaPage.clickNoThanks();
        await this._vegPizzaPage.clickPeppyPaneer();
        await this._vegPizzaPage.clickCheesePaneer();
        for(let i=1;i<increasePizza['margherita'];i++){
            await this._vegPizzaPage.clickIncreaseMargherita();
        }
        for(let i=1;i<increasePizza['peppyPanner'];i++){
            await this._vegPizzaPage.clickIncreasePeppyPaneer();
        }
        for(let i=1;i<increasePizza['cheesePaneer'];i++){
            await this._vegPizzaPage.clickIncreaseCheesePaneer();
        }
         for(let i=1;i<=increasePizza['decreaseMargherita'];i++){
            await this._vegPizzaPage.clickDecreaseMargherita();
         }
        const pizzaTotal = (parseFloat(margheritaPrice)*(increasePizza['margherita']-increasePizza['decreaseMargherita']))+
        (parseFloat(peppyPaneerPrice)*(increasePizza['peppyPanner']))+(parseFloat(cheeseParathaPrice)*increasePizza['cheesePaneer']);
        return pizzaTotal;           
    }
    async deserts(increasePizza:JSON):Promise<JSON>{
        await this._desertPage.clickDesert();
        expect(await this._desertPage.getText()).toBe("DESSERTS");
        await this._desertPage.clickChcoLava();
        const chocoLavaPrice = await this._desertPage.getChocoLavaPrice();
        const butterScotchPrice = await this._desertPage.getButterScotchPrice();
        const discountedPrice=(parseFloat(butterScotchPrice)*(((increasePizza['discount']))/100))
        await this._desertPage.clickButterScotch();
        const desertTotal = parseFloat(chocoLavaPrice)+parseFloat(butterScotchPrice);
        const desertPrice=JSON.parse(`{
            "chocoLavaPrice":"${chocoLavaPrice}",
            "discountedButterscotchPrice":"${discountedPrice}",
            "desertTotal":"${desertTotal}"
        }`)
        return desertPrice;
    }
    async clickCheckout():Promise<void>{
        await this._checkoutPage.clickCheckOut();
    }
    async totalPrice(increasePizza:JSON):Promise<void>{
       const pizzaPrice = await this.vegPizza(increasePizza);
       const desertPrice = await this.deserts(increasePizza);
       const subTotal=await this._checkoutPage.subTotal();
       await this.clickCheckout();
       const placeOrderPageSubTotal = await this._placeOrderPage.getCheckoutPageSubTotal();
       expect(parseFloat(subTotal)).toEqual(pizzaPrice+parseFloat(desertPrice['desertTotal']));
       const discountedSubTotal=parseFloat(subTotal)-parseFloat(desertPrice['discountedButterscotchPrice']);
       expect((discountedSubTotal)).toBeCloseTo(parseFloat(placeOrderPageSubTotal));
    }
}