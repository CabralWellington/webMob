
module.exports = {run}

const toDb = require("../db/ticketToDb")
var moment = require('moment');

async function run(page,option){
    switch(option){
        case "Active":
            await ctrlReadPageActive(page)
        break
        case "Deactive":
            await ctrlReadPageDeactive(page)
        break
    }
}

async function ctrlReadPageActive(page){
    var localBufferList = [];
    for(i=1;i<await getSizePage(page)+1;i++){
        await localBufferList.unshift(await readPageActive(i,page));
    }
    await toDb.toDbTicket(localBufferList)
    await toDb.updateSerialObs(page)
}
async function ctrlReadPageDeactive(page){
    var localBufferList = [];
    for(i=1;i< await getSizePage(page)+1;i++){
         await localBufferList.unshift( await readPageDeactivate(i,page));
    }
    await toDb.toDbTicket(localBufferList)
}
async function readPageDeactivate(idPage,page){
    var localBufferList = [];
    //adicionando o numero do atendimento
    //8
    localBufferList.unshift(await getInfoPage("numero_atendimento",idPage,page))
    //7
    localBufferList.unshift(await getInfoPage("dt_abertura",idPage,page));
    //6
    localBufferList.unshift(await getInfoPage("nome_tec",idPage,page));
    //5
    localBufferList.unshift(await getInfoPage("nome_cliente",idPage,page));
    //4
    localBufferList.unshift(await getInfoPage("Desativado",idPage,page));
    //3
    localBufferList.unshift(await getInfoPage("id_mob2b",idPage,page));
    //2
    localBufferList.unshift(await getInfoPage("id_mob2b_cliente",idPage,page));
    //1
    localBufferList.unshift(await getInfoPage("dt_inicio",idPage,page));
    //0
    localBufferList.unshift(await getInfoPage("dt_fechamento",idPage,page));
    return localBufferList
}
async function readPageActive(idPage,page){
    var localBufferList = [];
    //adicionando o numero do atendimento
    //8
    localBufferList.unshift(await getInfoPage("numero_atendimento",idPage,page))
    //7
    localBufferList.unshift(await getInfoPage("dt_abertura",idPage,page));
    //6
    localBufferList.unshift(await getInfoPage("nome_tec",idPage,page));
    //5
    localBufferList.unshift(await getInfoPage("nome_cliente",idPage,page));
    //4
    localBufferList.unshift(await getInfoPage("atend_status",idPage,page));
    //3
    localBufferList.unshift(await getInfoPage("id_mob2b",idPage,page));
    //2
    localBufferList.unshift(await getInfoPage("id_mob2b_cliente",idPage,page));
    //1
    localBufferList.unshift(await getInfoPage("dt_inicio",idPage,page));
    //0
    localBufferList.unshift(await getInfoPage("dt_fechamento",idPage,page));
    return localBufferList
}
async function getInfoPage(info,idPage,page){
    var infoTela = 0;
    switch (info){
        case "numero_atendimento":
            return await page.evaluate( val => document.querySelector("#table > tbody > tr:nth-child("+val+") > td:nth-child(3)").textContent , idPage);
        break;
        case "dt_abertura":
            return page.evaluate( val => document.querySelector("#table > tbody > tr:nth-child("+val+") > td:nth-child(5)").textContent, idPage);
        case "nome_cliente":
            return page.evaluate( val => document.querySelector("#table > tbody > tr:nth-child("+val+") > td:nth-child(9)").textContent.trim(), idPage);
        break;
        case "nome_tec":
            return page.evaluate(val => document.querySelector("#table > tbody > tr:nth-child("+val+") > td:nth-child(7)").textContent.trim(), idPage);
        break
        case "atend_status":
            return page.evaluate(val => document.querySelector("#table > tbody > tr:nth-child("+val+") > td:nth-child(11)").textContent, idPage);
        break
        case "id_mob2b":
            return page.evaluate(val => document.querySelector("#table > tbody > tr:nth-child("+val+") > td:nth-child(17) > a:nth-child(1)").href.substring(63), idPage);    
        break
        case "id_mob2b_cliente":
            return page.evaluate(val => document.querySelector("#table > tbody > tr:nth-child("+val+") > td:nth-child(9)> a:nth-child(1)").href.substring(63), idPage);   
        break
        case "dt_inicio":
            return page.evaluate(val => document.querySelector("#table > tbody > tr:nth-child("+val+") > td:nth-child(12)").textContent.replace("  "," "), idPage);
        break
        case "dt_fechamento":
            return page.evaluate(val => document.querySelector("#table > tbody > tr:nth-child("+val+") > td:nth-child(13)").textContent.replace("  "," "), idPage);
        break
        case "Desativado":
            return "Desativado";
        break
    }
}
async function getSizePage(page){
    return await page.evaluate(() => document.querySelector("#table > tbody").rows.length);
}
