const ctrlLogin = require('./ctrl_Login')
const ctrlJob = require('./ctrl_Job')
const ctrlNav = require('./ctrl_Nav')
const ctrlFilter = require('./ctrl_Filter')
const CtrlTicketOpen = require("./ctrl_Ticket")
const moment = require('moment');

async function run(browser){
    Ctrl(browser)
}

async function Ctrl(browser){
    const page = await browser.newPage();
    do{
        try {
            if(ctrlJob.getJobStatus()){
                await ctrlNav.goto(page,"loginPage")
                await ctrlLogin.login(page);
                await ctrlNav.goto(page,"ticketPage")
                await ctrlFilter.setFilter(page,"ticketDeactive")
                await CtrlTicketOpen.run(page,"Active")
            }
        } catch (error) {
            console.log(error)
        }
        page.waitForTimeout(10000);
    }while(true)
} 




module.exports = {run}