const info = require("../info/passwords");

async function login(page){
    if(checkLogin(page)){
        await page.type('#Email', info.getMobLogin());
        await page.type('#Password', info.getMobPassword());
        await page.click('.buttonLogin');
        await page.waitForTimeout(20000);
    }
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