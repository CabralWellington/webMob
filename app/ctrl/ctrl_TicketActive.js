
const ctrlLogin = require('./ctrl_Login')
const ctrlJob = require('./ctrl_Job')
const ctrlNav = require('./ctrl_Nav')
const ctrlFilter = require('./ctrl_Filter')
const CtrlTicketOpen = require("./ctrl_Ticket")
const CtrlSla = require("./ctrl_slatToDB")
const moment = require('moment');

async function run(browser){
    Ctrl(browser)
}

async function Ctrl(browser){
    const page = await browser.newPage();
    await ctrlNav.goto(page,"loginPage")
    do{
        try {
            if(await ctrlJob.getJobStatus()){
                await ctrlLogin.login(page)
                await ctrlFilter.setFilter(page,"ticketActive")
                await CtrlTicketOpen.run(page,"Active")
                await CtrlSla.run();
            }
        } catch (error) {
            console.log(error)
        }
        page.waitForTimeout(10000);
    }while(true)
} 




module.exports = {run}