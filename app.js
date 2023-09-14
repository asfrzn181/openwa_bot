

//app.js
const venom = require('venom-bot');
const { response } = require("./chatGPT.js");

1

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+time;

venom
  .create({
    session: 'session-name', //name of session
    multidevice: true // for version not multidevice use false.(default: true)
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  client.onMessage((message) => {
    response(message.body).then(data => {
        if (data.choices && data.choices.length > 0) {
            const responseText = data.choices[0].message.content;
            // Check if responseText is not empty before sending
            if (responseText.trim() !== "") {
                client
                    .sendText(message.from, responseText)
                    .catch((erro) => {
                        console.error('Error when sending: ', erro);
                    });
            } else {
                console.log('Response text is empty. Not sending.');
            }
        }else{

            client.sendImage(
                message.from,
                data.data[0].url,
                dateTime,
                message.body
              )
        }
    }).catch(err => {
        console.log(err);
    });
    
  });
}