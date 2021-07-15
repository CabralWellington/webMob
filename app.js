const puppeteer = require('puppeteer');
const ctrl_TicketOpen = require("./app/ctrl/ctrl_TicketActive")
const ctrl_TicketDeadctive = require("./app/ctrl/ctrl_TicketDeactive") 
const todb = require("./app/db/ticketToDb")
run();

async function run(){
    const browser1 = await puppeteer.launch(/*{headless: false}*/);
    //const browser2 = await puppeteer.launch({headless: false});
    //const browser3 = await puppeteer.launch({headless: false});
    ctrl_TicketOpen.run(browser1);
    //setTimeout(function(){
    //ctrl_TicketDeadctive.run(browser2);
    //},2000)
    //todb.updateSla();

}

