const info = require("../info/passwords");
const ctrlNav = require('./ctrl_Nav')

async function login(page){
    if(await checkLogin(page)){
        await page.type('#Email', info.getMobLogin());
        await page.type('#Password', info.getMobPassword());
        await page.click('.buttonLogin');
        await page.waitForTimeout(20000);
        await ctrlNav.goto(page,"ticketPage")
    }else{
        await ctrlNav.goto(page,"ticketPage")
    }
    await page.waitForTimeout(20000);
}

// Login Check
async function checkLogin(page){
    if(page.url().substr(0,44)=="http://mob2b-backend.cloudapp.net/User/LogOn"){
        return true;
    }else{
        return false;
    }
}

module.exports = {login}