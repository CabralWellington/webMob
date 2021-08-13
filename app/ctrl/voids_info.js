const db = require("../db/db");
const email = require("./sendemail")
var moment = require('moment'); // require
InfoBuffer = [];
async function run(page){
    await search_info(page);
}
async function search_info(page){
    
    const conn = await db.connect();
    const [rows] = await conn.query('SELECT * from sendemail');
    //console.log(rows.length)
    i = 0;
    do{
        sendBuffer = []
        await page.waitForTimeout(10000);
        //await console.log(i);
        //await console.log(rows[i].id_mob2b); 
        await page.goto('http://mob2b-backend.cloudapp.net/Tracker/TrackerTicket/Detail/'+rows[i].id_mob2b);
        await page.waitForTimeout(10000);
        conn.query("update atendimentos set send_email = 'OK' where id_mob2b = '"+ rows[i].id_mob2b+"'")
        try {
            await page.evaluate(val => document.querySelector("#teste > i").click());
            await page.waitForTimeout(10000);
            sizePage = await page.evaluate(() => document.querySelector("#body-form > table > tbody").rows.length);
        
             console.log(sizePage)
            for(var j=1;j<sizePage+1;j++){  
                sendBuffer.unshift(await getInfoPage(page,j,rows[i].id_mob2b))
            }
                await email.senderMail(page,rows[i].id_mob2b);
        } catch (error) {
            
        }
        
    i++;
    }while(i<rows.length);
}


async function getInfoPage(page,idPage,id_mob2b){
    buffer = []
    valOption = await page.evaluate( val => document.querySelector("#body-form > table > tbody > tr:nth-child("+val+") > td:nth-child(1)").textContent.trim(), idPage);
    valInput = await page.evaluate( val => document.querySelector("#body-form > table > tbody > tr:nth-child("+val+") > td:nth-child(2)").textContent.trim(), idPage);
    try {
       await toDB(valOption,valInput,id_mob2b);        
    } catch (error) {   
    }
    buffer.unshift(valOption);
    buffer.unshift(valInput);
    return buffer

}

async function toDB(valOption,valInput,id_mob2b){
    try {
        const conn = await db.connect();
        const sql = await getRowTableName(valOption)
        const values = [valInput,id_mob2b];
        await  conn.query(sql,values);
        //console.log("Salve essa query " + sql)
    } catch (error) {
        
    }
}

async function getRowTableName(val){
    switch (val){
        case "E-mail":
            return "update atendimentos set atend_email=? where id_mob2b = ?"
        case "E-mail do cliente":
            return "update atendimentos set atend_email=? where id_mob2b = ?"
        case "Nome / Razão social do cliente":
            return "update atendimentos set razao_social=? where id_mob2b = ?"
        case "Complemento do local":
            return "update atendimentos set complemento_do_local=? where id_mob2b = ?"
        case "Modelo do equipamento":
            return "update atendimentos set modelo=? where id_mob2b = ?"
        case "Numero de série":
            return "update atendimentos set atend_serie=? where id_mob2b = ?"
        case "Contador Inicial":
            return "update atendimentos set atend_contador_inicial=? where id_mob2b = ?"
        case "Contador Final":
            return "update atendimentos set atend_contador_final=? where id_mob2b = ?"
        case "Rolete de alimentação":
            return "update atendimentos set atend_check1=? where id_mob2b = ?"
        case "Rolete de separação":
            return "update atendimentos set atend_check2=? where id_mob2b = ?"            
        case "Lamina de limpeza do cilindro":
            return "update atendimentos set atend_check3=? where id_mob2b = ?"
        case "Cilindro de imagem":
            return "update atendimentos set atend_check4=? where id_mob2b = ?"
        case "Unidade de fusão":
            return "update atendimentos set atend_check5=? where id_mob2b = ?"
        case "ADF":
            return "update atendimentos set atend_check6=? where id_mob2b = ?"
        case "Condição do equipamento":
            return "update atendimentos set atend_codicao=? where id_mob2b = ?"
        case "Motivo de solicitação de peças":
            return "update atendimentos set atend_motivo_peca=? where id_mob2b = ?"
        case "1º Solicitação de peça":
            return "update atendimentos set atend_peca_1=? where id_mob2b = ?"
        case "2º Solicitação de peça":
            return "update atendimentos set atend_peca_2=? where id_mob2b = ?"
        case "3º Solicitação de peça":
            return "update atendimentos set atend_peca_3=? where id_mob2b = ?"
        case "4º Solicitação de peça":
            return "update atendimentos set atend_peca_4=? where id_mob2b = ?"
        case "5º Solicitação de peça":
            return "update atendimentos set atend_peca_5=? where id_mob2b = ?"
        case "Outras peças":
            return "update atendimentos set atend_outras_pecas=? where id_mob2b = ?"
        case "Comentários":
            return "update atendimentos set atend_comentarios=? where id_mob2b = ?"
        case "Comentários após troca de peças":
            return "update atendimentos set atend_comentarios_apos=? where id_mob2b = ?"
        case "Nome do cliente":
            return "update atendimentos set atend_nome_cliente=? where id_mob2b = ?"
        case "Telefone do cliente":
            return "update atendimentos set atend_telefone=? where id_mob2b = ?"
            
        }

}


module.exports = {run}
