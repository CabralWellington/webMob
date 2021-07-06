var moment = require('moment'); // require

async function setFilter(page,option){
    const dateInit = "01/05/2021 00:00:01";
    switch (option){
        case "ticketActive":
            await page.select('#TrackerTicketStatusCode', '')
            await page.select('#table_length > label > select', '800')
            await page.evaluate(val => document.querySelector("#StartDate").value = val, dateInit);
            await page.evaluate(val => document.querySelector("#table > thead > tr > th:nth-child(5)").click());
            await page.evaluate(val => document.querySelector("#table > thead > tr > th:nth-child(5)").click());
            await page.waitForTimeout(1500);
            await page.evaluate(val => document.querySelector("#btnApply").click());
            await stopFilter(page);
        break

        case "ticketDeactive":
            await page.select('#TrackerTicketStatusCode', '')
            await page.select('#table_length > label > select', '800')
            await page.evaluate(val => document.querySelector("#StartDate").value = val, dateInit);
            await page.evaluate(val => document.querySelector("#table > thead > tr > th:nth-child(5)").click());
            await page.evaluate(val => document.querySelector("#table > thead > tr > th:nth-child(5)").click());
            await page.waitForTimeout(1500);
            await page1.evaluate(val => document.querySelector("#Active").value = "False");
            await page.evaluate(val => document.querySelector("#btnApply").click());
            await stopFilter(page);
        break

    }

}

module.exports = {setFilter}


async function stopFilter(page){
    var foo = 0;
    var boo = true;
    do{
        await page.waitForTimeout(30000);
        try {
            await page.evaluate(val => document.querySelector("body > div.ui-ios-overlay.ios-overlay-show > span").textContent);
            console.log("No loop")
            foo++
            if(foo>10){
                console.log(foo)
                boo = false
            }
        } catch (error) {
            console.log("Saindo do loop")
            boo = false
        }
    }while(boo)
    await page.waitForTimeout(30000);
}