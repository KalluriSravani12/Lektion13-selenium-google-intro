//We want to pull out Builder, By, Key and until from the selenium library
const {Builder, By, Key, until} = require('selenium-webdriver');
// We import should() from chai
const should = require('chai').should();


async function googleSearch(){
    let driver = await new Builder().forBrowser('firefox').build();//Create the new instance of firefox

    try{
        //Go to google.com
        await driver.get('https://www.google.com');
        // Find the accept cookies button
        let cookieButton = await driver.findElements(By.css('.QS5gu.sy4vM'));
        // Click the accept cookies button
        await cookieButton[1].click();
        //wait until the element is located , in this case search bar
        await driver.wait(until.elementLocated(By.name('q')), 1000);
        //Selenium is too  fast, better wait 1 second/1000ms
        await driver.sleep(1000);
        // Write soething in the search bar and push enter
        await driver.findElement(By.name('q')).sendKeys('Selenium', Key.ENTER);
        //wait until elements located
        await driver.wait(until.elementLocated(By.css('h3')), 10000);

        //Get the link text
        let firstLink = await driver.findElement(By.css('h3'));
        let linkText = await firstLink.getText();
        console.log(linkText);
        //Assert linkText
        linkText.should.equal('Selenium');
        if (linkText==='Selenium'){
            await firstLink.click();
        }else{
            console.log('First link is not "Selenium"')
        }
        //Wait until site loads
        await driver.wait(until.titleContains('Selenium'), 10000);
        //Get the title
        let title = await driver.getTitle();
        //Assert the title
        title.should.include('Selenium');
        console.log(title);

    }catch(error){
        console.log(error);
    }finally {
        console.log("Test ran successfully")
        await driver.quit();
    }
}

googleSearch();