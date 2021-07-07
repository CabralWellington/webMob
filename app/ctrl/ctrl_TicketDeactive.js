const ctrlLogin = require('./ctrl_Login')
const ctrlJob = require('./ctrl_Job')
const ctrlNav = require('./ctrl_Nav')
const ctrlFilter = require('./ctrl_Filter')
const CtrlTicketDeactive = require("./ctrl_Ticket")
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
                await ctrlLogin.login(page);
                await ctrlFilter.setFilter(page,"ticketDeactive")
                await CtrlTicketDeactive.run(page,"Deactive")
            }
        } catch (error) {
            console.log(error)
        }
        page.waitForTimeout(10000);
    }while(true)
} 




module.exports = {run}