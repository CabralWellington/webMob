const nodemailer = require("nodemailer");
const db = require("../db/db");
const passwords = require("../info/passwords")
var moment = require('moment'); 

async function senderMail(page,id_mob2b) {
 try {
  const conn = await db.connect();
  const [rows] = await conn.query("select * from atendimentos where id_mob2b = '"+ id_mob2b+"'")

  var cliente = await rows[0].nome_cliente
  var dtcria =  await  moment(rows[0].dt_abertura, 'YYYY-MM-DD HH:mm:ss', true).format('DD/MM/YYYY HH:mm');       
  var dtinicio = await  moment(rows[0].dt_inicio, 'YYYY-MM-DD HH:mm:ss', true).format('DD/MM/YYYY HH:mm'); 
  var dtfecha = await moment(rows[0].dt_fechamento, 'YYYY-MM-DD HH:mm:ss', true).format('DD/MM/YYYY HH:mm'); 
  var obs = await rows[0].observacao
  var tecnico  = await rows[0].nome_tec
  var k =  await rows[0].numero_atendimento
  var qtdAnexo = await page.evaluate(()=>document.getElementsByClassName("img-responsive").length);
  var remetente = await rows[0].atend_email.toLowerCase()

  body = await page.evaluate(() => document.querySelector("#body-form").outerHTML);

  var bodyfull = "<h2>Informações sobre o atendimento</h2>" + "<br>Nome do cliente: "  +  cliente   +"<br>Abertura do atendimento: " + dtcria + "<br>" + "Início do atendimento: " + dtinicio + "<br>" + "Fechamento do atendimento: " + dtfecha + "<br>" + "Solicitação: " + obs +"<br>Técnico responsável: "+ tecnico +"<br><br>" + "<h3> Formulário técnico</h3>"+ body + "<br> Em anexo a assinatura do cliente.";
  await send(qtdAnexo,bodyfull,k,page,remetente) 


 } catch (error) {
   
 }
}

module.exports = {senderMail}

async function send(qtdAnexo,bodyfull,k,page,remetente){
  console.log("Quantidade de ANEXOS " + qtdAnexo + " Remetente " + remetente)
  let transporter
  let info
  let server = passwords.getEmailServer()
  try {
    switch (qtdAnexo) {
      case 2:
        console.log("SWITCH 2")
        transporter = nodemailer.createTransport({
          host: passwords.getEmailServer(),
          port: passwords.getEmailPort(),
          secure: false, // true for 465, false for other ports
          auth: {
            user: passwords.getEmailLogin(), // generated ethereal user
            pass: passwords.getEmailPassword(), // generated ethereal password
          },
        });
        info = await transporter.sendMail({
            from: passwords.getEmailSender(), // sender address
            to: remetente, // list of receivers
            subject: "Atendimento Amazoncopy nº= " + k, // Subject line
            text: "", // plain text body
            html: bodyfull,
            attachments: [
              {
                name : "Assinatura.png",
                path : await page.evaluate(()=> document.querySelector("#table-action > tbody > tr > td:nth-child(6) > a").href.substring(39,142))
                },
                {
                name : "Anexo1.png",
                path : await page.evaluate(()=> document.getElementsByClassName("img-responsive")[0].src)
                },
                {
                  name : "Anexo1.png",
                  path : await page.evaluate(()=> document.getElementsByClassName("img-responsive")[1].src)
                }
            ]
          }
        );
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
      break;
  
      case 3:
        console.log("SWITCH 3")
        transporter = nodemailer.createTransport({
          host: passwords.getEmailServer(),
          port: passwords.getEmailPort(),
          secure: false, // true for 465, false for other ports
          auth: {
            user: passwords.getEmailLogin(), // generated ethereal user
            pass: passwords.getEmailPassword(), // generated ethereal password
          },
        });
        info = await transporter.sendMail({
            from: passwords.getEmailSender(), // sender address
            to: remetente, // list of receivers
            subject: "Atendimento Amazoncopy nº= " + k, // Subject line
            text: "", // plain text body
            html: bodyfull,
            attachments: [
              {
                name : "Assinatura.png",
                path : await page.evaluate(()=> document.querySelector("#table-action > tbody > tr > td:nth-child(6) > a").href.substring(39,142))
                },
                {
                name : "Anexo1.png",
                path : await page.evaluate(()=> document.getElementsByClassName("img-responsive")[0].src)
                },
                {
                  name : "Anexo2.png",
                  path : await page.evaluate(()=> document.getElementsByClassName("img-responsive")[1].src)
                },
                {
                  name : "Anexo3.png",
                  path : await page.evaluate(()=> document.getElementsByClassName("img-responsive")[2].src)
                }
            ]
          }
        );
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
      break;
  
      case 4:
        console.log("SWITCH 4")
        transporter = nodemailer.createTransport({
          host: passwords.getEmailServer(),
          port: passwords.getEmailPort(),
          secure: false, // true for 465, false for other ports
          auth: {
            user: passwords.getEmailLogin(), // generated ethereal user
            pass: passwords.getEmailPassword(), // generated ethereal password
          },
        });
        info = await transporter.sendMail({
            from: passwords.getEmailSender(), // sender address
            to: remetente, // list of receivers
            subject: "Atendimento Amazoncopy nº= " + k, // Subject line
            text: "", // plain text body
            html: bodyfull,
            attachments: [
              {
                name : "Assinatura.png",
                path : await page.evaluate(()=> document.querySelector("#table-action > tbody > tr > td:nth-child(6) > a").href.substring(39,142))
                },
                {
                name : "Anexo1.png",
                path : await page.evaluate(()=> document.getElementsByClassName("img-responsive")[0].src)
                },
                {
                  name : "Anexo2.png",
                  path : await page.evaluate(()=> document.getElementsByClassName("img-responsive")[1].src)
                },
                {
                  name : "Anexo3.png",
                  path : await page.evaluate(()=> document.getElementsByClassName("img-responsive")[2].src)
                },
                {
                  name : "Anexo4.png",
                  path : await page.evaluate(()=> document.getElementsByClassName("img-responsive")[3].src)
                }
            ]
          }
        );
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
      break;
  
      case 5:
      console.log("SWITCH 4")
      transporter = nodemailer.createTransport({
        host: passwords.getEmailServer(),
          port: passwords.getEmailPort(),
          secure: false, // true for 465, false for other ports
          auth: {
            user: passwords.getEmailLogin(), // generated ethereal user
            pass: passwords.getEmailPassword(), // generated ethereal password
          },
        });
        info = await transporter.sendMail({
            from: passwords.getEmailSender(), // sender address
          to: remetente, // list of receivers
          subject: "Atendimento Amazoncopy nº= " + k, // Subject line
          text: "", // plain text body
          html: bodyfull,
          attachments: [
            {
              name : "Assinatura.png",
              path : await page.evaluate(()=> document.querySelector("#table-action > tbody > tr > td:nth-child(6) > a").href.substring(39,142))
              },
              {
              name : "Anexo1.png",
              path : await page.evaluate(()=> document.getElementsByClassName("img-responsive")[0].src)
              },
              {
                name : "Anexo2.png",
                path : await page.evaluate(()=> document.getElementsByClassName("img-responsive")[1].src)
              },
              {
                name : "Anexo3.png",
                path : await page.evaluate(()=> document.getElementsByClassName("img-responsive")[2].src)
              },
              {
                name : "Anexo4.png",
                path : await page.evaluate(()=> document.getElementsByClassName("img-responsive")[3].src)
              },
              {
                name : "Anexo5.png",
                path : await page.evaluate(()=> document.getElementsByClassName("img-responsive")[4].src)
              }
          ]
        }
      );
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
    break;
    case 6:
      console.log("SWITCH 4")
      transporter = nodemailer.createTransport({
        host: passwords.getEmailServer(),
        port: passwords.getEmailPort(),
        secure: false, // true for 465, false for other ports
        auth: {
          user: passwords.getEmailLogin(), // generated ethereal user
          pass: passwords.getEmailPassword(), // generated ethereal password
        },
      });
      info = await transporter.sendMail({
          from: passwords.getEmailSender(), // sender address
          to: remetente, // list of receivers
          subject: "Atendimento Amazoncopy nº= " + k, // Subject line
          text: "", // plain text body
          html: bodyfull,
          attachments: [
            {
              name : "Assinatura.png",
              path : await page.evaluate(()=> document.querySelector("#table-action > tbody > tr > td:nth-child(6) > a").href.substring(39,142))
              },
              {
              name : "Anexo1.png",
              path : await page.evaluate(()=> document.getElementsByClassName("img-responsive")[0].src)
              },
              {
                name : "Anexo2.png",
                path : await page.evaluate(()=> document.getElementsByClassName("img-responsive")[1].src)
              },
              {
                name : "Anexo3.png",
                path : await page.evaluate(()=> document.getElementsByClassName("img-responsive")[2].src)
              },
              {
                name : "Anexo4.png",
                path : await page.evaluate(()=> document.getElementsByClassName("img-responsive")[3].src)
              },
              {
                name : "Anexo5.png",
                path : await page.evaluate(()=> document.getElementsByClassName("img-responsive")[4].src)
              },
              {
                name : "Anexo6.png",
                path : await page.evaluate(()=> document.getElementsByClassName("img-responsive")[5].src)
              }
          ]
        }
      );
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
    break;
    case 7:
      console.log("SWITCH 4")
      transporter = nodemailer.createTransport({
        host: passwords.getEmailServer(),
          port: passwords.getEmailPort(),
          secure: false, // true for 465, false for other ports
          auth: {
            user: passwords.getEmailLogin(), // generated ethereal user
            pass: passwords.getEmailPassword(), // generated ethereal password
          },
        });
        info = await transporter.sendMail({
            from: passwords.getEmailSender(), // sender address
          to: remetente, // list of receivers
          subject: "Atendimento Amazoncopy nº= " + k, // Subject line
          text: "", // plain text body
          html: bodyfull,
          attachments: [
            {
              name : "Assinatura.png",
              path : await page.evaluate(()=> document.querySelector("#table-action > tbody > tr > td:nth-child(6) > a").href.substring(39,142))
              },
              {
              name : "Anexo1.png",
              path : await page.evaluate(()=> document.getElementsByClassName("img-responsive")[0].src)
              },
              {
                name : "Anexo2.png",
                path : await page.evaluate(()=> document.getElementsByClassName("img-responsive")[1].src)
              },
              {
                name : "Anexo3.png",
                path : await page.evaluate(()=> document.getElementsByClassName("img-responsive")[2].src)
              },
              {
                name : "Anexo4.png",
                path : await page.evaluate(()=> document.getElementsByClassName("img-responsive")[3].src)
              },
              {
                name : "Anexo5.png",
                path : await page.evaluate(()=> document.getElementsByClassName("img-responsive")[4].src)
              },
              {
                name : "Anexo6.png",
                path : await page.evaluate(()=> document.getElementsByClassName("img-responsive")[5].src)
              },
              {
                name : "Anexo7.png",
                path : await page.evaluate(()=> document.getElementsByClassName("img-responsive")[6].src)
              }
          ]
        }
      );
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
    break;
  
      default:
          console.log("SWITCH DEFAULT")
          transporter = nodemailer.createTransport({
            host: passwords.getEmailServer(),
            port: passwords.getEmailPort(),
            secure: false, // true for 465, false for other ports
            auth: {
              user: passwords.getEmailLogin(), // generated ethereal user
              pass: passwords.getEmailPassword(), // generated ethereal password
            },
          });
          info = await transporter.sendMail({
            from: passwords.getEmailSender(), // sender address
            to: remetente, // list of receivers
            subject: "Atendimento Amazoncopy nº= " + k, // Subject line
            text: "", // plain text body
            html: bodyfull,
            attachments: [
              {
                name : "Assinatura.png",
                path : await page.evaluate(()=> document.querySelector("#table-action > tbody > tr > td:nth-child(6) > a").href.substring(39,142))
                },
                {
                name : "Anexo1.png",
                path : await page.evaluate(()=> document.getElementsByClassName("img-responsive")[0].src)
                }
            ]
          }
        );
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
        break;
    }
  
  } catch (error) {
    //console.log(error)
  }






 
}