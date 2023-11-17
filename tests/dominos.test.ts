import {DominosStep} from '../steps/dominosStep'
import * as testData from '../testData/dominosTestData';
import {Page,test} from '@playwright/test';

test("Dominos Poc", async({page})=>{
   // await chromium.launch();
   // await page.goto("https://www.dominos.co.in/");
   

 const dominosStep = new DominosStep(page);
 await test.step('Given user enter the dominos website',async()=>{
    await dominosStep.browserLaunch();
    await dominosStep.launchUrl(testData.url);
 });
 await test.step('When user click on OrderonlineNow button',async()=>{
    await dominosStep.clickOrderOnlineButton();
 });
 await test.step('And user click on enter address button',async()=>{
    await dominosStep.clickLocation(testData.pinCode);
 });
//  await test.step('And user click on vegPizza',async()=>{
//    await dominosStep.vegPizza(testData.increasePizza);
//  });
//  await test.step('And user click on desert',async()=>{
//    await dominosStep.deserts();
//  });
await test.step('And user click on pizza and desert',async()=>{
  await dominosStep.totalPrice(testData.increasePizza);
});
//  await test.step('And user click on check out button',async()=>{
//    await dominosStep.clickCheckout();
//  });
})
