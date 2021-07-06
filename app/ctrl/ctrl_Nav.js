async function goto(page,option){
    switch(option){
        
        case "ticketPage":
            await page.goto("http://mob2b-backend.cloudapp.net/Tracker/TrackerTicket")
            await page.waitForTimeout(60000); 
        break
        case "loginPage":
            await page.goto("http://mob2b-backend.cloudapp.net/User/LogOn?ReturnUrl=%2f")
            await page.waitForTimeout(3000); 
        break
    }
}

module.exports = {goto}